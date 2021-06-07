import { BufferGeometry, SphereGeometry, AdditiveBlending, PointsMaterial, TextureLoader, BufferAttribute, Points, Vector3 } from 'three';
import Sphere from './Sphere';
import fireTex from './assets/particle.png'


export default class Laser {
    constructor(scene, pos1, pos2) {
        this.scene = scene;
        this.pos1 = pos1;
        this.pos2 = pos2;

        this.input1 = document.getElementById("input1")
        this.input2 = document.getElementById("input2")

        this.particleMaterial = new PointsMaterial({
            color: 0xf78f4a,
            depthWrite: false,
            transparent: true,
            size: 2,
            map: new TextureLoader().load(fireTex),
            blending: AdditiveBlending
        })

        this.particlesCount = 10000
        this.particlesGeometry = new BufferGeometry()
        this.verticesArray = new Float32Array(this.particlesCount * 3)
        this.verticesStart = [...this.verticesArray]

        this.generate();
    }

    update(pos2) {
        this.particleMaterial.size = this.input1.value * 3
        // const v1 = new Vector3(this.pos1.x, this.pos1.y, this.pos1.z);
        // const v2 = new Vector3(this.pos2.x, this.pos2.y, this.pos2.z);
        const v1 = this.pos1;
        const v2 = pos2;
        const subV = v2.clone().sub(v1.clone())
        const stepV = subV.divideScalar(this.particlesCount) // particlesCount - przewidywana ilość cząsteczek na linii a-b
        for (let i = 0; i < this.particlesCount * 3; i += 3) {

            this.verticesArray[i] = v1.x + (stepV.x * (i / 3))
            this.verticesArray[i + 1] = v1.y + (stepV.y * (i / 3))
            this.verticesArray[i + 2] = v1.z + (stepV.z * (i / 3))

        }
        this.verticesStart = [...this.verticesArray]

        let positions = this.particlesGeometry.attributes.position.array
        for (let i = 0; i < this.particlesCount * 3; i += 3) {

            positions[i] = this.verticesStart[i] + (Math.random() - 0.5) * (this.input2.value)
            positions[i + 1] = this.verticesStart[i + 1] + (Math.random() - 0.5) * (this.input2.value)
            positions[i + 2] = this.verticesStart[i + 2] + (Math.random() - 0.5) * (this.input2.value)

        }
        // this.particlesGeometry.setAttribute("position", new BufferAttribute(positions, 3))
        this.particlesGeometry.attributes.position.needsUpdate = true

    }
    updateEnemy() {
        if (!this.animation) {
            let size = 0.1
            this.animation = setInterval(() => {
                size += 0.5;
                this.particleMaterial.size = size
                // const v1 = new Vector3(this.pos1.x, this.pos1.y, this.pos1.z);
                // const v2 = new Vector3(this.pos2.x, this.pos2.y, this.pos2.z);
                const v1 = this.pos1;
                const v2 = this.pos2
                const subV = v2.clone().sub(v1.clone())
                const stepV = subV.divideScalar(this.particlesCount) // particlesCount - przewidywana ilość cząsteczek na linii a-b
                for (let i = 0; i < this.particlesCount * 3; i += 3) {

                    this.verticesArray[i] = v1.x + (stepV.x * (i / 3))
                    this.verticesArray[i + 1] = v1.y + (stepV.y * (i / 3))
                    this.verticesArray[i + 2] = v1.z + (stepV.z * (i / 3))

                }
                this.verticesStart = [...this.verticesArray]

                let positions = this.particlesGeometry.attributes.position.array
                for (let i = 0; i < this.particlesCount * 3; i += 3) {

                    // positions[i] = this.verticesStart[i] + (Math.random() - 0.5) * (this.input2.value)
                    // positions[i + 1] = this.verticesStart[i + 1] + (Math.random() - 0.5) * (this.input2.value)
                    // positions[i + 2] = this.verticesStart[i + 2] + (Math.random() - 0.5) * (this.input2.value)

                }
                // this.particlesGeometry.setAttribute("position", new BufferAttribute(positions, 3))
                this.particlesGeometry.attributes.position.needsUpdate = true
            }, 1);

        }


    }
    generate() {
        // const v1 = new Vector3(this.pos1.x, this.pos1.y, this.pos1.z);
        // const v2 = new Vector3(this.pos2.x, this.pos2.y, this.pos2.z);
        const v1 = this.pos1;
        const v2 = this.pos2;
        const subV = v2.clone().sub(v1.clone())
        const stepV = subV.divideScalar(this.particlesCount) // particlesCount - przewidywana ilość cząsteczek na linii a-b
        for (let i = 0; i < this.particlesCount * 3; i += 3) {

            this.verticesArray[i] = v1.x + (stepV.x * (i / 3))
            this.verticesArray[i + 1] = v1.y + (stepV.y * (i / 3))
            this.verticesArray[i + 2] = v1.z + (stepV.z * (i / 3))

        }
        this.verticesStart = [...this.verticesArray]

        // poniższa linia przypisuje geometrii naszą tablicę punktów

        this.particlesGeometry.setAttribute("position", new BufferAttribute(this.verticesArray, 3))

        // z geometrii jak zawsze powstaje mesh, złożony
        // z geometrii i materiału typu Points

        this.mesh = new Points(this.particlesGeometry, this.particleMaterial)
        this.scene.add(this.mesh)

    }
    remove() {
        this.scene.remove(this.mesh);
    }
}