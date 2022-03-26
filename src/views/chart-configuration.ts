import { LitElement, html } from 'lit';
import '../demos/chart-configuration';
import { source, title } from '../../docs/chart-configuration.demo';

class ChartConfigurationView extends LitElement {
  render() {
    return html`
      <demo-snippet .source=${source} .name=${title}>
        <chart-configuration-demo></chart-configuration-demo>
      </demo-snippet>
    `;
  }
}

customElements.define('chart-configuration-view', ChartConfigurationView);
