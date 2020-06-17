import { LitElement, html } from 'lit-element';
import { prismStyles } from '../styles/prism-styles';

import '../demos/combo-box-data-provider';
import source from '../../docs/combo-box-data-provider.demo';

class ComboBoxDataProviderView extends LitElement {
  static styles = prismStyles;

  render() {
    return html`
      <combo-box-data-provider-demo></combo-box-data-provider-demo>
      <h2>Source</h2>
      <p>
        ${source}
      </p>
    `;
  }
}

customElements.define('combo-box-data-provider-view', ComboBoxDataProviderView);
