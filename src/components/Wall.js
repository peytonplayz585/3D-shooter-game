import {
    Mesh,
    TextureLoader,
    DoubleSide,
    BoxGeometry,
    MeshPhongMaterial,
} from "three";
import wallTex from "./assets/WALL.png";

export class Wall extends Mesh {
    constructor(scene, x, y, z) {
        const height = 200;
        const width = 100;
        super(
            new BoxGeometry(width, height, width),
            new MeshPhongMaterial({
                shininess: 50,
                map: new TextureLoader().load(wallTex),
            })
        );
        this.scene = scene

        this.castShadow = true;
        this.receiveShadow = true;
        this.position.set(
            x + width / 2,
            y + height / 2,
            z + width / 2
        );
        this.scene.add(this)
    }

    update() {
        this.rotation.y += 0.01;
    }
}
