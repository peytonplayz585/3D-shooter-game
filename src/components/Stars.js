import {
    SphereGeometry, MeshBasicMaterial, Points, PointsMaterial, TextureLoader, AdditiveBlending, BufferGeometry, BufferAttribute
} from "three";
import fireTex from "./assets/particle.png"
export default class Stars {

    constructor(scene) {
        this.scene = scene
        this.particlesCount = 1000;
        this.particlesGeometry = new BufferGeometry()
        this.verticesArray = new Float32Array(this.particlesCount * 3)
        this.particleMaterial = new PointsMaterial({
            color: 0xd4ff00,
            depthWrite: false,
            transparent: true,
            size: 20,
            map: new TextureLoader().load(fireTex),
            blending: AdditiveBlending
        })
        this.generate();
    }

    generate() {

        for (let i = 0; i < this.particlesCount * 3; i += 3) {

            this.verticesArray[i] = Math.random() * 1200 - 600
            this.verticesArray[i + 1] = Math.random() * 1200 - 600
            this.verticesArray[i + 2] = Math.random() * 2200 - 800

        }

        // poniższa linia przypisuje geometrii naszą tablicę punktów

        this.particlesGeometry.setAttribute("position", new BufferAttribute(this.verticesArray, 3))

        // z geometrii jak zawsze powstaje mesh, złożony
        // z geometrii i materiału typu Points

        const mesh = new Points(this.particlesGeometry, this.particleMaterial)
        this.scene.add(mesh)

    }
}