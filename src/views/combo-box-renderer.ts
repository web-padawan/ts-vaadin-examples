import { LitElement, html } from 'lit-element';
import '../components/demo-snippet';

import '../demos/combo-box-renderer';
import source from '../../docs/combo-box-renderer.demo';

class ComboBoxRendererView extends LitElement {
  render() {
    return html`
      <demo-snippet .source="${source}">
        <combo-box-renderer-demo></combo-box-renderer-demo>
      </demo-snippet>
    `;
  }
}

customElements.define('combo-box-renderer-view', ComboBoxRendererView);
