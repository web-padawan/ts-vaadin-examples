import { LitElement, html } from 'lit-element';
import '../components/demo-snippet';

import '../demos/grid-row-details';
import source from '../../docs/grid-row-details.demo';

class GridRowDetailsView extends LitElement {
  render() {
    return html`
      <demo-snippet .source="${source}">
        <grid-row-details-demo></grid-row-details-demo>
      </demo-snippet>
    `;
  }
}

customElements.define('grid-row-details-view', GridRowDetailsView);
