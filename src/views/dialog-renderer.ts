import { LitElement, html } from 'lit-element';
import '../components/demo-snippet';

import '../demos/dialog-renderer';
import source from '../../docs/dialog-renderer.demo';

class DialogRendererView extends LitElement {
  render() {
    return html`
      <demo-snippet .source="${source}">
        <dialog-renderer-demo></dialog-renderer-demo>
      </demo-snippet>
    `;
  }
}

customElements.define('dialog-renderer-view', DialogRendererView);
