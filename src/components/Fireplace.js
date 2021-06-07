import { Object3D, SpriteMaterial, TextureLoader, AdditiveBlending, PointLight } from "three"
import fireTex from "./assets/fire.png"
import Particle from "./Particle"

export default class Fireplace extends Object3D {

    constructor() {
        super()
        //tablica na cząsteczki
        this.particles = []
        // przewidywana ilość cząsteczek
        this.count = 100
        // materiał cząsteczki, rzecz najważniejsza
        // jego właściwość blending decyduje o tym, że cząsteczki mieszają się
        // ze sobą

        this.particleMaterial = new SpriteMaterial({
            color: 0xff3312,
            map: new TextureLoader().load(fireTex),
            transparent: true,
            opacity: 0.8,
            depthWrite: false,
            blending: AdditiveBlending
        });
        // dodajemy światło, aby ognisko emitowało oświetlenie na scenie
        this.point = new PointLight(0xff0000, 20, 20)


        this.init()
    }

    init() {
        for (let i = 0; i < this.count; i++) {
            // w pętli tworzymy odpowiednią ilość cząsteczek klasy Particle
            // dodajemy do this (kontener3D) i tablicy

            var particle = new Particle(this.particleMaterial)
            this.add(particle)
            this.particles.push(particle);
        }



    }



    update() {
        // tutaj w pętli wykonujemy funkcję upfate każdej cząsteczki,
        // którą mamy w tablicy       
        // particle.update()
        this.particles.forEach(particle => {
            particle.update()
        })
    }
}