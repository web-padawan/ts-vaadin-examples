import { LitElement, property, html, css } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { ComboBoxRenderer, ComboBoxDataProvider } from '@vaadin/vaadin-combo-box/@types/interfaces';
import { sharedStyles } from '../styles/shared-styles';

class ComboBoxDemo extends LitElement {
  @property({ type: Object }) dataProvider!: ComboBoxDataProvider;

  private itemRenderer!: ComboBoxRenderer;

  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          display: block;
        }
      `
    ]
  }

  render() {
    return html`
      <div class="card">
        <vaadin-combo-box
          label="Country"
          .dataProvider="${this.dataProvider}"
          .renderer="${this.itemRenderer}"
        ></vaadin-combo-box>
      </div>
    `;
  }

  firstUpdated() {
    // Configure data provider
    this.dataProvider = (params, callback) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const response = JSON.parse(xhr.responseText);

        setTimeout(() => {
          callback(response.result, response.size);
        }, 500);
      };

      const index = params.page * params.pageSize;
      const url = 'https://demo.vaadin.com/demo-data/1.0/filtered-countries?index=' + index +
        '&count=' + params.pageSize +
        '&filter=' + params.filter;

      xhr.open('GET', url, true);
      xhr.send();
    };

    // Configure item renderer
    this.itemRenderer = (root, _comboBox, model) => {
      root.innerHTML = `<i>${model.item}</i>`;
    }
  }
}

customElements.define('combo-box-demo', ComboBoxDemo);
