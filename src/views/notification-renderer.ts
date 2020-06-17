import { LitElement, html } from 'lit-element';
import { prismStyles } from '../styles/prism-styles';

import '../demos/notification-renderer';
import source from '../../docs/notification-renderer.demo';

class NotificationRendererView extends LitElement {
  static styles = prismStyles;

  render() {
    return html`
      <notification-renderer-demo></notification-renderer-demo>
      <p>
        ${source}
      </p>
    `;
  }
}

customElements.define('notification-renderer-view', NotificationRendererView);
