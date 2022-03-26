import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '@vaadin/grid';
import type { GridCellClassNameGenerator } from '@vaadin/grid';

type User = {
  firstName: string;
  lastName: string;
  address: {
    phone: string;
    city: string;
  };
  email: string;
};

class GridCellClassNameGeneratorDemo extends LitElement {
  @property({ type: Array }) users = [];

  private cellClassGenerator: GridCellClassNameGenerator<User> = (column, model) => {
    const isDark = column.path === 'lastName' || column.path === 'email';
    const classes = ['light', 'dark'];
    return model.index % 2 === 0 ? classes[Number(isDark)] : classes[Number(!isDark)];
  };

  render() {
    return html`
      <vaadin-grid .items=${this.users} .cellClassNameGenerator=${this.cellClassGenerator}>
        <vaadin-grid-column path="firstName" header="First name"></vaadin-grid-column>
        <vaadin-grid-column path="lastName" header="Last name"></vaadin-grid-column>
        <vaadin-grid-column path="address.phone" header="Phone"></vaadin-grid-column>
        <vaadin-grid-column path="email" header="Email"></vaadin-grid-column>
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
}

customElements.define('grid-cell-class-name-generator-demo', GridCellClassNameGeneratorDemo);
