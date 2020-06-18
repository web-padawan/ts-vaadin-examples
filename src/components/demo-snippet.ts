import { LitElement, html, css, svg, property, TemplateResult } from 'lit-element';
import { prismStyles } from '../styles/prism-styles';

const copyIcon = svg`
  <path
    d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
  ></path>
`;

const checkIcon = svg`<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>`;

class DemoSnippet extends LitElement {
  @property({ attribute: false }) source!: TemplateResult;

  @property({ type: Boolean }) copied = false;

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

        .actions {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
        }

        button {
          position: relative;
          width: 36px;
          height: 36px;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          background-color: transparent;
          color: #fff;
          outline: none;
        }

        button::after {
          background-color: currentColor;
          border-radius: 50%;
          content: '';
          top: 0;
          left: 0;
          height: 100%;
          opacity: 0;
          pointer-events: none;
          position: absolute;
          transform: scale(1.3);
          width: 100%;
          transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
        }

        button:hover::after {
          opacity: 0.08;
        }

        button:focus::after {
          opacity: 0.16;
        }

        .icon {
          fill: currentColor;
          width: 24px;
          height: 24px;
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
        <div class="actions">
          <button @click="${this._onCopyClick}" aria-label="Copy">
            <svg class="icon" viewBox="0 0 24 24" focusable="false">
              ${this.copied ? checkIcon : copyIcon}
            </svg>
          </button>
        </div>
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
        this.copied = true;
      } catch (err) {
        // Copy command is not available
      }

      // Return to the copy button after a second.
      setTimeout(() => {
        this.copied = false;
      }, 1000);

      selection.removeAllRanges();
    }
  }
}

customElements.define('demo-snippet', DemoSnippet);
