import { LitElement, html, query } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { ComboBoxElement } from '@vaadin/vaadin-combo-box';

class ComboBoxDataProviderDemo extends LitElement {
  @query('vaadin-combo-box')
  private comboBox!: ComboBoxElement;

  render() {
    return html`<vaadin-combo-box label="Country"></vaadin-combo-box>`;
  }

  get endpoint() {
    return 'https://demo.vaadin.com/demo-data/1.0';
  }

  firstUpdated() {
    // Configure data provider
    this.comboBox.dataProvider = (params, callback) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const response = JSON.parse(xhr.responseText);

        // Emulate network latency for demo purpose
        setTimeout(() => {
          callback(response.result, response.size);
        }, 500);
      };

      const index = params.page * params.pageSize;
      xhr.open(
        'GET',
        `${this.endpoint}/filtered-countries?index=${index}&count=${params.pageSize}&filter=${params.filter}`,
        true
      );
      xhr.send();
    };
  }
}

customElements.define('combo-box-data-provider-demo', ComboBoxDataProviderDemo);
