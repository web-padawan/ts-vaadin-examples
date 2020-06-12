import { LitElement, property, html, css } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column.js';
import { sharedStyles } from '../styles/shared-styles';

class GridDemo extends LitElement {
  @property({ type: Array }) users = [];

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
        <vaadin-grid .items="${this.users}">
          <vaadin-grid-sort-column path="firstName" header="First name"></vaadin-grid-sort-column>
          <vaadin-grid-sort-column path="lastName" header="Last name"></vaadin-grid-sort-column>
        </vaadin-grid>
      </div>
    `;
  }

  firstUpdated() {
    fetch('https://demo.vaadin.com/demo-data/1.0/people?count=200')
      .then(r => r.json())
      .then(data => {
        this.users = data.result;
      });
  }
}

customElements.define('grid-demo', GridDemo);
