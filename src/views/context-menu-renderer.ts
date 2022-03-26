import { LitElement, html } from 'lit';
import '../demos/context-menu-renderer';
import { source, title } from '../../docs/context-menu-renderer.demo';

class ContextMenuRendererView extends LitElement {
  render() {
    return html`
      <demo-snippet .source=${source} .name=${title}>
        <context-menu-renderer-demo></context-menu-renderer-demo>
      </demo-snippet>
    `;
  }
}

customElements.define('context-menu-renderer-view', ContextMenuRendererView);
