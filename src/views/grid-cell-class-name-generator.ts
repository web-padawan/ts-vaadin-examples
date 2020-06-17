import { LitElement, html } from 'lit-element';
import { prismStyles } from '../styles/prism-styles';

import '../demos/grid-cell-class-name-generator';
import source from '../../docs/grid-cell-class-name-generator.demo';

class GridCellClassNameGeneratorView extends LitElement {
  static styles = prismStyles;

  render() {
    return html`
      <grid-cell-class-name-generator-demo></grid-cell-class-name-generator-demo>
      <p>
        ${source}
      </p>
    `;
  }
}

customElements.define('grid-cell-class-name-generator-view', GridCellClassNameGeneratorView);
