import { createNote } from "./createnote.js";

class indexJs {
  constructor() {
    this.createNote = new createNote();
  }
}

const newList = new indexJs();
