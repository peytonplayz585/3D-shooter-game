import {
    Scene,
    LoadingManager,
    Clock,
    Vector3,
    GridHelper,
    Raycaster,
    Ray,
    SphereGeometry,
    PointsMaterial,
    TextureLoader,
    Points,
    AdditiveBlending,
    CylinderGeometry,
    BufferGeometry,
    BufferAttribute,
    AmbientLight
} from 'three';

import Renderer from './Renderer';
import Camera from './Camera';
import Ico from './Ico';
import fireTex from "./assets/fire.png"
import Model from "./Model"
import Keyboard from "./Keyboard"
import Animation from "./Animation"
import Config from './Config';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Fireplace from './Fireplace';
import Sphere from './Sphere';
import Stars from './Stars';
import Laser from './Laser';
import Enemy from './Enemy';
import { Wall } from './Wall';



export default class Main {
    constructor(container) {
        this.container = container;
        this.scene = new Scene();
        this.renderer = new Renderer(this.scene, container);
        this.camera = new Camera(this.renderer.threeRenderer);
        // this.ico = new Ico(this.scene);
        this.raycaster = new Raycaster()
        // this.firePlaces = []
        this.canMoveForward = true;
        this.isLoaded = null
        this.animation = null
        this.enemies = [];
        this.walls = [];

        this.controls = new OrbitControls(this.camera.threeCamera, this.renderer.threeRenderer.domElement);

        const light = new AmbientLight(0xffffff, 1);
        light.position.set(1000, 1000, 1000);
        this.scene.add(light);

        // grid - testowa siatka na podłoże modelu

        const gridHelper = new GridHelper(1000, 10);
        this.scene.add(gridHelper);

        //stats - statystyki wydajności

        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb

        document.body.appendChild(this.stats.dom);

        // zegar - vide lekcja 4

        this.clock = new Clock()

        // manager loadingu, pozwala monitorować progress oraz fakt zakończenia ładowania

        this.manager = new LoadingManager();

        this.model = new Model(this.scene, this.manager, 'KENNY', { x: 0, y: 0, z: 0 });
        this.model.load('./src/components/assets/KENNY.md2');

        this.manager.onProgress = (item, loaded, total) => {
            console.log(`progress ${item}: ${loaded} ${total}`);
        };

        this.manager.onLoad = () => {
            this.isLoaded = true;
            this.animation = new Animation(this.model.mesh)
            this.animation.playAnim("crwalk")
            this.keyboard = new Keyboard(window, this.animation, this.model.mesh, this.scene);
        };

        // this.sphere = new Sphere(this.scene, 200, 4, 0, 200, 0);

        // this.stars = new Stars(this.scene);

        this.enemy = new Enemy(this.scene, 'SPIDER', { x: (Math.random() * 1000) - 500, y: 0, z: (Math.random() * 1000) - 500 })

        this.enemy.manager.onLoad = () => {
            this.enemy.array.forEach(alien => {
                this.enemies.push(alien)
            })
        }

        this.wall = new Wall(this.scene, -100, 0, -100)
        this.walls.push(this.wall);

        this.render();
    }
    render() {
        this.stats.begin()
        this.renderer.render(this.scene, this.camera.threeCamera);

        // Fireplaces

        // this.firePlaces.forEach(fire => {
        //     fire.update()
        // })

        // Camera

        // if (this.model.mesh) {
        //     const camVect = new Vector3(-200, 50, 0)
        //     const camPos = camVect.applyMatrix4(this.model.mesh.matrixWorld);
        //     this.camera.threeCamera.position.x = camPos.x
        //     this.camera.threeCamera.position.y = camPos.y
        //     this.camera.threeCamera.position.z = camPos.z
        //     this.camera.threeCamera.lookAt(this.model.mesh.position)
        // }

        // Player

        if (this.model.mesh) {
            if (Config.rotateLeft) {
                this.model.mesh.rotation.y += 0.01;
            }
            if (Config.rotateRight) {
                this.model.mesh.rotation.y -= 0.01;
            }
            if (Config.moveForward && this.canMoveForward) {
                this.model.mesh.translateX(3);
            }
            if (Config.shoot && !this.laser) {
                const range = this.model.mesh.position.clone();
                range.add(new Vector3(500, 0, 0).applyQuaternion(this.model.mesh.quaternion));
                this.laser = new Laser(this.scene, this.model.mesh.position, range);
            }
            if (!Config.shoot && this.laser) {
                this.laser.remove();
                this.laser = null;
            }
            if (Config.shoot && this.laser) {
                const range = this.model.mesh.position.clone();
                range.add(new Vector3(500, 0, 0).applyQuaternion(this.model.mesh.quaternion));
                this.laser.update(range);
            }

            // Animation

            const delta = this.clock.getDelta();
            if (this.animation) this.animation.update(delta)

            // Enemies 

            let distances = []
            this.enemies.forEach(enemy => {
                distances.push({ distance: enemy.mesh.position.distanceTo(this.model.mesh.position), enemy: enemy })
                // console.log(distances)
                // informations.innerHTML = ''
                // enemy.material.color.set(0xffffff)
                enemy.mesh.lookAt(this.model.mesh.position)
                enemy.mesh.rotateY(-Math.PI / 2)
            })
            distances.forEach(el => {
                if (el.distance < 200 && !el.enemy.laser) {
                    // let laser = new Laser(this.scene, el.enemy.mesh.position, this.model.mesh.position.clone())
                    el.enemy.shoot(el.enemy.mesh.position, this.model.mesh.position.clone())
                    el.enemy.laser.updateEnemy()
                }
            })

            // Walls

            const playersDirecotion = this.model.mesh.getWorldDirection(new Vector3())
            const currentDirection = new Vector3(playersDirecotion.z, playersDirecotion.y, -playersDirecotion.x)
            let ray = new Ray(this.model.mesh.position, currentDirection)
            this.raycaster.ray = ray

            let intersects = this.raycaster.intersectObjects(this.walls, true)

            intersects.forEach(el => {
                if (el.distance < 20) {
                    this.canMoveForward = false;
                }
            })

            if (intersects.length < 1) {
                this.canMoveForward = true;
            }

            // Informations 

            // const informations = document.getElementById('info')
            // informations.innerHTML = ''
            // informations.innerHTML += `Ilość trafionych: ${data.count} <br>`

            // data.objects.forEach(info => {
            //     informations.innerHTML += ` { <br> distance: ${info.distance} <br>`
            //     informations.innerHTML += `point: { <br>
            //      &nbsp &nbsp   x: ${info.point.x}, <br>
            //      &nbsp &nbsp   y: ${info.point.y}, <br>
            //      &nbsp &nbsp   z: ${info.point.z}, <br>
            //   &nbsp } <br>
            //   }`
            // })
        }

        // koniec statystyk
        this.stats.end()

        requestAnimationFrame(this.render.bind(this));
    }
}