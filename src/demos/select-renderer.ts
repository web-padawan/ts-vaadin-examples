import { LitElement, html } from 'lit';
import '@vaadin/item';
import '@vaadin/list-box';
import '@vaadin/select';
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
        return html`<vaadin-item value=${value}>${label}</vaadin-item>`;
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
