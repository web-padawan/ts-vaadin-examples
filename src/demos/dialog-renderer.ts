import { LitElement, html } from 'lit-element';
import { property } from 'lit-element/lib/decorators/property.js';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '@vaadin/vaadin-dialog/vaadin-dialog.js';

import type { DatePickerElement } from '@vaadin/vaadin-date-picker';

import { renderer } from '../renderers/renderer';

class DialogRendererDemo extends LitElement {
  @property({ type: Boolean }) opened = false;

  @property({ type: String }) selectedDate = '';

  render() {
    const content = () => html`
      <vaadin-date-picker label="Select date" @change="${this._onDateChange}"></vaadin-date-picker>
    `;

    return html`
      <p>Selected date: ${this.selectedDate}</p>
      <vaadin-button @click=${this._toggle} theme="primary">Toggle</vaadin-button>
      <vaadin-dialog
        .opened=${this.opened}
        .renderer=${renderer(content)}
        modeless
        @opened-changed="${this._onOpenedChanged}"
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
