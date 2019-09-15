//导演类，控制整个游戏的逻辑
import {DataStore} from "./base/DataStore.js";
import {Uppencil} from "./runtime/Uppencil.js";
import {Downpencil} from "./runtime/Downpencil.js";
import {Rectangle} from "./base/Rectangle.js";

export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
    }

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    //创建铅笔
    createPencil() {
        const minTop = window.innerHeight / 8;
        const maxTop = window.innerHeight / 2;
        const top = minTop + (Math.random() * (maxTop - minTop));
        this.dataStore.get('pencils').push(new Uppencil(top));
        this.dataStore.get('pencils').push(new Downpencil(top));

        this.dataStore.get('pencil');
    }

    //判断是否应该生成一堆铅笔
    isCreatePencil() {
        const pencils = this.dataStore.get('pencils');
        //判断第一对铅笔右边缘已经走过屏幕的一半并且此时铅笔数组中只能有两个
        if (pencils[0].x + (pencils[0].width) < (window.innerWidth / 2) && pencils.length == 2) {
            this.createPencil();
        }
    }

    //移除铅笔的逻辑
    outpencil() {

        const pencils = this.dataStore.get('pencils');
        //判断第一对铅笔右边缘走过屏幕左边一半并且此时铅笔数组中国只能有四个
        if (pencils[0].x + pencils[0].width < 0 && pencils.length == 4) {

            pencils.shift();
            pencils.shift();
            this.dataStore.get('score').isScore = true;
        }
    }

    //碰撞
    crashLand() {
        let s = false;
        const bird = this.dataStore.get('bird');
        const land = this.dataStore.get('land');
        if (bird.y + bird.offSet + bird.height > land.y) {
            s = true;
        }
        return s;
    }

    //判断鸟和铅笔的碰撞
    crashPencil() {
        const pencils = this.dataStore.get('pencils');
        const bird = this.dataStore.get('bird');
        //先创建小鸟的矩形
        const birdRect =new Rectangle(bird.x,bird.y + bird.offSet,bird.width,bird.height);

        for (let pencil of pencils) {
            const pencilRect = new Rectangle(pencil.x,pencil.y,pencil.width,pencil.height);
            if (birdRect.intersects(pencilRect)) {
                return true;
            }
        }
        return false;
    }

    //加分
    addScoreNumber(){
        const pencils = this.dataStore.get('pencils');
        const bird = this.dataStore.get('bird');
        const score = this.dataStore.get('score');
        //判断鸟越过铅笔
        if (bird.x + bird.width >= pencils[0].x &&score.isScore){
            score.scoreNumber++;
            score.isScore =false;
        }

    }

    //游戏运行
    run() {

        if (!this.isGameOver) {

            //绘制背景
            this.dataStore.get('background').draw();
            //绘制铅笔
            for (let pencil of this.dataStore.get('pencils')) {
                pencil.draw();
            }
            //绘制陆地
            this.dataStore.get('land').draw();

            this.outpencil();
            //调用判断是否生成铅笔的逻辑
            this.isCreatePencil();

            this.dataStore.get('bird').draw();

            this.addScoreNumber();

            this.dataStore.get('score').draw();

            if (this.crashLand()) {
                this.isGameOver = true;
            }
            if (this.crashPencil()) {
                this.isGameOver = true;
            }
            //定时器
            let timer = requestAnimationFrame(() => {
                this.run()
            });
            this.dataStore.put('timer', timer);

        } else {
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.get('start').draw();

            this.dataStore.destroy();
        }


    }
}