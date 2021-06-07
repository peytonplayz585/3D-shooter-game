import Animation from "./Animation"
import Config from "./Config";
import Laser from "./Laser";

const KEYS = {
    "left": 65,
    "up": 87,
    "right": 68,
    "down": 83,
    "space": 32
};

export default class Keyboard {
    constructor(domElement, animation, modelMesh, scene) {

        this.domElement = domElement;
        this.animation = animation;
        this.modelMesh = modelMesh;
        this.scene = scene;

        // events
        this.domElement.addEventListener('keydown', event => this.onKeyDown(event), false);
        this.domElement.addEventListener('keyup', event => this.onKeyUp(event), false);


    }

    onKeyUp(event) {
        switch (event.key) {
            case 'w':
                Config.moveForward = false;
                break;
            case 'a':
                Config.rotateLeft = false;
                break;
            case 'd':
                Config.rotateRight = false;
                break;
            case ' ':
                Config.shoot = false;
                break;


        }
        console.log('onKeyChange', event.keyCode)
    }

    onKeyDown(event) {
        switch (event.key) {
            case 'w':
                Config.moveForward = true;
                break;
            case 'a':
                Config.rotateLeft = true;
                break;
            case 'd':
                Config.rotateRight = true;
                break;
            case ' ':
                Config.shoot = true;
                break;
        }

    }


}