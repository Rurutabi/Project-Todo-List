export class home {
  container = document.querySelector(".container");
  constructor() {
    // constructor code
    this.createElement();
  }

  createElement() {
    //home

    const homeContainer = document.createElement("div");
    homeContainer.classList.add("home-container");
    this.container.appendChild(homeContainer);

    const homeBox = document.createElement("div");
    homeBox.classList.add("homebox");
    homeContainer.appendChild(homeBox);

    const par1 = document.createElement("h1");
    par1.classList.add("body-heading");
    par1.textContent = "Welcome";
    homeBox.appendChild(par1);

    const par2 = document.createElement("p");
    par2.classList.add("par");
    par2.textContent = "Thai food is good, Thai food is great";
    homeBox.appendChild(par2);

    const img = document.createElement("img");
    img.classList.add("img");
    img.src = "./images/padthai.jpg";
    img.alt = "Image of Padthai";
    homeBox.appendChild(img);

    const par3 = document.createElement("p");
    par3.classList.add("par");
    par3.textContent = "Order online or visit us";
    homeBox.appendChild(par3);
  }
}
