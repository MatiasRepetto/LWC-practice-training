import { LightningElement, track } from 'lwc';
import addTodo from "@salesforce/apex/toDoController.addTodo";
import getCurrentTodo from "@salesforce/apex/toDoController.addTodo";

export default class ToDoManager extends LightningElement {
    
    //Se pone @track para poder hacer las vars reactivas, tambien hay que hacer un include
    //Luego de Spring'20 no es necesario usar @track pero se recomienda 
    @track time = "00:00";
    @track greetings = "Good evening";
    @track tasksList = [];

    //metodo que se llama ni bien se inicia la coneccion sirve para precargar cosas
    connectedCallback(){ //metodo ciclo de vida
        this.getTime();
        this.fetchToDos();

        //Funcion para hacer llamados a la funcion periodicamente, 
        //esta nos deja actualizar contenido de pagina sin refrescar manualmente 
        setInterval(()=>{
            this.getTime();
        }, 1000*60);
    }

    getTime(){
        const date = new Date();
        const hour = date.getHours();
        const min = date.getMinutes();

        this.time = `${hour}:${this.getDoubleDigit(min)}`
        this.greetings = this.getDaylight(hour);
    }

    getDoubleDigit(min){
        return min < 10 ? "0"+min : min;
    }

    getDaylight(hour){
        if(hour < 12){
            this.greetings = "Good Morning";
        }else if(hour >= 12 && hour < 17){
            this.greetings = "Good Evening";
        }else{
            this.greetings = "Good Night";
        }
    }

    addToDoHandler(){
        const inputBox = this.template.querySelector("lightning-input");
        const taskItem = {
            //taskItemId: this.tasksList.length,
            taskItemName: inputBox.value,
            done: false
            //taskItemDate: new Date()
        }
        addTodo({payload: JSON.stringify(taskItem)}).then( response =>{
            console.log('Item inserted sucessfully');
            this.fetchToDos();
        }).catch( error => {
            console.error('Error inserting item'+ error);
        })
        inputBox.value = "";
    }

    get upComingTasks(){
        return this.taskItem && this.tasksList.length ? this.taskItem.filter( taskItem => !taskItem.done): [];
    }

    get completedTasks(){
        return this.taskItem && this.tasksList.length ? this.taskItem.filter( taskItem => taskItem.done): [];
    }

    //metodo para llamar algo del backend en nuestro caso una clase de apex 
    fetchToDos(){
        getCurrentTodo().then(result => {
            if(result){
                this.taskItem = result;
            }
        }).catch(error => {
            console.error('Error fetching'+ error);
        })
    }

}