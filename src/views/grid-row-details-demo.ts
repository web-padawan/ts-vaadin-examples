import { LitElement, property, query, html } from 'lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-checkbox/vaadin-checkbox.js';

import type { CheckboxElement } from '@vaadin/vaadin-checkbox';
import type { GridElement } from '@vaadin/vaadin-grid';
import type { GridItem, GridRowData } from '@vaadin/vaadin-grid/@types/interfaces';
import type { GridColumnElement } from '@vaadin/vaadin-grid/vaadin-grid-column.js';

import { sharedStyles } from '../styles/shared-styles';

const itemCache = new WeakMap();

type User = {
  firstName: string;
  lastName: string;
}

class GridRowDetailsDemo extends LitElement {
  @property({ type: Array }) users = [];

  @query('vaadin-grid')
  private grid!:  GridElement;

  private _boundToggleDetailsRenderer = this.toggleDetailsRenderer.bind(this);;

  static get styles() {
    return sharedStyles;
  }

  render() {
    return html`
      <div class="card">
        <vaadin-grid .items="${this.users}" .rowDetailsRenderer="${this.rowDetailsRenderer}">
          <vaadin-grid-column path="firstName" header="First name"></vaadin-grid-column>
          <vaadin-grid-column path="lastName" header="Last name"></vaadin-grid-column>
          <vaadin-grid-column .renderer="${this._boundToggleDetailsRenderer}"></vaadin-grid-column>
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

  _toggleDetails(value: boolean, item: GridItem) {
    if (value) {
      this.grid.openItemDetails(item);
    } else {
      this.grid.closeItemDetails(item);
    }
  }

  toggleDetailsRenderer(root: HTMLElement, _column: GridColumnElement, rowData: GridRowData) {
    // only render the checkbox once, to avoid re-creating during subsequent calls
    if (!root.firstElementChild) {
      render(
        html`
          <vaadin-checkbox
            @checked-changed="${(e: CustomEvent) => this._toggleDetails(e.detail.value, itemCache.get(root))}"
          >
            Show Details
          </vaadin-checkbox>
        `,
        root
      );
    }
    // store the item to avoid grid virtual scrolling reusing DOM nodes to mess it up
    itemCache.set(root, rowData.item);
    const detailsOpened = this.grid.detailsOpenedItems || [];
    (root.firstElementChild as CheckboxElement).checked = detailsOpened.indexOf(rowData.item) > -1;
  }

  rowDetailsRenderer(root: HTMLElement, _column: GridColumnElement, rowData: GridRowData) {
    const user = rowData.item as User;
    render(
      html`
        Hi! My name is ${user.firstName}!
      `,
      root
    );
  }
}

customElements.define('grid-row-details-demo', GridRowDetailsDemo);
