import { LitElement, html } from 'lit-element';
import { property } from 'lit-element/lib/decorators/property.js';
import '@vaadin/vaadin-context-menu/vaadin-context-menu.js';
import '@vaadin/vaadin-list-box/vaadin-list-box.js';
import '@vaadin/vaadin-item/vaadin-item.js';

import { renderer } from '../renderers/renderer';

class ContextMenuRendererDemo extends LitElement {
  @property({ type: Array }) actions = ['Edit', 'Delete'];

  @property({ type: String }) selectedAction = '';

  render() {
    const menu = () => html`
      <vaadin-list-box>
        ${this.actions.map(
          (name) => html`<vaadin-item value="${name}" @click="${this._onItemClick}">
            ${name}
          </vaadin-item>`
        )}
      </vaadin-list-box>
    `;

    return html`
      <vaadin-context-menu .renderer="${renderer(menu, this.actions)}">
        <p>This paragraph has the context menu created using renderer function.</p>
      </vaadin-context-menu>
      <p>Selected action: ${this.selectedAction}</p>
    `;
  }

  _onItemClick(e: Event) {
    this.selectedAction = (e.target as Element).textContent!;
  }
}

customElements.define('context-menu-renderer-demo', ContextMenuRendererDemo);
