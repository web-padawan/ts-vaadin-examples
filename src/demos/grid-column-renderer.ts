import { LitElement, property, html } from 'lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter.js';
import '@vaadin/vaadin-grid/vaadin-grid-sorter.js';

import type { GridItemModel } from '@vaadin/vaadin-grid';
import type { GridColumnElement } from '@vaadin/vaadin-grid/vaadin-grid-column.js';
import type { GridFilterElement } from '@vaadin/vaadin-grid/vaadin-grid-filter.js';

type User = {
  firstName: string;
  lastName: string;
  address: {
    street: string;
    city: string;
  };
};

class GridColumnRendererDemo extends LitElement {
  @property({ type: Array }) users: User[] = [];

  private _boundIndexRenderer = this._indexRenderer.bind(this);

  private _boundNameRenderer = this._nameRenderer.bind(this);

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
        <vaadin-grid-column
          width="120px"
          header="Name"
          .renderer="${this._boundNameRenderer}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          auto-width
          header="Address"
          .renderer="${this._boundAddressRenderer}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          auto-width
          path="email"
          .headerRenderer="${this._boundEmailHeaderRenderer}"
        ></vaadin-grid-column>
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

  _onFilterChange(e: CustomEvent) {
    const target = e.target as HTMLElement;
    (target.parentNode as GridFilterElement).value = e.detail.value;
  }

  _indexRenderer(root: HTMLElement, _column?: GridColumnElement, model?: GridItemModel) {
    render(html`<div>${model!.index}</div>`, root);
  }

  _nameRenderer(root: HTMLElement, _column?: GridColumnElement, model?: GridItemModel) {
    const user = model!.item as User;
    render(html`<div>${user.firstName} ${user.lastName}</div>`, root);
  }

  _addressRenderer(root: HTMLElement, _column?: GridColumnElement, model?: GridItemModel) {
    const user = model!.item as User;
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
