import { css } from 'lit-element';
import { registerStyles } from '@vaadin/vaadin-themable-mixin/register-styles.js';

registerStyles(
  'vaadin-grid',
  css`
    [part~='cell'].dark {
      color: #fff;
      background: #999;
    }

    [part~='cell'].light {
      color: #333;
      background: #fafafa;
    }
  `
);
