import { LitElement, html } from 'lit';
import '../demos/combo-box-renderer';
import { source, title } from '../../docs/combo-box-renderer.demo';

class ComboBoxRendererView extends LitElement {
  render() {
    return html`
      <demo-snippet .source=${source} .name=${title}>
        <combo-box-renderer-demo></combo-box-renderer-demo>
      </demo-snippet>
    `;
  }
}

customElements.define('combo-box-renderer-view', ComboBoxRendererView);
