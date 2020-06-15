import { LitElement, property, html, css } from 'lit-element';
import { Router } from '@vaadin/router';
import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/typography.js';
import '@vaadin/vaadin-app-layout/vaadin-app-layout.js';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle.js';
import '@vaadin/vaadin-tabs/vaadin-tabs.js';

class DemoApp extends LitElement {
  @property({ type: Number }) selected: number | null = 0;

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: var(--lumo-font-family);
      }

      [main-title] {
        padding: var(--lumo-space-m);
        font-size: var(--lumo-font-size-xl);
        line-height: var(--lumo-line-height-m);
        font-weight: 400;
      }

      section {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    `;
  }

  private _boundLocationChanged = this._onLocationChanged.bind(this) as EventListener;

  render() {
    return html`
      <vaadin-app-layout>
        <vaadin-drawer-toggle slot="navbar"></vaadin-drawer-toggle>
        <div main-title slot="navbar">TS examples</div>
        <section slot="drawer">
          <vaadin-tabs .selected="${this.selected}" orientation="vertical">
          <vaadin-tab>
              <a href="/combo-box-data-provider">ComboBox data provider</a>
            </vaadin-tab>
            <vaadin-tab>
              <a href="/combo-box-renderer">ComboBox item renderer</a>
            </vaadin-tab>
            <vaadin-tab>
              <a href="/grid">Grid</a>
            </vaadin-tab>
          </vaadin-tabs>
        </section>
        <main id="outlet"></main>
      </vaadin-app-layout>
    `;
  }

  firstUpdated() {
    const outlet = this.renderRoot.querySelector('#outlet') as HTMLElement;

    const router = new Router(outlet);
    router.setRoutes([
      {
        path: '/',
        redirect: '/grid'
      },
      {
        path: '/combo-box-renderer',
        component: 'combo-box-renderer-demo',
        action: () => {
          import(/* webpackChunkName: "combo-box" */ './views/combo-box-renderer-demo');
        }
      },
      {
        path: '/combo-box-data-provider',
        component: 'combo-box-data-provider-demo',
        action: () => {
          import(/* webpackChunkName: "combo-box" */ './views/combo-box-data-provider-demo');
        }
      },
      {
        path: '/grid',
        component: 'grid-demo',
        action: () => {
          import(/* webpackChunkName: "grid" */ './views/grid-demo');
        }
      },
      {
        path: '(.*)+',
        component: 'demo-404',
        action: () => {
          import(/* webpackChunkName: "404" */ './views/404');
        }
      }
    ]);

    window.addEventListener('vaadin-router-location-changed', this._boundLocationChanged);
  }

  private _onLocationChanged(e: CustomEvent) {
    switch (e.detail.location.pathname) {
      case '/combo-box-data-provider':
        this.selected = 0;
        break;
      case '/combo-box-renderer':
        this.selected = 1;
        break;
      case '/grid':
        this.selected = 2;
        break;
      default:
        this.selected = null;
    }
  }
}

customElements.define('demo-app', DemoApp);
