import { LitElement, html } from 'lit';
import '../demos/grid-row-details';
import { source, title } from '../../docs/grid-row-details.demo';

class GridRowDetailsView extends LitElement {
  render() {
    return html`
      <demo-snippet .source="${source}" .name="${title}">
        <grid-row-details-demo></grid-row-details-demo>
      </demo-snippet>
    `;
  }
}

customElements.define('grid-row-details-view', GridRowDetailsView);
