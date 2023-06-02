export class menu {
  container = document.querySelector(".container");
  gridNumber = 8;
  constructor() {
    // constructor code
    this.createMenu();
  }

  createMenu() {
    //home
    const menuContainer = document.createElement("div");
    menuContainer.classList.add("menu-container");
    menuContainer.classList.add("hide");

    this.container.appendChild(menuContainer);

    const menuBox = document.createElement("div");
    menuBox.classList.add("menubox");

    menuContainer.appendChild(menuBox);

    const menuHeading = document.createElement("h1");
    menuHeading.textContent = "Menu List";
    menuBox.appendChild(menuHeading);

    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");
    menuBox.appendChild(gridContainer);

    //Create mutiple grid at once
    for (let i = 0; i < this.gridNumber; i++) {
      const grid = document.createElement("div");
      grid.textContent = `Menu ${i + 1}`;
      grid.classList.add("grid");
      grid.classList.add(`gridnumber${i}`);
      gridContainer.appendChild(grid);
    }
  }
}
