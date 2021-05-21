import { LitElement, html } from 'lit';
import '@vaadin/vaadin-select/vaadin-select.js';
import '@vaadin/vaadin-list-box/vaadin-list-box.js';
import '@vaadin/vaadin-item/vaadin-item.js';
import { selectRenderer, SelectLitRenderer } from 'lit-vaadin-helpers';

class SelectRendererDemo extends LitElement {
  get statuses(): Array<{ label: string; value: string }> {
    return [
      { value: 'waiting', label: 'Waiting' },
      { value: 'error', label: 'Error' },
      { value: 'completed', label: 'Completed' }
    ];
  }

  private renderSelect: SelectLitRenderer = () => html`
    <vaadin-list-box>
      ${this.statuses.map(({ label, value }) => {
        return html`<vaadin-item value="${value}">${label}</vaadin-item>`;
      })}
    </vaadin-list-box>
  `;

  render() {
    return html`
      <vaadin-select
        label="Status"
        ${selectRenderer(this.renderSelect, this.statuses)}
      ></vaadin-select>
    `;
  }
}

customElements.define('select-renderer-demo', SelectRendererDemo);
