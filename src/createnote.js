export class createNote {
  noteContainer = document.querySelector(".note-container");
  createButton = document.querySelector(".create-button");
  formContainer = document.querySelector(".form-container");
  overlay = document.querySelector(".overlay");
  todoTitle = document.querySelector(".todo-title");
  todoDetail = document.querySelector(".todo-detail");
  todoButton = document.querySelector(".todo-button");
  todoDate = document.querySelector(".date");
  todoCheckbox = document.querySelectorAll(".checkbox-button");
  formDetail = {};

  constructor() {
    this._showForm();
    this._removeOverlay();
    this._storeValue();
  }

  _createNote(titleValue, detailValue, dateValue, checkboxValue) {
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
    label.textContent = titleValue;
    noteLeft.appendChild(label);

    const noteRight = document.createElement("div");
    noteRight.className = "note-right";
    note.appendChild(noteRight);

    const detailButton = document.createElement("button");
    detailButton.className = "detail-button";
    detailButton.textContent = "Detail";
    noteRight.appendChild(detailButton);

    const date = document.createElement("p");
    date.textContent = dateValue;
    noteRight.appendChild(date);

    const editIcon = document.createElement("i");
    editIcon.className = "fa-solid fa-pen-to-square";
    noteRight.appendChild(editIcon);

    const binIcon = document.createElement("i");
    binIcon.className = "fa-solid fa-trash-can";
    noteRight.appendChild(binIcon);
  }

  _showForm() {
    this.createButton.addEventListener("click", () => {
      this.formContainer.classList.remove("hide");
      this.overlay.classList.remove("hide");
    });
  }

  _removeOverlay() {
    this.overlay.addEventListener("click", () => {
      this._removeForm();
    });
  }

  _removeForm() {
    this.overlay.classList.add("hide");
    this.formContainer.classList.add("hide");
  }

  _emptyForm() {
    this.todoTitle.value = "";
    this.todoDetail.value = "";
    this.todoDate.value = "";
    this.todoCheckbox.forEach((checkValue) => (checkValue.checked = false));
  }

  _customDate(date) {
    const dateValue = date.split("-");
    const customDate = `${dateValue[2]}/${dateValue[1]}/${dateValue[0]}`;
    return customDate;
  }

  _checkDate() {
    for (var i = 0; i < this.todoCheckbox.length; i++) {
      if (this.todoCheckbox[i].checked) {
        return true; // Return true if any radio button is selected
      }
    }
    return false;
  }

  _storeValue() {
    this.todoButton.addEventListener("click", (e) => {
      if (
        this.todoTitle.value !== "" &&
        this.todoDetail.value !== "" &&
        this.todoDate.value !== "" &&
        this._checkDate() === true
      ) {
        e.preventDefault();
        this.formDetail.title = this.todoTitle.value;
        this.formDetail.detail = this.todoDetail.value;
        this.formDetail.date = this._customDate(this.todoDate.value);

        this.todoCheckbox.forEach((checkValue) => {
          if (checkValue.checked === true) {
            this.formDetail.check = checkValue.value;
          }
        });

        this._createNote(
          this.formDetail.title,
          this.formDetail.detail,
          this.formDetail.date,
          this.formDetail.check
        );

        this._removeForm();
        this._emptyForm();
      }
    });
  }
}
