import { LitElement, html, css } from 'lit-element';
import { sharedStyles } from '../styles/shared-styles';

class Demo404 extends LitElement {
  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          display: block;
        }

        h2 {
          margin: var(--lumo-space-m) 0;
        }
      `
    ]
  }

  render() {
    return html`
      <div class="card">
        <h2>404</h2>
        <p>Page not found.</p>
      </div>
    `;
  }
}

customElements.define('demo-404', Demo404);
