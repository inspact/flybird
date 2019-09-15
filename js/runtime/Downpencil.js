import {DataStore} from "../base/DataStore.js";
import {Pencil} from "./Pencil.js";

export class Downpencil extends Pencil{
    constructor(top){
        super(
            DataStore.getInstance().res.get('pie_down'),
            top
        );
        this.y = this.y + top + (window.innerHeight /3);
    }
}