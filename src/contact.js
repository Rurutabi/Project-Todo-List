export class contact {
  container = document.querySelector(".container");
  constructor() {
    // constructor code
    this.createElement();
  }

  createElement() {
    //home
    const contactContainer = document.createElement("div");
    contactContainer.classList.add("contact-container");
    contactContainer.classList.add("hide");
    this.container.appendChild(contactContainer);

    const contactBox = document.createElement("div");
    contactBox.classList.add("contactbox");
    contactContainer.appendChild(contactBox);

    const contactHeading = document.createElement("h1");
    contactBox.appendChild(contactHeading);
    contactHeading.textContent = "Our Contact";

    const img = document.createElement("img");
    img.classList.add("img");
    img.src = "./images/map.jpg";
    img.alt = "Image of Padthai";
    contactBox.appendChild(img);

    const par1 = document.createElement("p");
    par1.classList.add("par");
    par1.textContent = "Our location : Somewhere";
    contactBox.appendChild(par1);

    const par2 = document.createElement("p");
    par2.classList.add("par");
    par2.textContent = "Contact us on : XXX XXXX XXX";
    contactBox.appendChild(par2);
  }
}
