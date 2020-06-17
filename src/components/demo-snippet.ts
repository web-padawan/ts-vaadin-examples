import { LitElement, html, css, property, TemplateResult } from 'lit-element';
import { prismStyles } from '../styles/prism-styles';

class DemoSnippet extends LitElement {
  @property({ attribute: false }) source!: TemplateResult;

  @property() copyBtnText = 'copy';

  static get styles() {
    return [
      prismStyles,
      css`
        :host {
          display: block;
          max-width: 60rem;
          margin: 0 auto;
        }

        .demo {
          padding: 1.5rem;
          background: hsla(214, 60%, 80%, 0.14);
        }

        .code-container {
          margin: 0;
          padding: 0;
          background-color: rgba(0, 0, 0, 0.02);
          font-size: 1rem;
          overflow: auto;
          position: relative;
        }

        button {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          text-transform: uppercase;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.9);
          color: #000;
        }

        button:focus,
        button:hover {
          background: rgba(255, 255, 255, 0.6);
        }
      `
    ];
  }

  render() {
    return html`
      <div class="demo">
        <slot></slot>
      </div>
      <div class="code-container">
        <pre><code>${this.source}</code></pre>
        <button @click="${this._onCopyClick}">${this.copyBtnText}</button>
      </div>
    `;
  }

  private _onCopyClick() {
    const container = this.renderRoot.querySelector('code');
    if (container) {
      const range = document.createRange();
      range.selectNodeContents(container);
      const selection = window.getSelection() as Selection;
      selection.removeAllRanges();
      selection.addRange(range);
      try {
        document.execCommand('copy');
        this.copyBtnText = 'done';
      } catch (err) {
        // Copy command is not available
        this.copyBtnText = 'error';
      }

      // Return to the copy button after a second.
      setTimeout(() => {
        this.copyBtnText = 'copy';
      }, 1000);

      selection.removeAllRanges();
    }
  }
}

customElements.define('demo-snippet', DemoSnippet);
