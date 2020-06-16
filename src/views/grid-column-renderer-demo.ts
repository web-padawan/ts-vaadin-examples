import { LitElement, property, html } from 'lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter.js';
import '@vaadin/vaadin-grid/vaadin-grid-sorter.js';

import type { GridRowData } from '@vaadin/vaadin-grid/@types/interfaces';
import type { GridColumnElement } from '@vaadin/vaadin-grid/vaadin-grid-column.js';
import type { GridFilterElement } from '@vaadin/vaadin-grid/vaadin-grid-filter.js';

import { sharedStyles } from '../styles/shared-styles';
import { API } from './shared/constants';

type Address = {
  street: string;
  city: string;
};

type User = {
  address: Address;
};

class GridColumnRendererDemo extends LitElement {
  @property({ type: Array }) users = [];

  static get styles() {
    return sharedStyles;
  }

  private _boundIndexRenderer = this._indexRenderer.bind(this);

  private _boundAddressRenderer = this._addressRenderer.bind(this);

  private _boundEmailHeaderRenderer = this._emailHeaderRenderer.bind(this);

  render() {
    return html`
      <vaadin-grid .items="${this.users}">
        <vaadin-grid-column
          width="50px"
          flex-grow="0"
          header="#"
          .renderer="${this._boundIndexRenderer}"
        ></vaadin-grid-column>
        <vaadin-grid-column path="firstName" header="First name"></vaadin-grid-column>
        <vaadin-grid-column path="lastName" header="Last name"></vaadin-grid-column>
        <vaadin-grid-column
          width="150px"
          header="Address"
          .renderer="${this._boundAddressRenderer}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          width="150px"
          path="email"
          .headerRenderer="${this._boundEmailHeaderRenderer}"
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  firstUpdated() {
    fetch(`${API}/people?count=200`)
      .then((r) => r.json())
      .then((data) => {
        this.users = data.result;
      });
  }

  _onFilterChange(e: CustomEvent) {
    const target = e.target as HTMLElement;
    (target.parentNode as GridFilterElement).value = e.detail.value;
  }

  _indexRenderer(root: HTMLElement, _column: GridColumnElement, rowData: GridRowData) {
    render(html`<div>${rowData.index}</div>`, root);
  }

  _addressRenderer(root: HTMLElement, _column: GridColumnElement, rowData: GridRowData) {
    const user = rowData.item as User;
    render(html`<span class="address">${user.address.street}, ${user.address.city}</span>`, root);
  }

  _emailHeaderRenderer(root: HTMLElement) {
    render(
      html`
        <vaadin-grid-sorter path="email">Email</vaadin-grid-sorter>
        <vaadin-grid-filter path="email">
          <vaadin-text-field
            slot="filter"
            focus-target
            theme="small"
            @value-changed="${this._onFilterChange}"
          ></vaadin-text-field>
        </vaadin-grid-filter>
      `,
      root,
      { eventContext: this } // bind event listener properly
    );
  }
}

customElements.define('grid-column-renderer-demo', GridColumnRendererDemo);
