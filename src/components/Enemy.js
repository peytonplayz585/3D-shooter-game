import { LoadingManager } from 'three'
import Model from './Model';
export default class Enemy {
    constructor(scene, modelName, pos) {
        // manager loadingu, pozwala monitorować progress oraz fakt zakończenia ładowania
        this.scene = scene;
        this.array = [];
        this.array2 = [];
        this.manager = new LoadingManager();
        // model
        for (let x = 0; x < 10; x++) {

            let model = new Model(this.scene, this.manager, modelName, { x: (Math.random() * 1000) - 500, y: -10, z: (Math.random() * 1000) - 500 });
            model.load(`./src/components/assets/${modelName}.md2`);

            this.array.push(model)


        }
        console.log(this.array)


        // this.manager.onLoad = () => {
        //     for (let x = 0; x < 10; x++) {
        //         this.array2.push(this.array[x])
        //     }
        // };
    }

}