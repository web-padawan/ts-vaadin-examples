import { LitElement, html } from 'lit-element';
import { prismStyles } from '../styles/prism-styles';

import '../demos/dialog-renderer';
import source from '../../docs/dialog-renderer.demo';

class DialogRendererView extends LitElement {
  static styles = prismStyles;

  render() {
    return html`
      <dialog-renderer-demo></dialog-renderer-demo>
      <p>
        ${source}
      </p>
    `;
  }
}

customElements.define('dialog-renderer-view', DialogRendererView);
