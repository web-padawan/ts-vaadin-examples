import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { comboBoxRenderer, ComboBoxLitRenderer } from 'lit-vaadin-helpers';

type User = { firstName: string; lastName: string };

type UserRenderer = ComboBoxLitRenderer<User>;

class ComboBoxRendererDemo extends LitElement {
  @property({ type: Array }) users: User[] = [];

  private renderItem: UserRenderer = (user) => html`<i>${user.firstName} ${user.lastName}</i>`;

  render() {
    return html`
      <vaadin-combo-box
        label="User"
        .items="${this.users}"
        .renderer="${comboBoxRenderer(this.renderItem)}"
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
