import { LitElement, html, property } from 'lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-context-menu/vaadin-context-menu.js';

// TODO: make context-menu renderer arguments optional
import type { ContextMenuRenderer } from '@vaadin/vaadin-context-menu/@types/interfaces';

import { sharedStyles } from '../styles/shared-styles';

class ContextMenuRendererDemo extends LitElement {
  @property({ type: String }) selectedAction = '';

  private _boundContextMenuRenderer = this._contextMenuRenderer.bind(this) as ContextMenuRenderer;

  static get styles() {
    return sharedStyles;
  }

  render() {
    return html`
      <vaadin-context-menu .renderer="${this._boundContextMenuRenderer}">
        <p>This paragraph has the context menu provided in the renderer function.</p>
      </vaadin-context-menu>
      <p>Selected date: ${this.selectedAction}</p>
    `;
  }

  get actions() {
    return ['Edit', 'Delete'];
  }

  _contextMenuRenderer(root: HTMLElement) {
    let listBox = root.firstElementChild;
    if (!listBox) {
      render(html`<vaadin-list-box></vaadin-list-box>`, root);
      listBox = root.firstElementChild;
    }
    render(
      html`
        ${this.actions.map((action) => {
          return html`<vaadin-item @click="${this._onItemClick}">${action}</vaadin-item>`;
        })}
      `,
      listBox!,
      { eventContext: this } // bind event listener properly
    );
  }

  _onItemClick(e: Event) {
    this.selectedAction = (e.target as Element).textContent!;
  }
}

customElements.define('context-menu-renderer-demo', ContextMenuRendererDemo);
