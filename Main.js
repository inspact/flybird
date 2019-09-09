//游戏主文件
/**
 * 把精灵抽象成类，创建对象放到datastore中
 * 导演类从dataStore取出对象调用draw方法绘制
 */
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {DataStore} from "./js/base/DataStore.js";
import {Director} from "./js/Director.js";
import {Background} from "./js/runtime/Background.js";
import {Land} from "./js/runtime/Land.js";

export class Main {
    constructor() {
        //获取画笔
        this.ctx = document.getElementById('bird').getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        //获取图片资源
        const loader = new ResourceLoader();
        loader.onLoaded(map =>this.onFirstLoaded(map));
    }

    onFirstLoaded(map) {
        //dataStore存数据
        this.dataStore.res = map;
        this.dataStore.ctx = this.ctx;
        this.init();
    }
    //初始化游戏
    init(){
        //向游戏中添加背景对象
        this.dataStore.put('background',new Background());
        //添加陆地
        this.dataStore.put('land',new Land());

        this.director.run();
    }

}
