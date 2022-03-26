import { LitElement, html } from 'lit';
import '../demos/select-renderer';
import { source, title } from '../../docs/select-renderer.demo';

class SelectRendererView extends LitElement {
  render() {
    return html`
      <demo-snippet .source=${source} .name=${title}>
        <select-renderer-demo></select-renderer-demo>
      </demo-snippet>
    `;
  }
}

customElements.define('select-renderer-view', SelectRendererView);
