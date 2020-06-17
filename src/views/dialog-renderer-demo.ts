import { LitElement, html, property } from 'lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '@vaadin/vaadin-dialog/vaadin-dialog.js';

import type { DatePickerElement } from '@vaadin/vaadin-date-picker';

class DialogRendererDemo extends LitElement {
  @property({ type: Boolean }) opened = false;

  @property({ type: String }) selectedDate = '';

  private _boundDialogRenderer = this._dialogRenderer.bind(this);

  render() {
    return html`
      <p>Selected date: ${this.selectedDate}</p>
      <button @click=${this._toggle}>Toggle</button>
      <vaadin-dialog
        .opened=${this.opened}
        .renderer=${this._boundDialogRenderer}
        modeless
        @opened-changed="${this._onOpenedChanged}"
      ></vaadin-dialog>
    `;
  }

  // TODO: make dialog renderer argument optional
  _dialogRenderer(root: HTMLElement, _dialog: HTMLElement) {
    render(
      html`<vaadin-date-picker @change="${this._onDateChange}"></vaadin-date-picker>`,
      root,
      { eventContext: this } // bind event listener properly
    );
  }

  _onDateChange(e: Event) {
    const target = e.target as DatePickerElement;
    this.selectedDate = target.value;
  }

  _onOpenedChanged(e: CustomEvent) {
    // upward property binding
    this.opened = e.detail.value;
  }

  _toggle() {
    this.opened = !this.opened;
  }
}

customElements.define('dialog-renderer-demo', DialogRendererDemo);
