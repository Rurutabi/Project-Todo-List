export class createNote {
  noteContainer = document.querySelector(".note-container");
  createButton = document.querySelector(".create-button");
  formContainer = document.querySelector(".form-container");
  stickyContainer = document.querySelector(".sticky-container");
  overlay = document.querySelector(".overlay");

  //Sidebar
  homeSidebar = document.querySelector(".home-sidebar");
  todaySidebar = document.querySelector(".today-sidebar");
  weekSidebar = document.querySelector(".week-sidebar");
  projectSidebar = document.querySelector(".project-sidebar");
  stickynoteSidebar = document.querySelector(".note-sidebar");

  //Form list
  todoList = document.querySelector(".todo-list");
  projectList = document.querySelector(".project-list");
  noteList = document.querySelector(".note-list");
  listContainer = document.querySelector(".list-container");

  //Todo Form
  todoForm = document.querySelector(".todo-form");
  todoTitle = document.querySelector(".todo-title");
  todoDetail = document.querySelector(".todo-detail");
  todoButton = document.querySelector(".todo-button");
  todoDate = document.querySelector(".date");
  todoCheckbox = document.querySelectorAll(".checkbox-button");

  //Project Form
  projectForm = document.querySelector(".project-form");
  projectButton = document.querySelector(".project-button");
  projectTitle = document.querySelector(".project-title");

  //Note Form
  stickynoteForm = document.querySelector(".note-form");
  stickynoteTitle = document.querySelector(".sticky-title");
  stickynoteDetail = document.querySelector(".sticky-detail");
  stickynoteButton = document.querySelector(".sticky-button");

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
  storeNote = [];
  storeProject = [];
  storeSticky = [];
  projectDetail = [];

  constructor() {
    this._showForm();
    this._removeOverlay();
    this._createElement();
    this._highlightSidebar();
    this._changeForm();
    this._getLocalStorage();
    this._projectNote();
  }

  //Sidebar
  _highlightSidebar() {
    this.homeSidebar.addEventListener("click", () => {
      this._switchContainer();
      this._removeHighlight();
      this.homeSidebar.classList.add("highlight");
      console.log(this.storeNote);
      console.log(this.storeProject);
    });
    this.todaySidebar.addEventListener("click", () => {
      this._switchContainer();
      this._removeHighlight();
      this.todaySidebar.classList.add("highlight");
    });
    this.weekSidebar.addEventListener("click", () => {
      this._switchContainer();
      this._removeHighlight();
      this.weekSidebar.classList.add("highlight");
    });
    this.stickynoteSidebar.addEventListener("click", () => {
      this._removeHighlight();
      this.noteContainer.classList.add("hide");
      this.stickyContainer.classList.remove("hide");
      this.stickynoteSidebar.classList.add("highlight");
    });
  }

  _switchContainer() {
    this.stickyContainer.classList.add("hide");
    this.noteContainer.classList.remove("hide");
  }

  _removeHighlight() {
    this.homeSidebar.classList.remove("highlight");
    this.todaySidebar.classList.remove("highlight");
    this.weekSidebar.classList.remove("highlight");
    this.stickynoteSidebar.classList.remove("highlight");

    this.projectDetail.forEach((value) => {
      value.classList.remove("highlight");
    });
  }

  //Note
  _addNote(newNote) {
    const note = document.createElement("div");
    note.classList.add("note");
    note.classList.add(newNote.category);
    this._highlightNote(note);
    this._priorityColor(newNote.priority, note);
    this.noteContainer.appendChild(note);

    const noteLeft = document.createElement("div");
    noteLeft.className = "note-left";
    note.appendChild(noteLeft);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    noteLeft.appendChild(checkbox);

    const title = document.createElement("label");
    title.for = "note";
    title.textContent = newNote.title;
    noteLeft.appendChild(title);

    const noteRight = document.createElement("div");
    noteRight.className = "note-right";
    note.appendChild(noteRight);

    const detailButton = document.createElement("button");
    detailButton.className = "detail-button";
    detailButton.textContent = "Detail";
    noteRight.appendChild(detailButton);

    const date = document.createElement("p");
    date.textContent = newNote.date;
    noteRight.appendChild(date);

    const editIcon = document.createElement("i");
    editIcon.className = "fa-solid fa-pen-to-square";
    noteRight.appendChild(editIcon);

    const binIcon = document.createElement("i");
    binIcon.className = "fa-solid fa-trash-can";
    noteRight.appendChild(binIcon);

    this._showDetail(detailButton, title, date, note, newNote);
    this._removeNote(note, binIcon, newNote);
    this._showEdit(editIcon, title, date, note, newNote);
  }

  _addProject(newProject) {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    const subProject = document.createElement("li");
    subProject.textContent = newProject.title;
    subProject.classList.add(subProject.textContent);
    subProject.classList.add("sub-project");

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-xmark");

    this.listContainer.appendChild(taskContainer);
    taskContainer.appendChild(subProject);
    taskContainer.appendChild(icon);

    this.projectDetail.push(subProject);
    this._addOverflow();
    this._highlightProject(subProject);

    this._removeProject(taskContainer, subProject, icon);
  }

  _removeProject(taskContainer, subProject, icon) {
    icon.addEventListener("click", () => {
      taskContainer.remove();

      const index = this.storeProject.findIndex(
        (value) => value.title === subProject.textContent
      );

      const allNote = document.querySelectorAll(".note");

      allNote.forEach((value) => {
        if (value.classList.contains(subProject.textContent)) {
          value.remove();
          const valueString = value.textContent.split("Detail");
          const notePriority = this._getProjectPriority(value);

          console.log(notePriority);

          const index = this.storeNote.findIndex(
            (value) =>
              value.title === valueString[0] &&
              value.date === valueString[1] &&
              value.priority === notePriority
          );

          this.storeNote.splice(index, 1);
          this._setLocalStroage();
        }
      });

      this.storeProject.splice(index, 1);
      this._setLocalStroage();
    });
  }

  _getProjectPriority(note) {
    if (note.classList.contains("red")) {
      return "red";
    } else if (note.classList.contains("yellow")) {
      return "yellow";
    } else if (note.classList.contains("green")) {
      return "green";
    }
  }

  _projectNote() {
    const allNote = document.querySelectorAll(".note");
    const subJectNote = document.querySelectorAll(".sub-project");
    subJectNote.forEach((value) =>
      value.addEventListener("click", () => {
        this._switchContainer();
        allNote.forEach((note) => {
          if (note.classList.contains(value.textContent)) {
            note.classList.remove("hide");
          } else {
            note.classList.add("hide");
          }
        });
      })
    );
  }

  _addOverflow() {
    if (this.listContainer.clientHeight > 119) {
      this.listContainer.style.overflowY = "auto";
    }
  }

  _highlightProject(subProject) {
    subProject.addEventListener("click", () => {
      this._removeHighlight();
      this.projectDetail.forEach((value) => {
        value.classList.remove("highlight");
      });
      subProject.classList.add("highlight");
    });
  }

  _highlightNote(note) {
    this.homeSidebar.addEventListener("click", () => {
      note.classList.remove("hide");
    });
    this.todaySidebar.addEventListener("click", () => {
      if (note.classList.contains("today") === true) {
        note.classList.remove("hide");
      } else {
        note.classList.add("hide");
      }
    });
    this.weekSidebar.addEventListener("click", () => {
      if (note.classList.contains("week") === false) {
        note.classList.add("hide");
      } else if (note.classList.contains("week") === true) {
        note.classList.remove("hide");
      }
    });
    this.stickynoteSidebar.addEventListener("click", () => {
      if (note.classList.contains("Note") === false) {
        note.classList.add("hide");
      } else if (note.classList.contains("Note") === true) {
        note.classList.remove("hide");
      }
    });
  }

  _categorizeNote() {
    if (this.homeSidebar.classList.contains("highlight")) {
      return "home";
    } else if (this.todaySidebar.classList.contains("highlight")) {
      return "today";
    } else if (this.weekSidebar.classList.contains("highlight")) {
      return "week";
    } else if (this.stickynoteSidebar.classList.contains("highlight")) {
      return "stickynote";
    }

    for (const element of this.projectDetail) {
      if (element.classList.contains("highlight")) {
        return element.textContent;
      }
    }
  }

  _removeNote(note, binIcon, newNote) {
    binIcon.addEventListener("click", () => {
      note.remove();

      console.log(newNote);

      // Find the index of the book to remove
      const index = this.storeNote.findIndex(
        (value) =>
          value.title === newNote.title &&
          value.detail === newNote.detail &&
          value.date === newNote.date &&
          value.priority === newNote.priority
      );

      this.storeNote.splice(index, 1);
      this._setLocalStroage();
    });
  }

  //Detail
  _showDetail(detailButton, title, date, note, newNote) {
    detailButton.addEventListener("click", () => {
      this.detailTitle.textContent = title.textContent;
      this.detailProject.textContent = this._getPname(note);
      this.detailPriority.textContent = newNote.priority;
      this.detailDate.textContent = date.textContent;
      this.detailDetails.textContent = newNote.detail;
      this.detailContainer.classList.remove("hide");
      this.overlay.classList.remove("hide");
    });
  }

  _getPname(note) {
    if (note.classList.contains("today")) {
      return "today";
    } else if (note.classList.contains("week")) {
      return "week";
    } else {
      for (const element of this.projectDetail) {
        if (element.classList.contains("highlight")) {
          return element.textContent;
        }
      }
    }
  }

  _showEdit(editIcon, title, date, note, newNote) {
    editIcon.addEventListener("click", () => {
      this.editContainer.classList.remove("hide");
      this.overlay.classList.remove("hide");
      this.editTitle.value = title.textContent;
      this.editDetail.value = newNote.detail;
      this.editDate.value = this._resetDate(date.textContent);

      this._tickPriority(newNote.priority);
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
          newNote.title = this.editTitle.value;

          date.textContent = this._customDate(this.editDate.value);
          newNote.date = this._customDate(this.editDate.value);

          newNote.detail = this.editDetail.value;

          this._priorityColor(this._getPriority(this.editCheckbox), note);
          newNote.priority = this._getPriority(this.editCheckbox);

          this._setLocalStroage();
          this._removeEdit();
        }
      };

      this.editButton.addEventListener("click", this._editNote);
    });
  }

  _removeEdit() {
    this.editContainer.classList.add("hide");
    this.overlay.classList.add("hide");
    this.editTitle.value = "";
    this.editDetail.value = "";
    this.editDate.value = "";
  }

  _showForm() {
    this.createButton.addEventListener("click", () => {
      this.formContainer.classList.remove("hide");
      this.overlay.classList.remove("hide");
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

  _createElement() {
    this.todoButton.addEventListener("click", (e) => {
      if (
        this.todoTitle.value !== "" &&
        this.todoDetail.value !== "" &&
        this.todoDate.value !== "" &&
        this._checkPriority(this.todoCheckbox) === true &&
        !this.stickynoteSidebar.classList.contains("highlight")
      ) {
        e.preventDefault();

        if (this.homeSidebar.classList.contains("highlight") !== true) {
          const newNote = {
            title: this.todoTitle.value,
            detail: this.todoDetail.value,
            date: this._customDate(this.todoDate.value),
            priority: this._getPriority(this.todoCheckbox),
            category: this._categorizeNote(),
          };

          this.storeNote.push(newNote);
          this._setLocalStroage();
          this._addNote(newNote);

          this._projectNote();

          this._removeForm();
          this._emptyForm();
        }
      }
    });

    this.projectButton.addEventListener("click", (e) => {
      if (this.projectTitle.value !== "") {
        e.preventDefault();
        const newProject = {
          title: this.projectTitle.value,
        };

        this.storeProject.push(newProject);
        this._setLocalStroage();
        this._addProject(newProject);
        this._projectNote();
        this.projectTitle.value = "";
        this._removeForm();
      }
    });

    this.stickynoteButton.addEventListener("click", (e) => {
      if (this.stickynoteTitle !== "" && this.stickynoteDetail !== "") {
        e.preventDefault();

        const newSticky = {
          title: this.stickynoteTitle.value,
          detail: this.stickynoteDetail.value,
        };
        this.noteContainer.classList.add("hide");
        this.storeSticky.push(newSticky);

        this.stickyContainer.classList.remove("hide");
        this._removeHighlight();
        this.stickynoteSidebar.classList.add("highlight");
        this._setLocalStroage();
        this._addStickynote(newSticky);
        this.stickynoteTitle.value = "";
        this.stickynoteDetail.value = "";
        this._removeForm();
      }
    });
  }

  _addStickynote(newSticky) {
    // Create the sticky note
    const stickyNote = document.createElement("div");
    stickyNote.className = "sticky-note";

    // Create the sticky header
    const stickyHeader = document.createElement("div");
    stickyHeader.className = "sticky-header";

    // Create the sticky title
    const stickyTitle = document.createElement("h3");
    stickyTitle.className = "sticky-title";
    stickyTitle.textContent = newSticky.title;

    // Create the close icon
    const closeIcon = document.createElement("i");
    closeIcon.className = "fa-solid fa-xmark";
    this._removeSticky(stickyNote, closeIcon, newSticky);

    // Create the sticky detail
    const stickyDetail = document.createElement("p");
    stickyDetail.className = "sticky-detail";
    stickyDetail.textContent = newSticky.detail;

    // Append elements to their respective parents
    this.stickyContainer.appendChild(stickyNote);
    stickyNote.appendChild(stickyHeader);
    stickyNote.appendChild(stickyDetail);
    stickyHeader.appendChild(stickyTitle);
    stickyHeader.appendChild(closeIcon);

    // Calculate the height based on the content
    const words = newSticky.detail
      .split(/\s+/)
      .filter((word) => word !== "").length;
    console.log(words);
    const minHeight = 120; // Minimum height
    const calculatedHeight = Math.max(minHeight, minHeight + words * 3) + "px";

    stickyNote.style.height = calculatedHeight;
  }

  _removeSticky(stickyNote, closeIcon, newSticky) {
    closeIcon.addEventListener("click", () => {
      stickyNote.remove();

      const index = this.storeSticky.findIndex(
        (value) =>
          value.title === newSticky.title && value.detail === newSticky.detail
      );

      this.storeSticky.splice(index, 1);
      this._setLocalStroage();
    });
  }

  _changeForm() {
    this.todoList.addEventListener("click", () => {
      this._hideForm();
      this.todoForm.classList.remove("hide");
      this.todoList.classList.add("highlight");
    });
    this.projectList.addEventListener("click", () => {
      this._hideForm();
      this.projectForm.classList.remove("hide");
      this.projectList.classList.add("highlight");
    });
    this.noteList.addEventListener("click", () => {
      this._hideForm();
      this.stickynoteForm.classList.remove("hide");
      this.noteList.classList.add("highlight");
    });
  }

  _hideForm() {
    this.todoForm.classList.add("hide");
    this.todoList.classList.remove("highlight");
    this.projectForm.classList.add("hide");
    this.projectList.classList.remove("highlight");
    this.stickynoteForm.classList.add("hide");
    this.noteList.classList.remove("highlight");
  }

  _removeOverlay() {
    this.overlay.addEventListener("click", () => {
      this.overlay.classList.add("hide");
      this.detailContainer.classList.add("hide");
      this._removeForm();
      this._removeEdit();
    });
  }

  _setLocalStroage() {
    localStorage.setItem("storeNote", JSON.stringify(this.storeNote));
    localStorage.setItem("storeProject", JSON.stringify(this.storeProject));
    localStorage.setItem("storeSticky", JSON.stringify(this.storeSticky));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("storeNote"));
    const data1 = JSON.parse(localStorage.getItem("storeProject"));
    const data2 = JSON.parse(localStorage.getItem("storeSticky"));

    if (!data) return;
    if (!data1) return;
    if (!data2) return;

    this.storeNote = data;
    this.storeProject = data1;
    this.storeSticky = data2;

    this.storeNote.forEach((value) => {
      this._addNote(value);
    });

    this.storeProject.forEach((value) => {
      this._addProject(value);
    });

    this.storeSticky.forEach((value) => {
      this._addStickynote(value);
    });

    // localStorage.clear();
  }
}
