import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import '@vaadin/app-layout';
import '@vaadin/app-layout/vaadin-drawer-toggle.js';
import '@vaadin/tabs';
import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/typography.js';
import './components/demo-snippet';
import './styles/global-styles';
import './styles/register-styles';

type DemoData = { demo: string; title: string };

class DemoApp extends LitElement {
  @property({ type: Number }) selected: number | null = 0;

  @property({ attribute: false }) demos: DemoData[] = [];

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: var(--lumo-font-family);
      }

      .title {
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

      #outlet > * {
        display: block;
        margin: var(--lumo-space-m);
        font-family: var(--lumo-font-family);
      }
    `;
  }

  private _boundLocationChanged = this._onLocationChanged.bind(this) as EventListener;

  render() {
    return html`
      <vaadin-app-layout>
        <vaadin-drawer-toggle slot="navbar"></vaadin-drawer-toggle>
        <div class="title" slot="navbar">TypeScript Vaadin examples</div>
        <section slot="drawer">
          <vaadin-tabs .selected=${this.selected} orientation="vertical">
            ${this.demos.map(({ demo, title }) => {
              return html`
                <vaadin-tab>
                  <a href="/${demo}">${title}</a>
                </vaadin-tab>
              `;
            })}
          </vaadin-tabs>
        </section>
        <main id="outlet"></main>
      </vaadin-app-layout>
    `;
  }

  async firstUpdated() {
    const outlet = this.renderRoot.querySelector('#outlet') as HTMLElement;

    const demos = (await fetch('./demos.json').then((r) => r.json())) as DemoData[];

    this.demos = demos;

    const demoRoutes = demos.map(({ demo }) => {
      return {
        path: `/${demo}`,
        component: `${demo}-view`,
        action: () => {
          import(`./views/${demo}`);
        }
      };
    });

    const router = new Router(outlet);
    router.setRoutes([
      {
        path: '/',
        redirect: `/${demos[0].demo}`
      },
      ...demoRoutes,
      {
        path: '(.*)+',
        component: 'demo-404',
        action: () => {
          import(/* webpackChunkName: "404" */ './404');
        }
      }
    ]);

    window.addEventListener('vaadin-router-location-changed', this._boundLocationChanged);
  }

  private _onLocationChanged(e: CustomEvent) {
    this.selected = this.demos.findIndex(({ demo }) => e.detail.location.pathname === `/${demo}`);
  }
}

customElements.define('demo-app', DemoApp);
