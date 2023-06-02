export class nav {
  constructor() {
    // constructor code
    this.createElement();
  }

  createElement() {
    //navContainer

    const newnavContainer = document.createElement("div");
    newnavContainer.classList.add("container");
    document.body.appendChild(newnavContainer);

    const navContainer = document.createElement("div");
    navContainer.classList.add("navContainer");
    newnavContainer.appendChild(navContainer);

    const heading = document.createElement("heading");
    heading.classList.add("heading");

    navContainer.appendChild(heading);
    heading.textContent = "Thai food BLA BLA";

    const listContainer = document.createElement("div");
    listContainer.classList.add("listContainer");

    navContainer.appendChild(listContainer);

    const list1 = document.createElement("li");
    list1.textContent = "Home";
    list1.classList.add("home");
    const list2 = document.createElement("li");
    list2.textContent = "Menu";
    list2.classList.add("menu");
    const list3 = document.createElement("li");
    list3.textContent = "Contact";
    list3.classList.add("contact");

    listContainer.appendChild(list1);
    listContainer.appendChild(list2);
    listContainer.appendChild(list3);
  }
}
