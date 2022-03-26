import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '@vaadin/context-menu';
import '@vaadin/item';
import '@vaadin/list-box';
import type { Item } from '@vaadin/item';
import { contextMenuRenderer, ContextMenuLitRenderer } from 'lit-vaadin-helpers';

class ContextMenuRendererDemo extends LitElement {
  @property({ type: Array }) actions = ['Edit', 'Delete'];

  @property({ type: String }) selectedAction = '';

  private renderMenu: ContextMenuLitRenderer = ({ target }) => html`
    <vaadin-list-box>
      ${this.actions.map(
        (name) => html`
          <vaadin-item .value="${name} ${target.id}" @click=${this._onItemClick}>
            ${name} ${target.id}
          </vaadin-item>
        `
      )}
    </vaadin-list-box>
  `;

  render() {
    return html`
      <vaadin-context-menu ${contextMenuRenderer(this.renderMenu, this.actions)}>
        <div id="1">First paragraph with the context-menu.</div>
        <div id="2">Second paragraph which uses the same context menu.</div>
      </vaadin-context-menu>
      <p>Selected action: ${this.selectedAction}</p>
    `;
  }

  _onItemClick(e: Event) {
    this.selectedAction = (e.target as Item).value;
  }
}

customElements.define('context-menu-renderer-demo', ContextMenuRendererDemo);
