const template = document.createElement('template');
template.inerHTML = `
    <style>
        @import url('../theme/theme.css');

        button {
            background-color: var(--color-primary);
            color: var(--text-color);
            padding: 8px 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
        }
        
        button:hover {
            opacity: 0.85;
        }
    </style>
    <button>
        <slot></slot>
    </button>
`;

class CactusButton extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));
    }
}

customElements.define("cactus-button", CactusButton);