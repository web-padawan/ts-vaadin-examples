import { LitElement, html } from 'lit-element';
import { property } from 'lit-element/lib/decorators/property.js';
import '@vaadin/vaadin-context-menu/vaadin-context-menu.js';
import '@vaadin/vaadin-list-box/vaadin-list-box.js';
import '@vaadin/vaadin-item/vaadin-item.js';
import type { ItemElement } from '@vaadin/vaadin-item';

import { contextMenuRenderer } from '../renderers/context-menu-renderer';

class ContextMenuRendererDemo extends LitElement {
  @property({ type: Array }) actions = ['Edit', 'Delete'];

  @property({ type: String }) selectedAction = '';

  render() {
    const renderMenu = (target: HTMLElement) => html`
      <vaadin-list-box>
        ${this.actions.map(
          (name) => html`
            <vaadin-item value="${name} ${target.id}" @click="${this._onItemClick}">
              ${name} ${target.id}
            </vaadin-item>
          `
        )}
      </vaadin-list-box>
    `;

    return html`
      <vaadin-context-menu .renderer="${contextMenuRenderer(renderMenu, this.actions)}">
        <div id="1">First paragraph with the context-menu.</div>
        <div id="2">Second paragraph which uses the same context menu.</div>
      </vaadin-context-menu>
      <p>Selected action: ${this.selectedAction}</p>
    `;
  }

  _onItemClick(e: Event) {
    this.selectedAction = (e.target as ItemElement).value;
  }
}

customElements.define('context-menu-renderer-demo', ContextMenuRendererDemo);
