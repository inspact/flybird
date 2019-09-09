//导演类，控制整个游戏的逻辑
import {DataStore} from "./base/DataStore.js";

export class Director {
    constructor(){
        this.dataStore = DataStore.getInstance();
    }
    static getInstance(){
        if (!Director.instance){
            Director.instance = new Director();
        }
        return Director.instance;
    }
    //游戏运行
    run(){
        //绘制背景
        this.dataStore.get('background').draw();
        //绘制陆地
        this.dataStore.get('land').draw();
        //定时器
        let timer = requestAnimationFrame(()=>{this.run()});
        this.dataStore.put('timer',timer);
    }
}