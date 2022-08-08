import { LightningElement, api } from 'lwc';
import deleteNote from "@salesforce/apex/noteController.deleteNote";

export default class NoteItem extends LightningElement {
    @api noteId;
    @api noteAuthor;
    @api noteYear;
    @api descNote;
    @api mainNote;
    @api saved; 


    get containerClass(){
        return "noteItem Notes";
    }

    deleteNoteHandler(){
        deleteNote({ noteId: this.noteId })
      .then(result => {
        //on successful delete, fire an event to notify parent component
        this.dispatchEvent(new CustomEvent("delete", { detail: this.noteId }));
      })
      .catch(error => {
        console.error("Error in updatig records ", error);
      });
    }
}