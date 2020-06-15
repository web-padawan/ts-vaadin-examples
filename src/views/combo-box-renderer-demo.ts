import { LitElement, html, property } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { ComboBoxElement } from '@vaadin/vaadin-combo-box';
import { sharedStyles } from '../styles/shared-styles';
import { ComboBoxRendererModel } from '@vaadin/vaadin-combo-box/@types/interfaces';

type User = {
  firstName: string;
  lastName: string;
}

class ComboBoxRendererDemo extends LitElement {
  @property({ type: Array }) users = [];

  static get styles() {
    return sharedStyles;
  }

  render() {
    return html`
      <div class="card">
        <vaadin-combo-box
          label="User"
          .items="${this.users}"
          .renderer="${this.itemRenderer}"
          item-value-path="lastName"
          item-label-path="lastName"
        ></vaadin-combo-box>
      </div>
    `;
  }

  firstUpdated() {
    fetch('https://demo.vaadin.com/demo-data/1.0/people?count=50')
      .then(r => r.json())
      .then(data => {
        this.users = data.result;
      });
  }

  itemRenderer(root: HTMLElement, _comboBox: ComboBoxElement, model: ComboBoxRendererModel) {
    const user = model.item as User;
    root.innerHTML = `<i>${user.firstName} ${user.lastName}</i>`;
  }
}

customElements.define('combo-box-renderer-demo', ComboBoxRendererDemo);
