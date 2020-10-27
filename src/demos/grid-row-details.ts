import { LitElement, html } from 'lit-element';
import { property } from 'lit-element/lib/decorators/property.js';
import { query } from 'lit-element/lib/decorators/query.js';
import { render } from 'lit-html';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-checkbox/vaadin-checkbox.js';

import type { CheckboxElement } from '@vaadin/vaadin-checkbox';
import type { GridElement, GridItem, GridItemModel } from '@vaadin/vaadin-grid';
import type { GridColumnElement } from '@vaadin/vaadin-grid/vaadin-grid-column.js';

const itemCache = new WeakMap<HTMLElement>();

class GridRowDetailsDemo extends LitElement {
  @property({ type: Array }) users = [];

  @query('vaadin-grid')
  private grid!: GridElement;

  private _boundToggleDetailsRenderer = this._toggleDetailsRenderer.bind(this);

  private _boundRowDetailsRenderer = this._rowDetailsRenderer.bind(this);

  render() {
    return html`
      <vaadin-grid .items="${this.users}" .rowDetailsRenderer="${this._boundRowDetailsRenderer}">
        <vaadin-grid-column path="firstName" header="First name"></vaadin-grid-column>
        <vaadin-grid-column path="lastName" header="Last name"></vaadin-grid-column>
        <vaadin-grid-column .renderer="${this._boundToggleDetailsRenderer}"></vaadin-grid-column>
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

  _onCheckboxChange(e: CustomEvent) {
    const checkbox = e.target as HTMLElement;
    this._toggleDetails(e.detail.value, itemCache.get(checkbox.parentNode as HTMLElement));
  }

  _toggleDetails(value: boolean, item: GridItem) {
    if (value) {
      this.grid.openItemDetails(item);
    } else {
      this.grid.closeItemDetails(item);
    }
  }

  _toggleDetailsRenderer(root: HTMLElement, _column: GridColumnElement, model: GridItemModel) {
    // only render the checkbox once, to avoid re-creating during subsequent calls
    if (!root.firstElementChild) {
      render(
        html`
          <vaadin-checkbox @checked-changed="${this._onCheckboxChange}">
            Show Details
          </vaadin-checkbox>
        `,
        root,
        { eventContext: this } // bind event listener properly
      );
    }
    const { item } = model;
    // store the item to avoid grid virtual scrolling reusing DOM nodes to mess it up
    itemCache.set(root, item);
    const detailsOpened = this.grid.detailsOpenedItems || [];
    (root.firstElementChild as CheckboxElement).checked = detailsOpened.indexOf(item) > -1;
  }

  _rowDetailsRenderer(root: HTMLElement, _grid: GridElement, model: GridItemModel) {
    const user = model.item as { firstName: string };
    render(html`Hi! My name is ${user.firstName}!`, root);
  }
}

customElements.define('grid-row-details-demo', GridRowDetailsDemo);
