//usamos api para poder comunicar modulos js de diferentes lwc
import { LightningElement, api } from 'lwc';

export default class TaskToDo extends LightningElement {
    @api taskItemId;
    @api taskItemName;
    @api done = false;

    get containerClass(){
        return this.done ? "taskToDo completed" : "taskToDo upcoming";
    }
}