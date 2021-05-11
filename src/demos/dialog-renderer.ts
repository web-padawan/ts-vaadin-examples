import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '@vaadin/vaadin-dialog/vaadin-dialog.js';
import type { DatePickerElement } from '@vaadin/vaadin-date-picker';
import { dialogRenderer, DialogLitRenderer } from 'lit-vaadin-helpers';

class DialogRendererDemo extends LitElement {
  @property({ type: Boolean }) opened = false;

  @property({ type: String }) selectedDate = '';

  private renderDialog: DialogLitRenderer = () => html`
    <vaadin-date-picker label="Select date" @change="${this._onDateChange}"></vaadin-date-picker>
  `;

  render() {
    return html`
      <p>Selected date: ${this.selectedDate}</p>
      <vaadin-button @click=${this._toggle} theme="primary">Toggle</vaadin-button>
      <vaadin-dialog
        .opened=${this.opened}
        modeless
        @opened-changed="${this._onOpenedChanged}"
        ${dialogRenderer(this.renderDialog)}
      ></vaadin-dialog>
    `;
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
