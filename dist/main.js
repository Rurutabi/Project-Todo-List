(()=>{"use strict";class e{noteContainer=document.querySelector(".note-container");createButton=document.querySelector(".create-button");constructor(){this.createNew()}createNote(){const e=document.createElement("div");this.noteContainer.appendChild(e);const t=document.createElement("p");t.textContent="hi",e.appendChild(t)}createNew(){this.createButton.addEventListener("click",(()=>{this.createNote()}))}}new class{constructor(){this.createNote=new e}}})();