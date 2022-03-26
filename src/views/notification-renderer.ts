import { LitElement, html } from 'lit';
import '../demos/notification-renderer';
import { source, title } from '../../docs/notification-renderer.demo';

class NotificationRendererView extends LitElement {
  render() {
    return html`
      <demo-snippet .source=${source} .name=${title}>
        <notification-renderer-demo></notification-renderer-demo>
      </demo-snippet>
    `;
  }
}

customElements.define('notification-renderer-view', NotificationRendererView);
