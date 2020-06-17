import { LitElement, html } from 'lit-element';
import { prismStyles } from '../styles/prism-styles';

import '../demos/grid-column-renderer';
import source from '../../docs/grid-column-renderer.demo';

class GridColumnRendererView extends LitElement {
  static styles = prismStyles;

  render() {
    return html`
      <grid-column-renderer-demo></grid-column-renderer-demo>
      <p>
        ${source}
      </p>
    `;
  }
}

customElements.define('grid-column-renderer-view', GridColumnRendererView);
