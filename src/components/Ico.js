import {
    IcosahedronGeometry,
    MeshNormalMaterial,
    Mesh,
    BoxGeometry,
    MeshBasicMaterial
} from "three";

export default class Ico {

    constructor(scene) {
        console.log("ico")
        this.scene = scene;
        this.geometry = new IcosahedronGeometry();
        this.material = new MeshNormalMaterial();
        this.mesh = new Mesh(this.geometry, this.material);
        this.scene.add(this.mesh)
        this.cubeArray = []

        for (let i = 0; i < 20; i++) {
            const geometry = new BoxGeometry(50, 50, 50);
            const material = new MeshBasicMaterial({ color: 0x0eb5ec });
            const cube = new Mesh(geometry, material);
            cube.position.set((Math.random() * 1000) - 500, 0, (Math.random() * 1000) - 500)
            scene.add(cube);
            this.cubeArray.push(cube)
        }
    }
    update() {
        this.mesh.rotation.y += 0.01
    }

}