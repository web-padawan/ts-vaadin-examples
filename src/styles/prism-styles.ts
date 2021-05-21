import { css } from 'lit';

export const prismStyles = css`
  pre,
  code {
    color: #d4d4d4;
    font-size: 13px;
    text-shadow: none;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  pre::selection,
  code::selection {
    text-shadow: none;
    background: #b3d4fc;
  }

  pre {
    margin: 0;
    padding: 1rem 1.5rem;
    overflow: auto;
    background: #1e1e1e;
  }

  :not(pre) > code {
    padding: 0.1em 0.3em;
    border-radius: 0.3em;
    color: #db4c69;
    background: #f9f2f4;
  }

  .namespace {
    opacity: 0.7;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #6a9955;
  }

  .token.punctuation {
    color: #d4d4d4;
  }

  .token.property,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #b5cea8;
  }

  .token.selector,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #ce9178;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #d4d4d4;
    background: #1e1e1e;
  }

  .token.atrule,
  .token.keyword {
    color: #c586c0;
  }

  .token.function {
    color: #dcdcaa;
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: #d16969;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.constant {
    color: #9cdcfe;
  }

  .token.class-name {
    color: #4ec9b0;
  }

  .token.parameter {
    color: #9cdcfe;
  }

  .token.interpolation {
    color: #9cdcfe;
  }

  .token.punctuation.interpolation-punctuation {
    color: #569cd6;
  }

  .token.boolean {
    color: #569cd6;
  }

  .token.property {
    color: #9cdcfe;
  }

  .token.selector {
    color: #d7ba7d;
  }

  .token.tag {
    color: #569cd6;
  }

  .token.attr-name {
    color: #9cdcfe;
  }

  .token.attr-value {
    color: #ce9178;
  }

  .token.entity {
    color: #4ec9b0;
    cursor: unset;
  }

  .token.namespace {
    color: #4ec9b0;
  }
`;
