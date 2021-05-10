import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-checkbox/vaadin-checkbox.js';
import type { CheckboxElement } from '@vaadin/vaadin-checkbox';
import type { GridElement, GridEventContext } from '@vaadin/vaadin-grid';
import {
  columnBodyRenderer,
  gridRowDetailsRenderer,
  GridRowDetailsLitRenderer
} from 'lit-vaadin-helpers';

type Person = {
  firstName: string;
  lastName: string;
};

type FirstNameRenderer = GridRowDetailsLitRenderer<Person>;

class GridRowDetailsDemo extends LitElement {
  @property({ type: Array }) users = [];

  @query('vaadin-grid')
  private grid!: GridElement;

  private renderDetails: FirstNameRenderer = (item) => html`Hi! My name is ${item.firstName}!`;

  private renderToggle = () => html`<vaadin-checkbox @change="${this._toggle}"></vaadin-checkbox>`;

  render() {
    return html`
      <vaadin-grid
        .items="${this.users}"
        .rowDetailsRenderer="${gridRowDetailsRenderer(this.renderDetails)}"
      >
        <vaadin-grid-column path="firstName" header="First name"></vaadin-grid-column>
        <vaadin-grid-column path="lastName" header="Last name"></vaadin-grid-column>
        <vaadin-grid-column
          .renderer="${columnBodyRenderer(this.renderToggle)}"
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

  _toggle(event: CustomEvent) {
    const target = event.target as CheckboxElement;
    const context = this.grid.getEventContext(event) as GridEventContext<Person>;
    if (target.checked) {
      this.grid.openItemDetails(context.item);
    } else {
      this.grid.closeItemDetails(context.item);
    }
  }
}

customElements.define('grid-row-details-demo', GridRowDetailsDemo);
