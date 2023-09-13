export class FancyDiv extends HTMLElement {
    constructor() {
        super();
        this.debug = true;
    }

    static get observedAttributes() {
        return ['debug'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.debug && oldValue !== newValue) console.log(`"${name}" has changed from "${oldValue}" to "${newValue}"`);
        if (oldValue === newValue) return;
    }

    connectedCallback() {
        this.debug && console.log(`${this.constructor.name} has been added to DOM`);
    }

    disconnectedCallback() {
        this.debug && console.log(`${this.name} has been removed from DOM`);
    }

    adoptedCallback() {
        this.debug && console.log("Hey, someone adopted me!");
    }
}

