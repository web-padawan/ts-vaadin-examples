import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import '@vaadin/grid';
import '@vaadin/checkbox';
import type { Checkbox } from '@vaadin/checkbox';
import type { Grid, GridEventContext } from '@vaadin/grid';
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
  private grid!: Grid<Person>;

  private renderDetails: FirstNameRenderer = (item) => html`Hi! My name is ${item.firstName}!`;

  private renderToggle = () => html`<vaadin-checkbox @change=${this._toggle}></vaadin-checkbox>`;

  render() {
    return html`
      <vaadin-grid .items=${this.users} ${gridRowDetailsRenderer(this.renderDetails)}>
        <vaadin-grid-column path="firstName" header="First name"></vaadin-grid-column>
        <vaadin-grid-column path="lastName" header="Last name"></vaadin-grid-column>
        <vaadin-grid-column ${columnBodyRenderer(this.renderToggle)}></vaadin-grid-column>
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
    const target = event.target as Checkbox;
    const context = this.grid.getEventContext(event) as GridEventContext<Person>;
    if (context.item) {
      if (target.checked) {
        this.grid.openItemDetails(context.item);
      } else {
        this.grid.closeItemDetails(context.item);
      }
    }
  }
}

customElements.define('grid-row-details-demo', GridRowDetailsDemo);
