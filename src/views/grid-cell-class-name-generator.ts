import { LitElement, html } from 'lit';
import '../components/demo-snippet';

import '../demos/grid-cell-class-name-generator';
import { source, title } from '../../docs/grid-cell-class-name-generator.demo';

class GridCellClassNameGeneratorView extends LitElement {
  render() {
    return html`
      <demo-snippet .source="${source}" .name="${title}">
        <grid-cell-class-name-generator-demo></grid-cell-class-name-generator-demo>
      </demo-snippet>
    `;
  }
}

customElements.define('grid-cell-class-name-generator-view', GridCellClassNameGeneratorView);
