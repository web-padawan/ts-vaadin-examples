import { css } from 'lit-element';

export const sharedStyles = css`
  :host {
    display: block;
    font-family: var(--lumo-font-family);
  }

  .card {
    margin: var(--lumo-space-m);
    padding: var(--lumo-space-m);
  }
`;
