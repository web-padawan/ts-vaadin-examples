import { LitElement, html, property } from 'lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-notification/vaadin-notification.js';

// TODO: make notification renderer argument optional
import type { NotificationElement } from '@vaadin/vaadin-notification';

import { sharedStyles } from '../styles/shared-styles';

class NotificationRendererDemo extends LitElement {
  @property({ type: Boolean }) opened = false;

  private _boundNotificationRenderer = this._notificationRenderer.bind(this);

  static get styles() {
    return sharedStyles;
  }

  render() {
    return html`
      <button @click=${this._toggle}>Toggle</button>
      <vaadin-notification
        .opened=${this.opened}
        .renderer=${this._boundNotificationRenderer}
        position="top-start"
        duration="-1"
      ></vaadin-notification>
    `;
  }

  _notificationRenderer(root: HTMLElement, _notification: NotificationElement) {
    render(html`<b>Hello world!</b>`, root);
  }

  _toggle() {
    this.opened = !this.opened
  }
}

customElements.define('notification-renderer-demo', NotificationRendererDemo);
