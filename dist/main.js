(()=>{"use strict";class e{noteContainer=document.querySelector(".note-container");createButton=document.querySelector(".create-button");constructor(){this.createNew()}createNote(){const e=document.createElement("div");e.className="note",this.noteContainer.appendChild(e);const t=document.createElement("div");t.className="note-left",e.appendChild(t);const n=document.createElement("input");n.type="checkbox",n.id="note1",n.name="note1",n.value="note1",t.appendChild(n);const a=document.createElement("label");a.for="note",a.textContent="Example from Javascript",t.appendChild(a);const c=document.createElement("div");c.className="note-right",e.appendChild(c);const o=document.createElement("button");o.className="edit-button",o.textContent="Edit",c.appendChild(o);const d=document.createElement("p");d.textContent="Random date",c.appendChild(d);const s=document.createElement("i");s.className="fa-solid fa-pen-to-square",c.appendChild(s);const l=document.createElement("i");l.className="fa-solid fa-trash-can",c.appendChild(l)}createNew(){this.createButton.addEventListener("click",(()=>{this.createNote()}))}}new class{constructor(){this.createNote=new e}}})();