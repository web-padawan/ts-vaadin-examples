import { LitElement, html } from 'lit-element';
import { prismStyles } from '../styles/prism-styles';

import '../demos/grid-row-details';
import source from '../../docs/grid-row-details.demo';

class GridRowDetailsView extends LitElement {
  static styles = prismStyles;

  render() {
    return html`
      <grid-row-details-demo></grid-row-details-demo>
      <p>
        ${source}
      </p>
    `;
  }
}

customElements.define('grid-row-details-view', GridRowDetailsView);
