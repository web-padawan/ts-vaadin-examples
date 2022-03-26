import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/date-picker';
import '@vaadin/dialog';
import type { DatePicker } from '@vaadin/date-picker';
import type { DialogOpenedChangedEvent } from '@vaadin/dialog';
import { dialogRenderer, DialogLitRenderer } from 'lit-vaadin-helpers';

class DialogRendererDemo extends LitElement {
  @property({ type: Boolean }) opened = false;

  @property({ type: String }) selectedDate = '';

  private renderDialog: DialogLitRenderer = () => html`
    <vaadin-date-picker label="Select date" @change=${this._onDateChange}></vaadin-date-picker>
  `;

  render() {
    return html`
      <p>Selected date: ${this.selectedDate}</p>
      <vaadin-button @click=${this._toggle} theme="primary">Toggle</vaadin-button>
      <vaadin-dialog
        .opened=${this.opened}
        modeless
        @opened-changed=${this._onOpenedChanged}
        ${dialogRenderer(this.renderDialog)}
      ></vaadin-dialog>
    `;
  }

  _onDateChange(e: Event) {
    const target = e.target as DatePicker;
    this.selectedDate = target.value;
  }

  _onOpenedChanged(e: DialogOpenedChangedEvent) {
    this.opened = e.detail.value;
  }

  _toggle() {
    this.opened = !this.opened;
  }
}

customElements.define('dialog-renderer-demo', DialogRendererDemo);
