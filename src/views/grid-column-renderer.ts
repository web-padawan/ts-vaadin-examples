import { LitElement, html } from 'lit';
import '../demos/grid-column-renderer';
import { source, title } from '../../docs/grid-column-renderer.demo';

class GridColumnRendererView extends LitElement {
  render() {
    return html`
      <demo-snippet .source="${source}" .name="${title}">
        <grid-column-renderer-demo></grid-column-renderer-demo>
      </demo-snippet>
    `;
  }
}

customElements.define('grid-column-renderer-view', GridColumnRendererView);
