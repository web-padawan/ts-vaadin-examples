import { LitElement, html } from 'lit-element';
import { property } from 'lit-element/lib/decorators/property.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';

import { comboBoxRenderer, ComboBoxRenderer } from '../renderers/combo-box-renderer';

type User = { firstName: string; lastName: string };

type UserRenderer = ComboBoxRenderer<User>;

class ComboBoxRendererDemo extends LitElement {
  @property({ type: Array }) users: User[] = [];

  render() {
    const renderItem: UserRenderer = (user) => html`<i>${user.firstName} ${user.lastName}</i>`;

    return html`
      <vaadin-combo-box
        label="User"
        .items="${this.users}"
        .renderer="${comboBoxRenderer(renderItem)}"
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
}

customElements.define('combo-box-renderer-demo', ComboBoxRendererDemo);
