export class createNote {
  noteContainer = document.querySelector(".note-container");
  createButton = document.querySelector(".create-button");
  constructor() {
    this.createNew();
  }

  createNote() {
    const note = document.createElement("div");
    this.noteContainer.appendChild(note);

    const simpleText = document.createElement("p");
    simpleText.textContent = "hi";
    note.appendChild(simpleText);
  }

  createNew() {
    this.createButton.addEventListener("click", () => {
      this.createNote();
    });
  }
}

/* <div class="note-container">
<div class="note">
  <div class="note-left">
    <input type="checkbox" id="note1" name="note1" value="note1" />
    <label for="vehicle1"> My example note</label>
  </div>
  <div class="note-right">
    <button class="edit-button">Edit</button>
    <p class="date">Jun 9th</p>
    <i class="fa-solid fa-pen-to-square"></i>
    <i class="fa-solid fa-trash-can"></i>
  </div>
</div>
</div> */
