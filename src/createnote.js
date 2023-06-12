export class createNote {
  noteContainer = document.querySelector(".note-container");
  createButton = document.querySelector(".create-button");
  formContainer = document.querySelector(".form-container");
  overlay = document.querySelector(".overlay");
  todoTitle = document.querySelector(".todo-title");
  todoDetail = document.querySelector(".todo-detail");
  todoButton = document.querySelector(".todo-button");
  todoDate = document.querySelector(".date");
  toDoCheckbox = document.querySelectorAll(".thecheck");
  formDetail = {};
  constructor() {
    this.showForm();
    this.removeForm();
    this.storeValue();
  }

  createNote(titleValue, detailValue) {
    const note = document.createElement("div");
    note.className = "note";
    this.noteContainer.appendChild(note);

    const noteLeft = document.createElement("div");
    noteLeft.className = "note-left";
    note.appendChild(noteLeft);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "note1";
    checkbox.name = "note1";
    checkbox.value = "note1";
    noteLeft.appendChild(checkbox);

    const label = document.createElement("label");
    label.for = "note";
    label.textContent = "Example from Javascript";
    noteLeft.appendChild(label);

    const noteRight = document.createElement("div");
    noteRight.className = "note-right";
    note.appendChild(noteRight);

    const button = document.createElement("button");
    button.className = "edit-button";
    button.textContent = "Edit";
    noteRight.appendChild(button);

    const date = document.createElement("p");
    date.textContent = "Random date";
    noteRight.appendChild(date);

    const editIcon = document.createElement("i");
    editIcon.className = "fa-solid fa-pen-to-square";
    noteRight.appendChild(editIcon);

    const binIcon = document.createElement("i");
    binIcon.className = "fa-solid fa-trash-can";
    noteRight.appendChild(binIcon);
  }

  showForm() {
    this.createButton.addEventListener("click", () => {
      this.formContainer.classList.remove("hide");
      this.overlay.classList.remove("hide");
    });
  }

  removeForm() {
    this.overlay.addEventListener("click", () => {
      this.overlay.classList.add("hide");
      this.formContainer.classList.add("hide");
    });
  }

  storeValue() {
    this.todoButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.formDetail.title = this.todoTitle.value;
      this.formDetail.detail = this.todoDetail.value;
      this.formDetail.date = this.todoDate.value;

      this.toDoCheckbox.forEach((checkValue) => {
        if (checkValue.checked === true) {
          this.formDetail.check = checkValue.value;
        }
      });

      console.log(this.formDetail);
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
