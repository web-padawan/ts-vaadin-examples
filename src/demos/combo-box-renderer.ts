import { LitElement, html, property } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';

import type { ComboBoxElement } from '@vaadin/vaadin-combo-box';
import type { ComboBoxItemModel } from '@vaadin/vaadin-combo-box/@types/interfaces';

type User = { firstName: string; lastName: string };

class ComboBoxRendererDemo extends LitElement {
  @property({ type: Array }) users: User[] = [];

  private _boundItemRenderer = this._itemRenderer.bind(this);

  render() {
    return html`
      <vaadin-combo-box
        label="User"
        .items="${this.users}"
        .renderer="${this._boundItemRenderer}"
        item-value-path="lastName"
        item-label-path="lastName"
      ></vaadin-combo-box>
    `;
  }

  get endpoint() {
    return 'https://demo.vaadin.com/demo-data/1.0';
  }

  firstUpdated() {
    fetch(`${this.endpoint}/people?count=50`)
      .then((r) => r.json())
      .then((data) => {
        this.users = data.result;
      });
  }

  _itemRenderer(root: HTMLElement, _comboBox: ComboBoxElement, model: ComboBoxItemModel) {
    const user = model.item as User;
    root.innerHTML = `<i>${user.firstName} ${user.lastName}</i>`;
  }
}

customElements.define('combo-box-renderer-demo', ComboBoxRendererDemo);
