(()=>{"use strict";class t{noteContainer=document.querySelector(".note-container");createButton=document.querySelector(".create-button");formContainer=document.querySelector(".form-container");stickyContainer=document.querySelector(".sticky-container");overlay=document.querySelector(".overlay");homeSidebar=document.querySelector(".home-sidebar");todaySidebar=document.querySelector(".today-sidebar");weekSidebar=document.querySelector(".week-sidebar");projectSidebar=document.querySelector(".project-sidebar");stickynoteSidebar=document.querySelector(".note-sidebar");todoList=document.querySelector(".todo-list");projectList=document.querySelector(".project-list");noteList=document.querySelector(".note-list");listContainer=document.querySelector(".list-container");todoForm=document.querySelector(".todo-form");todoTitle=document.querySelector(".todo-title");todoDetail=document.querySelector(".todo-detail");todoButton=document.querySelector(".todo-button");todoDate=document.querySelector(".date");todoCheckbox=document.querySelectorAll(".radio-button");projectForm=document.querySelector(".project-form");projectButton=document.querySelector(".project-button");projectTitle=document.querySelector(".project-title");stickynoteForm=document.querySelector(".note-form");stickynoteTitle=document.querySelector(".sticky-title");stickynoteDetail=document.querySelector(".sticky-detail");stickynoteButton=document.querySelector(".sticky-button");detailContainer=document.querySelector(".detail-container");detailTitle=document.querySelector(".detail-title");detailProject=document.querySelector(".detail-project");detailPriority=document.querySelector(".detail-priority");detailDate=document.querySelector(".detail-date");detailDetails=document.querySelector(".detail-details");editContainer=document.querySelector(".edit-container");editButton=document.querySelector(".edit-button");editTitle=document.querySelector(".edit-title");editDetail=document.querySelector(".edit-detail");editDate=document.querySelector(".edit-date");editLow=document.querySelector(".edit-low");editMedium=document.querySelector(".edit-medium");editHigh=document.querySelector(".edit-high");editCheckbox=document.querySelectorAll(".edit-checkbox");storeNote=[];storeProject=[];storeSticky=[];projectDetail=[];warning=document.querySelector(".warning");constructor(){this._showForm(),this._removeOverlay(),this._createElement(),this._highlightSidebar(),this._changeForm(),this._getLocalStorage(),this._projectNote()}_highlightSidebar(){this.homeSidebar.addEventListener("click",(()=>{this._switchContainer(),this._removeHighlight(),this.homeSidebar.classList.add("highlight"),console.log(this.storeNote),console.log(this.storeProject)})),this.todaySidebar.addEventListener("click",(()=>{this._switchContainer(),this._removeHighlight(),this.todaySidebar.classList.add("highlight")})),this.weekSidebar.addEventListener("click",(()=>{this._switchContainer(),this._removeHighlight(),this.weekSidebar.classList.add("highlight")})),this.stickynoteSidebar.addEventListener("click",(()=>{this._removeHighlight(),this.noteContainer.classList.add("hide"),this.stickyContainer.classList.remove("hide"),this.stickynoteSidebar.classList.add("highlight")}))}_switchContainer(){this.stickyContainer.classList.add("hide"),this.noteContainer.classList.remove("hide")}_removeHighlight(){this.homeSidebar.classList.remove("highlight"),this.todaySidebar.classList.remove("highlight"),this.weekSidebar.classList.remove("highlight"),this.stickynoteSidebar.classList.remove("highlight"),this.projectDetail.forEach((t=>{t.classList.remove("highlight")}))}_addNote(t){const e=document.createElement("div");e.classList.add("note"),e.classList.add(this._removeSpace(t)),this._highlightNote(e),this._priorityColor(t.priority,e),this.noteContainer.appendChild(e);const i=document.createElement("div");i.className="note-left",e.appendChild(i);const s=document.createElement("input");s.classList.add("checkbox"),s.type="checkbox",i.appendChild(s);const o=document.createElement("label");o.for="note",o.textContent=t.title,i.appendChild(o);const r=document.createElement("div");r.className="note-right",e.appendChild(r);const a=document.createElement("button");a.className="detail-button",a.textContent="Detail",r.appendChild(a);const c=document.createElement("p");c.textContent=t.date,r.appendChild(c);const l=document.createElement("i");l.className="fa-solid fa-pen-to-square",r.appendChild(l);const d=document.createElement("i");d.className="fa-solid fa-trash-can",r.appendChild(d),this._showDetail(a,o,c,e,t),this._removeNote(e,d,t),this._showEdit(l,o,c,e,t)}_addProject(t){const e=document.createElement("div");e.classList.add("task-container");const i=document.createElement("li");i.textContent=t.title,i.classList.add("sub-project");const s=document.createElement("i");s.classList.add("fa-solid","fa-xmark"),this.listContainer.appendChild(e),e.appendChild(i),e.appendChild(s),this.projectDetail.push(i),this._addOverflow(),this._highlightProject(i),this._removeProject(e,i,s)}_removeProject(t,e,i){i.addEventListener("click",(()=>{t.remove();const i=this.storeProject.findIndex((t=>t.title===e.textContent));document.querySelectorAll(".note").forEach((t=>{if(t.classList.contains(this._addSpace(e.textContent))){t.remove();const i=t.textContent.split("Detail"),s=this._getProjectPriority(t);console.log(i[0]),console.log(i[1]),console.log(s),console.log(e.textContent);const o=this.storeNote.findIndex((t=>t.title===i[0]&&t.date===i[1]&&t.priority===s&&t.category===e.textContent));this.storeNote.splice(o,1),this._setLocalStroage()}})),this._addOverflow(),this.storeProject.splice(i,1),this._setLocalStroage()}))}_getProjectPriority(t){return t.classList.contains("red")?"High":t.classList.contains("yellow")?"Medium":t.classList.contains("green")?"Low":void 0}_projectNote(){const t=document.querySelectorAll(".note");document.querySelectorAll(".sub-project").forEach((e=>e.addEventListener("click",(()=>{this._switchContainer(),t.forEach((t=>{t.classList.contains(this._addSpace(e.textContent))?t.classList.remove("hide"):t.classList.add("hide")}))}))))}_removeSpace(t){return t.category.includes(" ")?t.category.replace(/ /g,"-"):t.category}_addSpace(t){return t.includes(" ")?t.replace(/ /g,"-"):t}_addOverflow(){this.listContainer.clientHeight>119?this.listContainer.style.overflowY="auto":this.listContainer.clientHeight<119&&(this.listContainer.style.overflowY="")}_highlightProject(t){t.addEventListener("click",(()=>{this._removeHighlight(),this.projectDetail.forEach((t=>{t.classList.remove("highlight")})),t.classList.add("highlight")}))}_highlightNote(t){this.homeSidebar.addEventListener("click",(()=>{t.classList.remove("hide")})),this.todaySidebar.addEventListener("click",(()=>{!0===t.classList.contains("today")?t.classList.remove("hide"):t.classList.add("hide")})),this.weekSidebar.addEventListener("click",(()=>{!1===t.classList.contains("week")?t.classList.add("hide"):!0===t.classList.contains("week")&&t.classList.remove("hide")})),this.stickynoteSidebar.addEventListener("click",(()=>{!1===t.classList.contains("Note")?t.classList.add("hide"):!0===t.classList.contains("Note")&&t.classList.remove("hide")}))}_categorizeNote(){if(this.homeSidebar.classList.contains("highlight"))return"home";if(this.todaySidebar.classList.contains("highlight"))return"today";if(this.weekSidebar.classList.contains("highlight"))return"week";if(this.stickynoteSidebar.classList.contains("highlight"))return"stickynote";for(const t of this.projectDetail)if(t.classList.contains("highlight"))return t.textContent}_removeNote(t,e,i){e.addEventListener("click",(()=>{t.remove();const e=this.storeNote.findIndex((t=>t.title===i.title&&t.detail===i.detail&&t.date===i.date&&t.priority===i.priority));this.storeNote.splice(e,1),this._setLocalStroage()}))}_showDetail(t,e,i,s,o){t.addEventListener("click",(()=>{this.detailTitle.textContent=e.textContent,this.detailProject.textContent=this._getPname(s),this.detailPriority.textContent=o.priority,this.detailDate.textContent=i.textContent,this.detailDetails.textContent=o.detail,this.detailContainer.classList.remove("hide"),this.overlay.classList.remove("hide")}))}_getPname(t){if(t.classList.contains("today"))return"today";if(t.classList.contains("week"))return"week";for(const e of this.projectDetail)if(t.classList.contains(e.textContent))return e.textContent}_showEdit(t,e,i,s,o){t.addEventListener("click",(()=>{this.editContainer.classList.remove("hide"),this.overlay.classList.remove("hide"),this.editTitle.value=e.textContent,this.editDetail.value=o.detail,this.editDate.value=this._resetDate(i.textContent),this._tickPriority(o.priority),this.editButton.removeEventListener("click",this._editNote),this._editNote=t=>{""!==this.editTitle.value&&""!==this.editDetail.value&&""!==this.editDate.value&&!0===this._checkPriority(this.editCheckbox)&&(t.preventDefault(),e.textContent=this.editTitle.value,o.title=this.editTitle.value,i.textContent=this._customDate(this.editDate.value),o.date=this._customDate(this.editDate.value),o.detail=this.editDetail.value,this._priorityColor(this._getPriority(this.editCheckbox),s),o.priority=this._getPriority(this.editCheckbox),this._setLocalStroage(),this._removeEdit())},this.editButton.addEventListener("click",this._editNote)}))}_removeEdit(){this.editContainer.classList.add("hide"),this.overlay.classList.add("hide"),this.editTitle.value="",this.editDetail.value="",this.editDate.value=""}_showForm(){this.createButton.addEventListener("click",(()=>{this.formContainer.classList.remove("hide"),this.overlay.classList.remove("hide")}))}_removeForm(){this.overlay.classList.add("hide"),this.formContainer.classList.add("hide")}_emptyForm(){this.todoTitle.value="",this.todoDetail.value="",this.todoDate.value="",this.todoCheckbox.forEach((t=>t.checked=!1))}_resetDate(t){const e=t.split("/");return`${e[2]}-${e[1]}-${e[0]}`}_customDate(t){const e=t.split("-");return`${e[2]}/${e[1]}/${e[0]}`}_getPriority(t){let e="";return t.forEach((t=>{!0===t.checked&&(e=t.value)})),e}_checkPriority(t){for(var e=0;e<t.length;e++)if(t[e].checked)return!0;return!1}_tickPriority(t){"High"===t?this.editHigh.checked=!0:"Medium"===t?this.editMedium.checked=!0:"Low"===t&&(this.editLow.checked=!0)}_priorityColor(t,e){e.classList.remove("green"),e.classList.remove("yellow"),e.classList.remove("red"),"Low"===t?e.classList.add("green"):"Medium"===t?e.classList.add("yellow"):"High"===t&&e.classList.add("red")}_createElement(){this.todoButton.addEventListener("click",(t=>{if(""!==this.todoTitle.value&&""!==this.todoDetail.value&&""!==this.todoDate.value&&!0===this._checkPriority(this.todoCheckbox))if(t.preventDefault(),!0!==this.homeSidebar.classList.contains("highlight")&&!0!==this.stickynoteSidebar.classList.contains("highlight")){const t={title:this.todoTitle.value,detail:this.todoDetail.value,date:this._customDate(this.todoDate.value),priority:this._getPriority(this.todoCheckbox),category:this._categorizeNote()};this.storeNote.push(t),console.log(this.storeNote),this._setLocalStroage(),this._addNote(t),this._projectNote(),this.warning.classList.add("hide"),this._removeForm(),this._emptyForm()}else this.warning.classList.remove("hide"),setTimeout((()=>{this.warning.classList.add("hide")}),5e3)})),this.projectButton.addEventListener("click",(t=>{if(""!==this.projectTitle.value){t.preventDefault();const e={title:this.projectTitle.value};this.storeProject.push(e),this._setLocalStroage(),this._addProject(e),this._projectNote(),this.projectTitle.value="",this._removeForm()}})),this.stickynoteButton.addEventListener("click",(t=>{if(""!==this.stickynoteTitle.value&&""!==this.stickynoteDetail.value){t.preventDefault(),console.log(this.stickynoteDetail.value);const e={title:this.stickynoteTitle.value,detail:this.stickynoteDetail.value};this.noteContainer.classList.add("hide"),this.storeSticky.push(e),this.stickyContainer.classList.remove("hide"),this._removeHighlight(),this.stickynoteSidebar.classList.add("highlight"),this._setLocalStroage(),this._addStickynote(e),this.stickynoteTitle.value="",this.stickynoteDetail.value="",this._removeForm()}}))}_addStickynote(t){const e=document.createElement("div");e.className="sticky-note";const i=document.createElement("div");i.className="sticky-header";const s=document.createElement("h3");s.className="sticky-title",s.textContent=t.title;const o=document.createElement("i");o.className="fa-solid fa-xmark",this._removeSticky(e,o,t);const r=document.createElement("p");r.className="sticky-detail",r.textContent=t.detail,this.stickyContainer.appendChild(e),e.appendChild(i),e.appendChild(r),i.appendChild(s),i.appendChild(o);const a=t.detail.split(/\s+/).filter((t=>""!==t)).length;console.log(a);const c=Math.max(120,120+4.5*a)+"px";e.style.height=c}_removeSticky(t,e,i){e.addEventListener("click",(()=>{t.remove();const e=this.storeSticky.findIndex((t=>t.title===i.title&&t.detail===i.detail));this.storeSticky.splice(e,1),this._setLocalStroage()}))}_changeForm(){this.todoList.addEventListener("click",(()=>{this._hideForm(),this.todoForm.classList.remove("hide"),this.todoList.classList.add("highlight")})),this.projectList.addEventListener("click",(()=>{this._hideForm(),this.projectForm.classList.remove("hide"),this.projectList.classList.add("highlight")})),this.noteList.addEventListener("click",(()=>{this._hideForm(),this.stickynoteForm.classList.remove("hide"),this.noteList.classList.add("highlight")}))}_hideForm(){this.todoForm.classList.add("hide"),this.todoList.classList.remove("highlight"),this.projectForm.classList.add("hide"),this.projectList.classList.remove("highlight"),this.stickynoteForm.classList.add("hide"),this.noteList.classList.remove("highlight")}_removeOverlay(){this.overlay.addEventListener("click",(()=>{this.overlay.classList.add("hide"),this.detailContainer.classList.add("hide"),this._removeForm(),this._removeEdit()}))}_setLocalStroage(){localStorage.setItem("storeNote",JSON.stringify(this.storeNote)),localStorage.setItem("storeProject",JSON.stringify(this.storeProject)),localStorage.setItem("storeSticky",JSON.stringify(this.storeSticky))}_getLocalStorage(){const t=JSON.parse(localStorage.getItem("storeNote")),e=JSON.parse(localStorage.getItem("storeProject")),i=JSON.parse(localStorage.getItem("storeSticky"));t&&e&&i&&(this.storeNote=t,this.storeProject=e,this.storeSticky=i,this.storeNote.forEach((t=>{this._addNote(t)})),this.storeProject.forEach((t=>{this._addProject(t)})),this.storeSticky.forEach((t=>{this._addStickynote(t)})))}}new class{constructor(){this.createNote=new t}}})();