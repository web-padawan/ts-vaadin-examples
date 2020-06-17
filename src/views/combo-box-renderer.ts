import { LitElement, html } from 'lit-element';
import { prismStyles } from '../styles/prism-styles';

import '../demos/combo-box-renderer';
import source from '../../docs/combo-box-renderer.demo';

class ComboBoxRendererView extends LitElement {
  static styles = prismStyles;

  render() {
    return html`
      <combo-box-renderer-demo></combo-box-renderer-demo>
      <p>
        ${source}
      </p>
    `;
  }
}

customElements.define('combo-box-renderer-view', ComboBoxRendererView);
