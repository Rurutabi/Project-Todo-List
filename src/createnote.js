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
  editContainer = document.querySelector(".edit-container");
  editButton = document.querySelector(".edit-button");
  editTitle = document.querySelector(".edit-title");
  editDetail = document.querySelector(".edit-detail");
  editDate = document.querySelector(".edit-date");
  editLow = document.querySelector(".edit-low");
  editMedium = document.querySelector(".edit-medium");
  editHigh = document.querySelector(".edit-high");
  editCheckbox = document.querySelectorAll(".edit-checkbox");
  storeInfo = [];

  constructor() {
    this._showForm();
    this._removeOverlay();
    this._storeValue();
  }

  _addNote(titleValue, detailValue, dateValue, priority) {
    const note = document.createElement("div");
    note.className = "note";
    this._priorityColor(priority, note);
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

    const title = document.createElement("label");
    title.for = "note";
    title.textContent = titleValue;
    noteLeft.appendChild(title);

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
      title,
      detailValue,
      date,
      priority,
      detailButton,
      note,
      binIcon,
      editIcon
    );
  }

  _addDetail(
    title,
    detailValue,
    date,
    priority,
    detailButton,
    note,
    binIcon,
    editIcon
  ) {
    const detailContainerDiv = document.createElement("div");
    detailContainerDiv.classList.add("detail-container");
    detailContainerDiv.classList.add("hide");

    const titleHeading = document.createElement("h2");
    titleHeading.classList.add("detail-title", "title");
    titleHeading.textContent = `${title.textContent}`;

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
    dueDateValue.textContent = `${date.textContent}`;

    const detailsDetailDiv = document.createElement("div");
    detailsDetailDiv.classList.add("detail-content");

    const detailsHeader = document.createElement("p");
    detailsHeader.classList.add("detail-header");
    detailsHeader.textContent = "Details:";

    const detail = document.createElement("p");
    detail.textContent = `${detailValue}`;

    projectDetailDiv.appendChild(projectHeader);
    projectDetailDiv.appendChild(projectValue);
    priorityDetailDiv.appendChild(priorityHeader);
    priorityDetailDiv.appendChild(priorityValue);
    dueDateDetailDiv.appendChild(dueDateHeader);
    dueDateDetailDiv.appendChild(dueDateValue);
    detailsDetailDiv.appendChild(detailsHeader);
    detailsDetailDiv.appendChild(detail);

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
    this._showEdit(editIcon, title, detailValue, date, priority);
    this._removeEdit();
  }

  _removeEdit() {
    this.overlay.addEventListener("click", () => {
      this.editContainer.classList.add("hide");
      this.overlay.classList.add("hide");
      this.editTitle.value = "";
      this.editDetail.value = "";
      this.editDate.value = "";
    });
  }

  _showEdit(editIcon, title, detailValue, date, priority) {
    editIcon.addEventListener("click", () => {
      this.editContainer.classList.remove("hide");
      this.overlay.classList.remove("hide");
      this.editTitle.value = title.textContent;
      this.editDetail.value = detailValue;
      this.editDate.value = this._resetDate(date.textContent);
      this._tickPriority(priority);
      this.editButton.removeEventListener("click", this._editNote);

      this._editNote = (e) => {
        if (
          this.editTitle.value !== "" &&
          this.editDetail.value !== "" &&
          this.editDate.value !== "" &&
          this._checkPriority(this.editCheckbox) === true
        ) {
          e.preventDefault();
          title.textContent = this.editTitle.value;
          date.textContent = this._customDate(this.editDate.value);
          this.editContainer.classList.add("hide");
          this.overlay.classList.add("hide");
        }
      };

      this.editButton.addEventListener("click", this._editNote);
    });
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

  _resetDate(date) {
    const dateValue = date.split("/");
    const resetDate = `${dateValue[2]}-${dateValue[1]}-${dateValue[0]}`;
    return resetDate;
  }

  _customDate(date) {
    const dateValue = date.split("-");
    const customDate = `${dateValue[2]}/${dateValue[1]}/${dateValue[0]}`;
    return customDate;
  }

  _checkPriority(priorityCheckbox) {
    for (var i = 0; i < priorityCheckbox.length; i++) {
      if (priorityCheckbox[i].checked) {
        return true;
      }
    }
    return false;
  }

  _tickPriority(priority) {
    if (priority === "High") {
      this.editHigh.checked = true;
    } else if (priority === "Medium") {
      this.editMedium.checked = true;
    } else if (priority === "Low") {
      this.editLow.checked = true;
    }
  }

  _priorityColor(priority, note) {
    if (priority === "Low") {
      note.classList.add("green");
    } else if (priority === "Medium") {
      note.classList.add("yellow");
    } else if (priority === "High") {
      note.classList.add("red");
    }
  }

  _storeValue() {
    this.todoButton.addEventListener("click", (e) => {
      if (
        this.todoTitle.value !== "" &&
        this.todoDetail.value !== "" &&
        this.todoDate.value !== "" &&
        this._checkPriority(this.todoCheckbox) === true
      ) {
        e.preventDefault();

        let priorityStore = "";

        this.todoCheckbox.forEach((checkValue) => {
          if (checkValue.checked === true) {
            priorityStore = checkValue.value;
          }
        });

        const newForm = {
          title: this.todoTitle.value,
          detail: this.todoDetail.value,
          date: this._customDate(this.todoDate.value),
          priority: priorityStore,
        };

        this.storeInfo.push(this.newForm);
        this._addNote(
          newForm.title,
          newForm.detail,
          newForm.date,
          newForm.priority
        );

        this._removeForm();
        this._emptyForm();
      }
    });
  }
}
