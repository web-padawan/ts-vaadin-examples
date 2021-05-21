import { registerStyles, css } from '@vaadin/vaadin-themable-mixin/register-styles.js';

registerStyles(
  'vaadin-grid',
  css`
    [part~='cell'].dark {
      color: var(--lumo-contrast-color);
      background-color: var(--lumo-base-color);
    }

    [part~='cell'].light {
      background: var(--lumo-shade-50pct);
    }
  `
);
