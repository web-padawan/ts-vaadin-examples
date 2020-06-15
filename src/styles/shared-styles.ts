import { css } from 'lit-element';
import { registerStyles } from '@vaadin/vaadin-themable-mixin/register-styles.js';

export const sharedStyles = css`
  :host {
    display: block;
    margin: var(--lumo-space-m);
    padding: var(--lumo-space-m);
    font-family: var(--lumo-font-family);
  }
`;

registerStyles(
  'vaadin-grid',
  css`
    [part~="cell"].dark {
      color: #fff;
      background: #999;
    }

    [part~="cell"].light {
      color: #333;
      background: #fafafa;
    }
  `
);
