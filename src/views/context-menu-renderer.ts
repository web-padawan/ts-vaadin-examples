import { LitElement, html } from 'lit-element';
import { prismStyles } from '../styles/prism-styles';

import '../demos/context-menu-renderer';
import source from '../../docs/context-menu-renderer.demo';

class ContextMenuRendererView extends LitElement {
  static styles = prismStyles;

  render() {
    return html`
      <context-menu-renderer-demo></context-menu-renderer-demo>
      <p>
        ${source}
      </p>
    `;
  }
}

customElements.define('context-menu-renderer-view', ContextMenuRendererView);
