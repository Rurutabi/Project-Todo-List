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
  detailButton = document.querySelector(".detail-button");
  formDetail = {};

  constructor() {
    this._showForm();
    this._removeOverlay();
    this._storeValue();
  }

  _addNote(titleValue, detailValue, dateValue, checkboxValue) {
    const note = document.createElement("div");
    note.className = "note";
    this._priorityColor(checkboxValue, note);
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

    this._addDetail(
      titleValue,
      detailValue,
      dateValue,
      checkboxValue,
      detailButton,
      note,
      binIcon
    );
  }

  _addDetail(title, detail, date, priority, detailButton, note, binIcon) {
    const detailContainerDiv = document.createElement("div");
    detailContainerDiv.classList.add("detail-container");
    detailContainerDiv.classList.add("hide");

    const titleHeading = document.createElement("h2");
    titleHeading.classList.add("detail-title", "title");
    titleHeading.textContent = `${title}`;

    const detailListDiv = document.createElement("div");
    detailListDiv.classList.add("detail-list");

    const projectDetailDiv = document.createElement("div");
    projectDetailDiv.classList.add("detail-content");

    const projectHeader = document.createElement("p");
    projectHeader.classList.add("detail-header");
    projectHeader.textContent = "Project:";

    const projectValue = document.createElement("p");
    projectValue.textContent = "Today";

    const priorityDetailDiv = document.createElement("div");
    priorityDetailDiv.classList.add("detail-content");

    const priorityHeader = document.createElement("p");
    priorityHeader.classList.add("detail-header");
    priorityHeader.textContent = "Priority:";

    const priorityValue = document.createElement("p");
    priorityValue.textContent = `${priority}`;

    const dueDateDetailDiv = document.createElement("div");
    dueDateDetailDiv.classList.add("detail-content");

    const dueDateHeader = document.createElement("p");
    dueDateHeader.classList.add("detail-header");
    dueDateHeader.textContent = "Due Date:";

    const dueDateValue = document.createElement("p");
    dueDateValue.textContent = `${date}`;

    const detailsDetailDiv = document.createElement("div");
    detailsDetailDiv.classList.add("detail-content");

    const detailsHeader = document.createElement("p");
    detailsHeader.classList.add("detail-header");
    detailsHeader.textContent = "Details:";

    const detailsValue = document.createElement("p");
    detailsValue.textContent = `${detail}`;

    projectDetailDiv.appendChild(projectHeader);
    projectDetailDiv.appendChild(projectValue);
    priorityDetailDiv.appendChild(priorityHeader);
    priorityDetailDiv.appendChild(priorityValue);
    dueDateDetailDiv.appendChild(dueDateHeader);
    dueDateDetailDiv.appendChild(dueDateValue);
    detailsDetailDiv.appendChild(detailsHeader);
    detailsDetailDiv.appendChild(detailsValue);

    detailListDiv.appendChild(projectDetailDiv);
    detailListDiv.appendChild(priorityDetailDiv);
    detailListDiv.appendChild(dueDateDetailDiv);
    detailListDiv.appendChild(detailsDetailDiv);

    detailContainerDiv.appendChild(titleHeading);
    detailContainerDiv.appendChild(detailListDiv);

    document.body.appendChild(detailContainerDiv);

    this._showDetail(detailButton, detailContainerDiv);
    this._removeDetail(detailContainerDiv);
    this._removeNote(note, detailContainerDiv, binIcon);
  }

  _showForm() {
    this.createButton.addEventListener("click", () => {
      this.formContainer.classList.remove("hide");
      this.overlay.classList.remove("hide");
    });
  }

  _showDetail(detailButton, detailContainer) {
    detailButton.addEventListener("click", () => {
      detailContainer.classList.remove("hide");
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

  _removeDetail(detailContainerDiv) {
    this.overlay.addEventListener("click", () => {
      detailContainerDiv.classList.add("hide");
      this.overlay.classList.add("hide");
    });
  }

  _removeNote(note, detailContainerDiv, binIcon) {
    binIcon.addEventListener("click", () => {
      note.remove();
      detailContainerDiv.remove();
    });
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
        return true;
      }
    }
    return false;
  }

  _priorityColor(checkboxValue, note) {
    if (checkboxValue === "low") {
      note.classList.add("green");
    } else if (checkboxValue === "medium") {
      note.classList.add("yellow");
    } else if (checkboxValue === "high") {
      note.classList.add("red");
    }
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
            this.formDetail.priority = checkValue.value;
          }
        });

        this._addNote(
          this.formDetail.title,
          this.formDetail.detail,
          this.formDetail.date,
          this.formDetail.priority
        );

        this._removeForm();
        this._emptyForm();
      }
    });
  }
}
