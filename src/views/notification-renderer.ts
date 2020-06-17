import { LitElement, html } from 'lit-element';
import '../components/demo-snippet';

import '../demos/notification-renderer';
import source from '../../docs/notification-renderer.demo';

class NotificationRendererView extends LitElement {
  render() {
    return html`
      <demo-snippet .source="${source}">
        <notification-renderer-demo></notification-renderer-demo>
      </demo-snippet>
    `;
  }
}

customElements.define('notification-renderer-view', NotificationRendererView);
