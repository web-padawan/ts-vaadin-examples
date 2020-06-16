import { LitElement, html } from 'lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-select/vaadin-select.js';
import '@vaadin/vaadin-list-box/vaadin-list-box.js';
import '@vaadin/vaadin-item/vaadin-item.js';

// TODO: make select renderer argument optional
import type { SelectElement } from '@vaadin/vaadin-select';

import { sharedStyles } from '../styles/shared-styles';

type Status = {
  label: string;
  value: string;
};

class SelectRendererDemo extends LitElement {
  private _boundSelectRenderer = this._selectRenderer.bind(this);

  static get styles() {
    return sharedStyles;
  }

  get statuses(): Status[] {
    return [
      { value: 'waiting', label: 'Waiting' },
      { value: 'error', label: 'Error' },
      { value: 'completed', label: 'Completed' }
    ];
  }

  render() {
    return html`<vaadin-select label="Status" .renderer=${this._boundSelectRenderer}></vaadin-select>`;
  }

  _selectRenderer(root: HTMLElement, _select: SelectElement) {
    // only render list-box element once
    let listBox = root.firstElementChild;
    if (!listBox) {
      render(html`<vaadin-list-box></vaadin-list-box>`, root);
      listBox = root.firstElementChild;
    }
    render(
      html`
        ${this.statuses.map((status) => {
          return html`<vaadin-item name="${status.value}">${status.label}</vaadin-item>`;
        })}
      `,
      listBox!
    );
  }
}

customElements.define('select-renderer-demo', SelectRendererDemo);
