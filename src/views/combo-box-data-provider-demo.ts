import { LitElement, html, query } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { ComboBoxElement } from '@vaadin/vaadin-combo-box';
import { sharedStyles } from '../styles/shared-styles';

class ComboBoxDataProviderDemo extends LitElement {
  @query('vaadin-combo-box')
  private comboBox!: ComboBoxElement;

  static get styles() {
    return sharedStyles;
  }

  render() {
    return html`
      <vaadin-combo-box label="Country"></vaadin-combo-box>
    `;
  }

  firstUpdated() {
    // Configure data provider
    this.comboBox.dataProvider = (params, callback) => {
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
  }
}

customElements.define('combo-box-data-provider-demo', ComboBoxDataProviderDemo);
