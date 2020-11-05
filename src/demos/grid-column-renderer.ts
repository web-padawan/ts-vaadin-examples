import { LitElement, html } from 'lit-element';
import { property } from 'lit-element/lib/decorators/property.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter.js';
import '@vaadin/vaadin-grid/vaadin-grid-sorter.js';
import '@vaadin/vaadin-text-field/vaadin-text-field.js';

import { gridRenderer, GridRenderer } from '../renderers/grid-renderer';

type User = {
  firstName: string;
  lastName: string;
  address: {
    street: string;
    city: string;
  };
};

type UserRenderer = GridRenderer<User>;

class GridColumnRendererDemo extends LitElement {
  @property({ type: Array }) users: User[] = [];

  @property({ type: String }) filter = '';

  render() {
    const renderIndex: UserRenderer = (_item, model) => html`<div>${model.index}</div>`;

    const renderName: UserRenderer = (item) => html`<div>${item.firstName} ${item.lastName}</div>`;

    const renderAddress: UserRenderer = ({ address }) => html`${address.street}, ${address.city}`;

    const renderEmail = () => html`
      <vaadin-grid-sorter path="email">Email</vaadin-grid-sorter>
      <vaadin-grid-filter path="email" value="${this.filter}">
        <vaadin-text-field
          slot="filter"
          focus-target
          theme="small"
          @value-changed="${this._onFilterChange}"
        ></vaadin-text-field>
      </vaadin-grid-filter>
    `;

    return html`
      <vaadin-grid .items="${this.users}">
        <vaadin-grid-column
          width="50px"
          flex-grow="0"
          header="#"
          .renderer="${gridRenderer(renderIndex)}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          width="120px"
          header="Name"
          .renderer="${gridRenderer(renderName)}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          auto-width
          header="Address"
          .renderer="${gridRenderer(renderAddress)}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          auto-width
          path="email"
          .headerRenderer="${gridRenderer(renderEmail, this.filter)}"
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
    this.filter = e.detail.value;
  }
}

customElements.define('grid-column-renderer-demo', GridColumnRendererDemo);
