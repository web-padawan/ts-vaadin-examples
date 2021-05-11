import { LitElement, html, css } from 'lit';

class Demo404 extends LitElement {
  static get styles() {
    return css`
      h2 {
        margin: var(--lumo-space-m) 0;
      }
    `;
  }

  render() {
    return html`
      <h2>404</h2>
      <p>Page not found.</p>
    `;
  }
}

customElements.define('demo-404', Demo404);
