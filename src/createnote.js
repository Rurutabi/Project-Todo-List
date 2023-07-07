export class createNote {
  noteContainer = document.querySelector(".note-container");
  createButton = document.querySelector(".create-button");
  formContainer = document.querySelector(".form-container");
  overlay = document.querySelector(".overlay");

  //Sidebar
  homeSidebar = document.querySelector(".home-sidebar");
  todaySidebar = document.querySelector(".today-sidebar");
  weekSidebar = document.querySelector(".week-sidebar");
  projectSidebar = document.querySelector(".project-sidebar");
  noteSidebar = document.querySelector(".note-sidebar");

  //Todo
  todoTitle = document.querySelector(".todo-title");
  todoDetail = document.querySelector(".todo-detail");
  todoButton = document.querySelector(".todo-button");
  todoDate = document.querySelector(".date");
  todoCheckbox = document.querySelectorAll(".checkbox-button");

  //Detail
  detailContainer = document.querySelector(".detail-container");
  detailTitle = document.querySelector(".detail-title");
  detailProject = document.querySelector(".detail-project");
  detailPriority = document.querySelector(".detail-priority");
  detailDate = document.querySelector(".detail-date");
  detailDetails = document.querySelector(".detail-details");

  //Edit
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
    this._highlightSidebar();
  }

  _highlightSidebar() {
    this.homeSidebar.addEventListener("click", () => {
      this._removeHighlight();
      this.homeSidebar.classList.add("highlight");
    });
    this.todaySidebar.addEventListener("click", () => {
      this._removeHighlight();
      this.todaySidebar.classList.add("highlight");
    });
    this.weekSidebar.addEventListener("click", () => {
      this._removeHighlight();
      this.weekSidebar.classList.add("highlight");
    });
    this.projectSidebar.addEventListener("click", () => {
      this._removeHighlight();
      this.projectSidebar.classList.add("highlight");
    });
    this.noteSidebar.addEventListener("click", () => {
      this._removeHighlight();
      this.noteSidebar.classList.add("highlight");
    });
  }

  _noteTitle(note) {
    this.homeSidebar.addEventListener("click", () => {
      note.classList.remove("hide");
    });
    this.todaySidebar.addEventListener("click", () => {
      if (note.classList.contains("today") === false) {
        note.classList.add("hide");
      } else if (note.classList.contains("today") === true) {
        note.classList.remove("hide");
      }
    });
    this.weekSidebar.addEventListener("click", () => {
      if (note.classList.contains("week") === false) {
        note.classList.add("hide");
      } else if (note.classList.contains("week") === true) {
        note.classList.remove("hide");
      }
    });
    this.projectSidebar.addEventListener("click", () => {
      if (note.classList.contains("project") === false) {
        note.classList.add("hide");
      } else if (note.classList.contains("project") === true) {
        note.classList.remove("hide");
      }
    });
    this.noteSidebar.addEventListener("click", () => {
      if (note.classList.contains("Note") === false) {
        note.classList.add("hide");
      } else if (note.classList.contains("Note") === true) {
        note.classList.remove("hide");
      }
    });
  }

  _removeHighlight() {
    this.homeSidebar.classList.remove("highlight");
    this.todaySidebar.classList.remove("highlight");
    this.weekSidebar.classList.remove("highlight");
    this.projectSidebar.classList.remove("highlight");
    this.noteSidebar.classList.remove("highlight");
  }

  _addNote(titleValue, detailValue, dateValue, priority) {
    const note = document.createElement("div");
    note.className = "note";
    this._categorizeNote(note);
    this._noteTitle(note);

    this._priorityColor(priority, note);
    this.noteContainer.appendChild(note);

    const noteLeft = document.createElement("div");
    noteLeft.className = "note-left";
    note.appendChild(noteLeft);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
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

    this._showDetail(detailButton, title, detailValue, date, priority, note);
    this._removeDetail();
    this._removeNote(note, binIcon);
    this._showEdit(editIcon, title, detailValue, date, priority, note);
    this._removeEdit();
  }

  _projectValue(note) {
    if (note.classList.contains("today")) {
      return "today";
    } else if (note.classList.contains("week")) {
      return "week";
    } else if (projectSidebar.classList.contains("project")) {
      return "project";
    } else if (noteSidebar.classList.contains("stickynote")) {
      return "note";
    }
  }

  _categorizeNote(note) {
    if (this.homeSidebar.classList.contains("highlight")) {
      note.classList.add("home");
    } else if (this.todaySidebar.classList.contains("highlight")) {
      note.classList.add("today");
    } else if (this.weekSidebar.classList.contains("highlight")) {
      note.classList.add("week");
    } else if (this.projectSidebar.classList.contains("highlight")) {
      note.classList.add("project");
    } else if (this.noteSidebar.classList.contains("highlight")) {
      note.classList.add("stickynote");
    }
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

  _showEdit(editIcon, title, detailValue, date, priority, note) {
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

          this._priorityColor(this._getPriority(this.editCheckbox), note);
          priority = this._getPriority(this.editCheckbox);
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

  _showDetail(detailButton, title, detailValue, date, priority, note) {
    detailButton.addEventListener("click", () => {
      this.detailTitle.textContent = title.textContent;
      this.detailProject.textContent = this._projectValue(note);
      this.detailPriority.textContent = priority;
      this.detailDate.textContent = date.textContent;
      this.detailDetails.textContent = detailValue;

      this.detailContainer.classList.remove("hide");
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

  _removeDetail() {
    this.overlay.addEventListener("click", () => {
      this.detailContainer.classList.add("hide");
      this.overlay.classList.add("hide");
    });
  }

  _removeNote(note, binIcon) {
    binIcon.addEventListener("click", () => {
      note.remove();
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

  _getPriority(checkbox) {
    let priorityStore = "";
    checkbox.forEach((checkValue) => {
      if (checkValue.checked === true) {
        priorityStore = checkValue.value;
      }
    });

    return priorityStore;
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
    note.classList.remove("green");
    note.classList.remove("yellow");
    note.classList.remove("red");
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
        if (this.homeSidebar.classList.contains("highlight") !== true) {
          const newForm = {
            title: this.todoTitle.value,
            detail: this.todoDetail.value,
            date: this._customDate(this.todoDate.value),
            priority: this._getPriority(this.todoCheckbox),
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
      }
    });
  }
}
