import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter.js';
import '@vaadin/vaadin-grid/vaadin-grid-sorter.js';
import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import {
  columnBodyRenderer,
  columnHeaderRenderer,
  GridColumnBodyLitRenderer
} from 'lit-vaadin-helpers';

type User = {
  firstName: string;
  lastName: string;
  address: {
    street: string;
    city: string;
  };
};

type UserRenderer = GridColumnBodyLitRenderer<User>;

class GridColumnRendererDemo extends LitElement {
  @property({ type: Array }) users: User[] = [];

  @property({ type: String }) filter = '';

  private renderIndex: UserRenderer = (_item, model) => html`<div>${model.index}</div>`;

  private renderName: UserRenderer = (item) => html`<div>${item.firstName} ${item.lastName}</div>`;

  private renderAddress: UserRenderer = ({ address }) => html`${address.street}, ${address.city}`;

  private renderEmail = () => html`
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

  render() {
    return html`
      <vaadin-grid .items="${this.users}">
        <vaadin-grid-column
          width="50px"
          flex-grow="0"
          header="#"
          .renderer="${columnBodyRenderer(this.renderIndex)}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          width="120px"
          header="Name"
          .renderer="${columnBodyRenderer(this.renderName)}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          auto-width
          header="Address"
          .renderer="${columnBodyRenderer(this.renderAddress)}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          auto-width
          path="email"
          .headerRenderer="${columnHeaderRenderer(this.renderEmail, this.filter)}"
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
