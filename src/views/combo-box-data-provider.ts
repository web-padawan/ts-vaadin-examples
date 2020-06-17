import { LitElement, html } from 'lit-element';
import '../components/demo-snippet';

import '../demos/combo-box-data-provider';
import source from '../../docs/combo-box-data-provider.demo';

class ComboBoxDataProviderView extends LitElement {
  render() {
    return html`
      <demo-snippet .source="${source}">
        <combo-box-data-provider-demo></combo-box-data-provider-demo>
      </demo-snippet>
    `;
  }
}

customElements.define('combo-box-data-provider-view', ComboBoxDataProviderView);
