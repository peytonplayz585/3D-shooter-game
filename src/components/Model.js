import { MD2Loader } from './MD2Loader';
import { Mesh, TextureLoader, MeshPhongMaterial, AmbientLight, AxesHelper } from "three"
import kenny from "./assets/KENNY.png"
import spider from "./assets/SPIDER.png"
import Laser from './Laser';
// import alien from "./assets/ALIEN.png"
// import satan from "./assets/SATAN.png"

export default class Model {
    constructor(scene, manager, modelName, pos) {
        this.scene = scene;
        this.mesh = null;
        this.manager = manager;
        this.geometry = null
        this.modelName = modelName;
        this.pos = pos
        switch (this.modelName) {
            case 'KENNY':
                this.texture = kenny;
                break;
            case 'SPIDER':
                this.texture = spider;
                break;
            // case 'ALIEN':
            //     this.texture = alien;
            //     break;
            // case 'SATAN':
            //     this.texture = satan;
            //     break;
        }
    }

    load(path) {
        this.axes = new AxesHelper(700)

        new MD2Loader(this.manager).load(
            path,
            geometry => {

                this.geometry = geometry;

                this.mesh = new Mesh(geometry, new MeshPhongMaterial({
                    map: new TextureLoader().load(this.texture),
                    morphTargets: true
                }))
                if (this.modelName == 'KENNY') {
                    this.axes.rotation.y = Math.PI / 2
                    this.mesh.add(this.axes)
                } else {
                    this.mesh.rotation.y = Math.PI
                }



                this.mesh.position.x = this.pos.x;
                this.mesh.position.y = this.pos.y;
                this.mesh.position.z = this.pos.z;

                this.scene.add(this.mesh);
            },

        );

    }

    unload() {
        this.scene.remove(this.mesh); // ew funkcja do usunięcia modelu ze sceny
    }
    shoot(pos1, pos2) {

        this.laser = new Laser(this.scene, pos1, pos2)
        setTimeout(() => {
            clearInterval(this.laser.animation)
            this.laser.remove();
            setTimeout(() => {
                this.laser.animation = null
                this.laser = null;
            }, 400);

        }, 300);

    }
}