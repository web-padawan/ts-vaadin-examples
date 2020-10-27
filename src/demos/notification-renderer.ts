import { LitElement, html } from 'lit-element';
import { property } from 'lit-element/lib/decorators/property.js';
import { render } from 'lit-html';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-notification/vaadin-notification.js';

class NotificationRendererDemo extends LitElement {
  @property({ type: Boolean }) opened = false;

  @property({ type: Number }) count = 0;

  private _boundNotificationRenderer = this._notificationRenderer.bind(this);

  render() {
    return html`
      <vaadin-button @click=${this._toggle} theme="primary">Toggle</vaadin-button>
      <vaadin-notification
        .opened=${this.opened}
        .renderer=${this._boundNotificationRenderer}
        position="bottom-end"
        duration="-1"
        @opened-changed="${this._onOpenedChanged}"
        theme="primary"
      ></vaadin-notification>
    `;
  }

  _notificationRenderer(root: HTMLElement) {
    render(html`Notification opened&nbsp;<b>${this.count}</b>&nbsp;times`, root);
  }

  _onOpenedChanged(e: CustomEvent) {
    // upward property binding
    this.opened = e.detail.value;
  }

  _toggle() {
    this.opened = !this.opened;
    if (this.opened) {
      this.count += 1;
    }
  }
}

customElements.define('notification-renderer-demo', NotificationRendererDemo);
