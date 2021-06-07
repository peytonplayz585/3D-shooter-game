import { Sprite } from 'three';

export default class Particle extends Sprite {
    constructor(material) {
        super();

        this.material = material.clone(); // skala naszego sprite
        this.scale.set(Math.random() * 17, Math.random() * 30, Math.random() * 17);
        this.position.set(Math.random() * 15, Math.random() * 60, Math.random() * 15);
    }

    update() {
        if (this.position.y > 50) {
            this.position.x = 0;
            this.position.z = 0;
            this.position.y = 0;
            this.material.opacity = 1;
        }

        this.material.opacity -= 0.1;
        this.position.y += 0.5;
    }
}