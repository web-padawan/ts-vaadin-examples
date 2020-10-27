import { LitElement, html } from 'lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-select/vaadin-select.js';
import '@vaadin/vaadin-list-box/vaadin-list-box.js';
import '@vaadin/vaadin-item/vaadin-item.js';

class SelectRendererDemo extends LitElement {
  private _boundSelectRenderer = this._selectRenderer.bind(this);

  get statuses(): Array<{ label: string; value: string }> {
    return [
      { value: 'waiting', label: 'Waiting' },
      { value: 'error', label: 'Error' },
      { value: 'completed', label: 'Completed' }
    ];
  }

  render() {
    return html`
      <vaadin-select label="Status" .renderer=${this._boundSelectRenderer}></vaadin-select>
    `;
  }

  _selectRenderer(root: HTMLElement) {
    // only render list-box element once
    let listBox = root.firstElementChild;
    if (!listBox) {
      render(html`<vaadin-list-box></vaadin-list-box>`, root);
      listBox = root.firstElementChild;
    }
    render(
      html`
        ${this.statuses.map(({ label, value }) => {
          return html`<vaadin-item value="${value}">${label}</vaadin-item>`;
        })}
      `,
      listBox as HTMLElement
    );
  }
}

customElements.define('select-renderer-demo', SelectRendererDemo);
