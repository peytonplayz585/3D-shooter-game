import {
    LoadingManager,
    Clock,
    Color,
    Vector3,
    GridHelper
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { Scene } from 'three';
import Renderer from './Renderer';
import Fireplace from './Fireplace';
import Camera from './Camera';
import Ico from './Ico';

import Model from "./Model"
import Keyboard from "./Keyboard"
import Animation from "./Animation"
import Config from './Config';
import Stats from 'three/examples/jsm/libs/stats.module.js';



export default class MainParticles {
    constructor(container) {
        this.container = container;
        this.scene = new Scene();
        this.renderer = new Renderer(container);
        this.camera = new Camera(30, window.innerWidth / 2, window.innerHeight / 2);
        this.camera.position.set(200, 200, 200)
        // tablica
        this.firePlaces = []
        // this.animation = null
        // this.isLoaded = null
        this.manager = new LoadingManager();

        const controls = new OrbitControls(this.camera, this.renderer.domElement);

        const gridHelper = new GridHelper(1000, 10, new Color(255, 0, 0), new Color(255, 0, 0));
        this.scene.add(gridHelper);
        //ustaw fireplaces w kółko

        for (var i = 0; i < 10; i++) {
            let fire = new Fireplace()
            this.scene.add(fire)
            fire.position.x = Math.cos(i * 120) * 30;
            fire.position.z = Math.sin(i * 120) * 30;
            fire.position.y = 0
            this.firePlaces.push(fire)
        }
        // render
        this.render();

    }

    render() {

        // dla kazdego elementu tablicy ognisk
        // czyli dla każdego obiektu klasy Fireplace
        // wykonuj funkcję update()
        //...
        this.firePlaces.forEach(fire => {
            fire.update()
        })

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }

}