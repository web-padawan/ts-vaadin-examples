import { LitElement, html } from 'lit-element';
import { property } from 'lit-element/lib/decorators/property.js';
import { query } from 'lit-element/lib/decorators/query.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-checkbox/vaadin-checkbox.js';

import type { CheckboxElement } from '@vaadin/vaadin-checkbox';
import type { GridElement, GridEventContext } from '@vaadin/vaadin-grid';

import { GridModel, gridRenderer } from '../renderers/grid-renderer';

class GridRowDetailsDemo extends LitElement {
  @property({ type: Array }) users = [];

  @query('vaadin-grid')
  private grid!: GridElement;

  render() {
    const details = (model: GridModel<{ firstName: string }>) =>
      html`Hi! My name is ${model.item.firstName}!`;

    const toggle = () => html`<vaadin-checkbox @change="${this._toggleDetails}"></vaadin-checkbox>`;

    return html`
      <vaadin-grid .items="${this.users}" .rowDetailsRenderer="${gridRenderer(details)}">
        <vaadin-grid-column path="firstName" header="First name"></vaadin-grid-column>
        <vaadin-grid-column path="lastName" header="Last name"></vaadin-grid-column>
        <vaadin-grid-column .renderer="${gridRenderer(toggle)}"></vaadin-grid-column>
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

  _toggleDetails(event: CustomEvent) {
    const target = event.target as CheckboxElement;
    const context = this.grid.getEventContext(event) as GridEventContext;
    if (target.checked) {
      this.grid.openItemDetails(context.item);
    } else {
      this.grid.closeItemDetails(context.item);
    }
  }
}

customElements.define('grid-row-details-demo', GridRowDetailsDemo);
