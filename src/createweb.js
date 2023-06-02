import { nav } from "./nav.js";
import { home } from "./home.js";
import { menu } from "./menu.js";
import { contact } from "./contact.js";
import { click } from "./click.js";

export class createWeb {
  container = document.querySelector(".container");
  constructor() {
    this.navBar = new nav();
    this.home = new home();
    this.menu = new menu();
    this.contact = new contact();
    this.click = new click();
  }
}
