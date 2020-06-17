import { css } from 'lit-element';

export const prismStyles = css`
  p {
    padding: 1rem 2rem;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.02);
  }

  code[class*='lang-'],
  pre[class*='lang-'] {
    color: #393a34;
    font-family: 'Source Code Pro', 'Consolas', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    font-size: 0.875em;
    line-height: 1.4;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  pre[class*='lang-']::-moz-selection,
  pre[class*='lang-'] ::-moz-selection,
  code[class*='lang-']::-moz-selection,
  code[class*='lang-'] ::-moz-selection {
    background: #b3d4fc;
  }

  pre[class*='lang-']::selection,
  pre[class*='lang-'] ::selection,
  code[class*='lang-']::selection,
  code[class*='lang-'] ::selection {
    background: #b3d4fc;
  }

  /* Code blocks */
  pre[class*='lang-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    border: 1px solid #ddd;
    background-color: white;
  }

  /* Inline code */
  :not(pre) > code[class*='lang-'] {
    padding: 0.2em;
    padding-top: 1px;
    padding-bottom: 1px;
    background: #f8f8f8;
    border: 1px solid #ddd;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #998;
    font-style: italic;
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.string,
  .token.attr-value {
    color: #e3116c;
  }

  .token.punctuation,
  .token.operator {
    color: #393a34; /* no highlight */
  }

  .token.entity,
  .token.url,
  .token.symbol,
  .token.number,
  .token.boolean,
  .token.variable,
  .token.constant,
  .token.property,
  .token.regex,
  .token.inserted {
    color: #36acaa;
  }

  .token.atrule,
  .token.keyword,
  .token.attr-name,
  .lang-autohotkey .token.selector {
    color: #00a4db;
  }

  .token.function,
  .token.deleted,
  .lang-autohotkey .token.tag {
    color: #9a050f;
  }

  .token.tag,
  .token.selector,
  .lang-autohotkey .token.keyword {
    color: #00009f;
  }

  .token.important,
  .token.function,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }
`;
