import { LightningElement , track} from 'lwc';
import addNote from "@salesforce/apex/noteController.addNote";
import getSavedNotes from "@salesforce/apex/noteController.getSavedNotes";


export default class NoteMain extends LightningElement {


    @track noteList = [];
    aName1;
    pYear1;
    dNote1;
    mNote1;



    //metodo que se llama ni bien se inicia la coneccion sirve para precargar cosas
    connectedCallback(){ //metodo ciclo de vida
        this.fetchToDos();
    }

    authorNameHandler(event){
        this.aName1 = event.target.value;
    }
    
    pubYearHandler(event){
        this.pYear1 = event.target.value;
    } 

    descNoteHandler(event){
        this.dNote1 = event.target.value;
    } 

    mainNoteHandler(event){
        this.mNote1 = event.target.value;
    } 


    addNotesHandler(){
        //por el momento obtenemos los imputs de este modo buscando por el cuerpo del html un string id (Revisar)
        const noteItem = {
            aName: this.aName1,
            pYear: this.pYear1,
            dNote: this.dNote1,
            mNote: this.mNote1,
            saved: false
        }
        addNote({ payload: JSON.stringify(noteItem)}).then( response =>{
            console.log('Item inserted sucessfully');
            this.fetchToDos();
        }).catch( error => {
            console.log('Error inserting item'+ error);
        });
        //inputBox.value = "";
    }

    get savedNotes(){
        return this.noteList;
    }

    //metodo para llamar algo del backend en nuestro caso una clase de apex 
    fetchToDos(){
        getSavedNotes().then(result => {
            if(result){
                this.noteList = result;
            }
        }).catch(error => {
            console.log('Error fetching'+ error);
        });
    }

}