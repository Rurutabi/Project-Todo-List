export class click {
  home = document.querySelector(".home");
  menu = document.querySelector(".menu");
  contact = document.querySelector(".contact");
  homeContainer = document.querySelector(".home-container");
  menuContainer = document.querySelector(".menu-container");
  contactContainer = document.querySelector(".contact-container");
  constructor() {
    this.togglePage();
  }

  togglePage() {
    this.home.addEventListener("click", () => {
      this.homeContainer.classList.remove("hide");
      this.menuContainer.classList.add("hide");
      this.contactContainer.classList.add("hide");
    });

    this.menu.addEventListener("click", () => {
      this.menuContainer.classList.remove("hide");
      this.homeContainer.classList.add("hide");
      this.contactContainer.classList.add("hide");
    });

    this.contact.addEventListener("click", () => {
      this.contactContainer.classList.remove("hide");
      this.menuContainer.classList.add("hide");
      this.homeContainer.classList.add("hide");
    });
  }
}
