import { LitElement, property, html } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid.js';

import type { GridRowData } from '@vaadin/vaadin-grid/@types/interfaces';
import type { GridColumnElement } from '@vaadin/vaadin-grid/vaadin-grid-column.js';

import { sharedStyles } from '../styles/shared-styles';

class GridCellClassNameGeneratorDemo extends LitElement {
  @property({ type: Array }) users = [];

  static get styles() {
    return sharedStyles;
  }

  render() {
    return html`
      <div class="card">
        <vaadin-grid .items="${this.users}" .cellClassNameGenerator="${this.cellClassGenerator}">
          <vaadin-grid-column path="firstName" header="First name"></vaadin-grid-column>
          <vaadin-grid-column path="lastName" header="Last name"></vaadin-grid-column>
          <vaadin-grid-column path="address.phone" header="Phone"></vaadin-grid-column>
          <vaadin-grid-column path="email" header="Email"></vaadin-grid-column>
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

  cellClassGenerator(column: GridColumnElement, rowData: GridRowData) {
    const isDark = column.path === 'lastName' || column.path === 'email';
    if (rowData.index % 2 === 0) {
      return isDark ? 'dark' : 'light';
    } else {
      return isDark ? 'light' : 'dark';
    }
  }
}

customElements.define('grid-cell-class-name-generator-demo', GridCellClassNameGeneratorDemo);
