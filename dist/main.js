(()=>{"use strict";class t{noteContainer=document.querySelector(".note-container");createButton=document.querySelector(".create-button");formContainer=document.querySelector(".form-container");overlay=document.querySelector(".overlay");homeSidebar=document.querySelector(".home-sidebar");todaySidebar=document.querySelector(".today-sidebar");weekSidebar=document.querySelector(".week-sidebar");projectSidebar=document.querySelector(".project-sidebar");noteSidebar=document.querySelector(".note-sidebar");todoList=document.querySelector(".todo-list");projectList=document.querySelector(".project-list");noteList=document.querySelector(".note-list");listContainer=document.querySelector(".list-container");todoForm=document.querySelector(".todo-form");todoTitle=document.querySelector(".todo-title");todoDetail=document.querySelector(".todo-detail");todoButton=document.querySelector(".todo-button");todoDate=document.querySelector(".date");todoCheckbox=document.querySelectorAll(".checkbox-button");projectForm=document.querySelector(".project-form");projectButton=document.querySelector(".project-button");projectTitle=document.querySelector(".project-title");noteForm=document.querySelector(".note-form");detailContainer=document.querySelector(".detail-container");detailTitle=document.querySelector(".detail-title");detailProject=document.querySelector(".detail-project");detailPriority=document.querySelector(".detail-priority");detailDate=document.querySelector(".detail-date");detailDetails=document.querySelector(".detail-details");editContainer=document.querySelector(".edit-container");editButton=document.querySelector(".edit-button");editTitle=document.querySelector(".edit-title");editDetail=document.querySelector(".edit-detail");editDate=document.querySelector(".edit-date");editLow=document.querySelector(".edit-low");editMedium=document.querySelector(".edit-medium");editHigh=document.querySelector(".edit-high");editCheckbox=document.querySelectorAll(".edit-checkbox");storeNote=[];storeProject=[];projectDetail=[];constructor(){this._showForm(),this._removeOverlay(),this._storeValue(),this._highlightSidebar(),this._changeForm()}_highlightSidebar(){this.homeSidebar.addEventListener("click",(()=>{this._removeHighlight(),this.homeSidebar.classList.add("highlight")})),this.todaySidebar.addEventListener("click",(()=>{this._removeHighlight(),this.todaySidebar.classList.add("highlight")})),this.weekSidebar.addEventListener("click",(()=>{this._removeHighlight(),this.weekSidebar.classList.add("highlight")})),this.noteSidebar.addEventListener("click",(()=>{this._removeHighlight(),this.noteSidebar.classList.add("highlight")}))}_removeHighlight(){this.homeSidebar.classList.remove("highlight"),this.todaySidebar.classList.remove("highlight"),this.weekSidebar.classList.remove("highlight"),this.noteSidebar.classList.remove("highlight"),this.projectDetail.forEach((t=>{t.classList.remove("highlight")}))}_addNote(t,e,i,o){const s=document.createElement("div");this._categorizeNote(s),this._highlightNote(s),this._priorityColor(o,s),s.classList.add("note"),this.noteContainer.appendChild(s);const d=document.createElement("div");d.className="note-left",s.appendChild(d);const a=document.createElement("input");a.type="checkbox",d.appendChild(a);const r=document.createElement("label");r.for="note",r.textContent=t,d.appendChild(r);const c=document.createElement("div");c.className="note-right",s.appendChild(c);const l=document.createElement("button");l.className="detail-button",l.textContent="Detail",c.appendChild(l);const h=document.createElement("p");h.textContent=i,c.appendChild(h);const n=document.createElement("i");n.className="fa-solid fa-pen-to-square",c.appendChild(n);const u=document.createElement("i");u.className="fa-solid fa-trash-can",c.appendChild(u),this._showDetail(l,r,e,h,o,s),this._removeNote(s,u),this._showEdit(n,r,e,h,o,s)}_addProject(t){const e=document.createElement("li");e.textContent=t,e.classList.add(e.textContent),e.classList.add("sub-project"),this.listContainer.appendChild(e),this.projectDetail.push(e),this._addOverflow(),this._selectSubproject(e)}_addOverflow(){this.listContainer.clientHeight>118&&(this.listContainer.style.overflowY="auto")}_selectSubproject(t){t.addEventListener("click",(()=>{this._removeHighlight(),this.projectDetail.forEach((t=>{t.classList.remove("highlight")})),t.classList.add("highlight")}))}_highlightNote(t){this.homeSidebar.addEventListener("click",(()=>{t.classList.remove("hide")})),this.todaySidebar.addEventListener("click",(()=>{!1===t.classList.contains("today")?t.classList.add("hide"):!0===t.classList.contains("today")&&t.classList.remove("hide")})),this.weekSidebar.addEventListener("click",(()=>{!1===t.classList.contains("week")?t.classList.add("hide"):!0===t.classList.contains("week")&&t.classList.remove("hide")})),this.noteSidebar.addEventListener("click",(()=>{!1===t.classList.contains("Note")?t.classList.add("hide"):!0===t.classList.contains("Note")&&t.classList.remove("hide")})),this.projectDetail.forEach((t=>{t.addEventListener("click",(()=>{document.querySelectorAll(".note").forEach((e=>{e.classList.contains(t.textContent)?e.classList.remove("hide"):e.classList.add("hide")}))}))}))}_categorizeNote(t){this.homeSidebar.classList.contains("highlight")?t.classList.add("home"):this.todaySidebar.classList.contains("highlight")?t.classList.add("today"):this.weekSidebar.classList.contains("highlight")?t.classList.add("week"):this.noteSidebar.classList.contains("highlight")&&t.classList.add("stickynote");for(const e of this.projectDetail)e.classList.contains("highlight")&&t.classList.add(e.textContent)}_removeNote(t,e){e.addEventListener("click",(()=>{t.remove()}))}_showDetail(t,e,i,o,s,d){t.addEventListener("click",(()=>{this.detailTitle.textContent=e.textContent,this.detailProject.textContent=this._projectValue(d),this.detailPriority.textContent=s,this.detailDate.textContent=o.textContent,this.detailDetails.textContent=i,this.detailContainer.classList.remove("hide"),this.overlay.classList.remove("hide")}))}_projectValue(t){return t.classList.contains("today")?"today":t.classList.contains("week")?"week":noteSidebar.classList.contains("stickynote")?"note":void 0}_showEdit(t,e,i,o,s,d){t.addEventListener("click",(()=>{this.editContainer.classList.remove("hide"),this.overlay.classList.remove("hide"),this.editTitle.value=e.textContent,this.editDetail.value=i,this.editDate.value=this._resetDate(o.textContent),this._tickPriority(s),this.editButton.removeEventListener("click",this._editNote),this._editNote=t=>{""!==this.editTitle.value&&""!==this.editDetail.value&&""!==this.editDate.value&&!0===this._checkPriority(this.editCheckbox)&&(t.preventDefault(),e.textContent=this.editTitle.value,o.textContent=this._customDate(this.editDate.value),this._priorityColor(this._getPriority(this.editCheckbox),d),s=this._getPriority(this.editCheckbox),this._removeEdit())},this.editButton.addEventListener("click",this._editNote)}))}_removeEdit(){this.editContainer.classList.add("hide"),this.overlay.classList.add("hide"),this.editTitle.value="",this.editDetail.value="",this.editDate.value=""}_showForm(){this.createButton.addEventListener("click",(()=>{this.formContainer.classList.remove("hide"),this.overlay.classList.remove("hide")}))}_removeForm(){this.overlay.classList.add("hide"),this.formContainer.classList.add("hide")}_emptyForm(){this.todoTitle.value="",this.todoDetail.value="",this.todoDate.value="",this.todoCheckbox.forEach((t=>t.checked=!1))}_resetDate(t){const e=t.split("/");return`${e[2]}-${e[1]}-${e[0]}`}_customDate(t){const e=t.split("-");return`${e[2]}/${e[1]}/${e[0]}`}_getPriority(t){let e="";return t.forEach((t=>{!0===t.checked&&(e=t.value)})),e}_checkPriority(t){for(var e=0;e<t.length;e++)if(t[e].checked)return!0;return!1}_tickPriority(t){"High"===t?this.editHigh.checked=!0:"Medium"===t?this.editMedium.checked=!0:"Low"===t&&(this.editLow.checked=!0)}_priorityColor(t,e){e.classList.remove("green"),e.classList.remove("yellow"),e.classList.remove("red"),"Low"===t?e.classList.add("green"):"Medium"===t?e.classList.add("yellow"):"High"===t&&e.classList.add("red")}_storeValue(){this.todoButton.addEventListener("click",(t=>{if(""!==this.todoTitle.value&&""!==this.todoDetail.value&&""!==this.todoDate.value&&!0===this._checkPriority(this.todoCheckbox)&&(t.preventDefault(),!0!==this.homeSidebar.classList.contains("highlight"))){const t={title:this.todoTitle.value,detail:this.todoDetail.value,date:this._customDate(this.todoDate.value),priority:this._getPriority(this.todoCheckbox)};this.storeNote.push(t),this._addNote(t.title,t.detail,t.date,t.priority),this._removeForm(),this._emptyForm()}})),this.projectButton.addEventListener("click",(t=>{if(""!==this.projectTitle.value){t.preventDefault();const e={title:this.projectTitle.value};this.storeProject.push(e),this._addProject(e.title),this.projectTitle.value="",this._removeForm()}}))}_changeForm(){this.todoList.addEventListener("click",(()=>{this._hideForm(),this.todoForm.classList.remove("hide"),this.todoList.classList.add("highlight")})),this.projectList.addEventListener("click",(()=>{this._hideForm(),this.projectForm.classList.remove("hide"),this.projectList.classList.add("highlight")})),this.noteList.addEventListener("click",(()=>{this._hideForm(),this.noteForm.classList.remove("hide"),this.noteList.classList.add("highlight")}))}_hideForm(){this.todoForm.classList.add("hide"),this.todoList.classList.remove("highlight"),this.projectForm.classList.add("hide"),this.projectList.classList.remove("highlight"),this.noteForm.classList.add("hide"),this.noteList.classList.remove("highlight")}_removeOverlay(){this.overlay.addEventListener("click",(()=>{this.overlay.classList.add("hide"),this.detailContainer.classList.add("hide"),this._removeForm(),this._removeEdit()}))}}new class{constructor(){this.createNote=new t}}})();