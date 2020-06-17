import { LitElement, html } from 'lit-element';
import '../components/demo-snippet';

import '../demos/context-menu-renderer';
import source from '../../docs/context-menu-renderer.demo';

class ContextMenuRendererView extends LitElement {
  render() {
    return html`
      <demo-snippet .source="${source}">
        <context-menu-renderer-demo></context-menu-renderer-demo>
      </demo-snippet>
    `;
  }
}

customElements.define('context-menu-renderer-view', ContextMenuRendererView);
