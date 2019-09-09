//加载资源的类
import Resource from './Resource.js'
export class ResourceLoader {


    constructor(){
        //存储所有image对象,资源的数组转化成map
        this.map = new Map(Resource);
        //遍历map创建image
        for(let [key,value] of this.map){
            const image = new Image();
            image.src = value;
            //创建好的image对象放到一个map中
            this.map.set(key,image);
        }
    }
   //浏览器加载完成
    onLoaded(callback){
        //计数器
        let loadCount = 0;

        for (let value of this.map.values()){
            value.onload = () =>{
               loadCount++;
               if (loadCount >= this.map.size){
                   // 调用回调函数将自己的map集合传递过去
                   callback(this.map);

               }
            }
        }

    }
}