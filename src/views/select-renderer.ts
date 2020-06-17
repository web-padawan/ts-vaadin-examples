import { LitElement, html } from 'lit-element';
import { prismStyles } from '../styles/prism-styles';

import '../demos/select-renderer';
import source from '../../docs/select-renderer.demo';

class SelectRendererView extends LitElement {
  static styles = prismStyles;

  render() {
    return html`
      <select-renderer-demo></select-renderer-demo>
      <p>
        ${source}
      </p>
    `;
  }
}

customElements.define('select-renderer-view', SelectRendererView);
