import {
    SphereGeometry, MeshBasicMaterial, Points, PointsMaterial, TextureLoader, AdditiveBlending
} from "three";
import fireTex from "./assets/particle.png"
export default class Sphere {

    constructor(scene, radius, particleSize, x, y, z) {
        this.scene = scene;
        // const sphereGeometry = new SphereGeometry(30, 10, 50)
        const sphereGeometry = new SphereGeometry(radius, radius / 3, radius / 3)
        //this.material = new MeshBasicMaterial({ color: 0xffffff })
        this.material = new PointsMaterial({
            color: 0x034f80,
            depthWrite: false,
            transparent: true,
            size: particleSize,
            map: new TextureLoader().load(fireTex),
            blending: AdditiveBlending
        })
        this.sphere = new Points(sphereGeometry, this.material)
        this.scene.add(this.sphere)
        this.sphere.position.x = x;
        this.sphere.position.y = y;
        this.sphere.position.z = z;
        // this.scene = scene
        // const sphereGeometry = new SphereGeometry(50, 20, 20)
        // //this.material = new MeshBasicMaterial({ color: 0xffffff })
        // this.material = new PointsMaterial({
        //     color: 0x0088ff,
        //     depthWrite: false,
        //     transparent: true,
        //     size: 5,
        //     map: new TextureLoader().load(fireTex),
        //     blending: AdditiveBlending
        // })
        // this.sphere = new Points(sphereGeometry, this.material)


        // this.scene.add(this.sphere)
    }
    update() {   // obrót
        this.sphere.rotation.y += 0.01
    }
}