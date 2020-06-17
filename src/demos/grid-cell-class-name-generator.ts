import { LitElement, property, html } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid.js';

import type { GridRowData } from '@vaadin/vaadin-grid/@types/interfaces';
import type { GridColumnElement } from '@vaadin/vaadin-grid/vaadin-grid-column.js';

class GridCellClassNameGeneratorDemo extends LitElement {
  @property({ type: Array }) users = [];

  render() {
    return html`
      <vaadin-grid .items="${this.users}" .cellClassNameGenerator="${this.cellClassGenerator}">
        <vaadin-grid-column path="firstName" header="First name"></vaadin-grid-column>
        <vaadin-grid-column path="lastName" header="Last name"></vaadin-grid-column>
        <vaadin-grid-column path="address.phone" header="Phone"></vaadin-grid-column>
        <vaadin-grid-column path="email" header="Email"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  get endpoint() {
    return 'https://demo.vaadin.com/demo-data/1.0';
  }

  firstUpdated() {
    fetch(`${this.endpoint}/people?count=200`)
      .then((r) => r.json())
      .then((data) => {
        this.users = data.result;
      });
  }

  cellClassGenerator(column: GridColumnElement, rowData: GridRowData) {
    const isDark = column.path === 'lastName' || column.path === 'email';
    const classes = ['light', 'dark'];
    return rowData.index % 2 === 0 ? classes[Number(isDark)] : classes[Number(!isDark)];
  }
}

customElements.define('grid-cell-class-name-generator-demo', GridCellClassNameGeneratorDemo);
