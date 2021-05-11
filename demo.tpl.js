import { html } from 'lit';

export const title = '{{=it.title}}';

export const source = html`{{=it.highlightJS(it.escape(it.source))}}`;
