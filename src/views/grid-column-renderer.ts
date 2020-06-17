import { LitElement, html } from 'lit-element';
import '../components/demo-snippet';

import '../demos/grid-column-renderer';
import source from '../../docs/grid-column-renderer.demo';

class GridColumnRendererView extends LitElement {
  render() {
    return html`
      <demo-snippet .source="${source}">
        <grid-column-renderer-demo></grid-column-renderer-demo>
      </demo-snippet>
    `;
  }
}

customElements.define('grid-column-renderer-view', GridColumnRendererView);
