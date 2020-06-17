import { LitElement, html } from 'lit-element';
import '../components/demo-snippet';

import '../demos/select-renderer';
import source from '../../docs/select-renderer.demo';

class SelectRendererView extends LitElement {
  render() {
    return html`
      <demo-snippet .source="${source}">
        <select-renderer-demo></select-renderer-demo>
      </demo-snippet>
    `;
  }
}

customElements.define('select-renderer-view', SelectRendererView);
