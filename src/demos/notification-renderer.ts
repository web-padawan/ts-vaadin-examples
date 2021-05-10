import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-notification/vaadin-notification.js';
import { notificationRenderer } from 'lit-vaadin-helpers';

class NotificationRendererDemo extends LitElement {
  @property({ type: Boolean }) opened = false;

  @property({ type: Number }) count = 0;

  private renderNotification = () => html`Opened&nbsp;<b>${this.count}</b>&nbsp;times`;

  render() {
    return html`
      <vaadin-button @click=${this._toggle} theme="primary">Toggle</vaadin-button>
      <vaadin-notification
        .opened=${this.opened}
        .renderer="${notificationRenderer(this.renderNotification, this.count)}"
        position="bottom-end"
        duration="-1"
        @opened-changed="${this._onOpenedChanged}"
        theme="primary"
      ></vaadin-notification>
    `;
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
