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
              <a href="/grid-cell-class-name-generator">Grid cell class generator</a>
            </vaadin-tab>
            <vaadin-tab>
              <a href="/grid-column-renderer">Grid column renderer</a>
            </vaadin-tab>
            <vaadin-tab>
              <a href="/grid-row-details">Grid row details renderer</a>
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
        redirect: '/combo-box-data-provider'
      },
      {
        path: '/combo-box-renderer',
        component: 'combo-box-renderer-demo',
        action: () => {
          import(/* webpackChunkName: "combo-box-renderer" */ './views/combo-box-renderer-demo');
        }
      },
      {
        path: '/combo-box-data-provider',
        component: 'combo-box-data-provider-demo',
        action: () => {
          import(/* webpackChunkName: "combo-box-data-provider" */ './views/combo-box-data-provider-demo');
        }
      },
      {
        path: '/grid-cell-class-name-generator',
        component: 'grid-cell-class-name-generator-demo',
        action: () => {
          import(/* webpackChunkName: "grid-cell-class-name-generator" */ './views/grid-cell-class-name-generator-demo');
        }
      },
      {
        path: '/grid-column-renderer',
        component: 'grid-column-renderer-demo',
        action: () => {
          import(/* webpackChunkName: "grid-column-renderer" */ './views/grid-column-renderer-demo');
        }
      },
      {
        path: '/grid-row-details',
        component: 'grid-row-details-demo',
        action: () => {
          import(/* webpackChunkName: "grid-row-details" */ './views/grid-row-details-demo');
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
      case '/grid-cell-class-name-generator':
        this.selected = 2;
        break;
      case '/grid-column-renderer':
        this.selected = 3;
        break;
      case '/grid-row-details':
        this.selected = 4;
        break;
      default:
        this.selected = null;
    }
  }
}

customElements.define('demo-app', DemoApp);
