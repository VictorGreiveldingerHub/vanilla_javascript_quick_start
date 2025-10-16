// Import components

// Import partials

// Import WebGL

export default class App {
  constructor() {
    // Local
    this.sections = {};
    this.partials = {};
    this.canvas = {};
    this.webGL = {};

    // Méthodes
    this.initSections();
    this.initPartials();
    this.initCanvas();
    this.initWEGL();

    console.log("Hello depuis app");
  }

  initSections() {
    this.sections = {};
  }

  initPartials() {
    this.partials = {};
  }

  initCanvas() {
    this.canvas = {};
  }

  initWEGL() {
    this.webGL = {};
  }

  animateElementsIn() {}
}

new App();
