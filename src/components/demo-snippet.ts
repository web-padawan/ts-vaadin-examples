import { LitElement, html, css, svg, property, TemplateResult } from 'lit-element';
import { prismStyles } from '../styles/prism-styles';

const copyIcon = svg`<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>`;

const checkIcon = svg`<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>`;

const githubIcon = svg`<path d="M12.184.837C5.684.837.418 6.102.418 12.603c0 5.206 3.368 9.603 8.045 11.162.588.103.81-.25.81-.559 0-.28-.016-1.206-.016-2.191-2.956.544-3.72-.72-3.956-1.382-.132-.339-.706-1.383-1.206-1.662-.412-.221-1-.765-.015-.78.927-.015 1.589.853 1.81 1.206 1.058 1.78 2.75 1.28 3.426.97.103-.764.412-1.279.75-1.573-2.618-.294-5.353-1.309-5.353-5.81 0-1.279.456-2.338 1.206-3.161-.118-.294-.53-1.5.118-3.118 0 0 .985-.309 3.235 1.206a10.918 10.918 0 012.942-.397c1 0 2 .132 2.94.397 2.251-1.53 3.236-1.206 3.236-1.206.648 1.618.236 2.824.118 3.118.75.823 1.206 1.868 1.206 3.162 0 4.515-2.75 5.515-5.368 5.81.427.367.794 1.073.794 2.176 0 1.573-.014 2.838-.014 3.235 0 .31.22.677.808.56a11.785 11.785 0 008.016-11.163C23.95 6.102 18.685.837 12.184.837z"/>`;

class DemoSnippet extends LitElement {
  @property({ attribute: false }) source!: TemplateResult;

  @property({ type: Boolean }) copied = false;

  @property({ type: String }) name = '';

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
          display: flex;
        }

        .button {
          display: block;
          position: relative;
          width: 36px;
          height: 36px;
          padding: 6px;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          background-color: transparent;
          color: #fff;
          outline: none;
          text-decoration: none;
        }

        .button::after {
          background-color: currentColor;
          border-radius: 50%;
          content: '';
          top: 0;
          left: 0;
          height: 36px;
          opacity: 0;
          pointer-events: none;
          position: absolute;
          transform: scale(1.25);
          width: 36px;
          transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
        }

        .button:hover::after {
          opacity: 0.08;
        }

        .button:focus::after {
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
    const { name, source, copied } = this;

    return html`
      <div class="demo">
        <slot></slot>
      </div>
      <div class="code-container">
        <pre><code>${source}</code></pre>
        <div class="actions">
          <a
            href="https://github.com/web-padawan/ts-vaadin-examples/blob/master/src/demos/${name}.ts"
            target="_blank"
            class="button"
            aria-label="GitHub"
          >
            <svg class="icon" viewBox="0 0 24 24" focusable="false">${githubIcon}</svg>
          </a>
          <button class="button" @click="${this._onCopyClick}" aria-label="Copy">
            <svg class="icon" viewBox="0 0 24 24" focusable="false">
              ${copied ? checkIcon : copyIcon}
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
