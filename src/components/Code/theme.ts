import { css } from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const THEME = css`
  .cm-s-glyph.CodeMirror {
    background: ${themeGet("colors.background")};
    color: ${themeGet("colors.secondary")};
  }

  .cm-s-glyph div.CodeMirror-selected {
    background: ${themeGet("colors.hint")};
  }

  .cm-s-glyph .CodeMirror-gutters {
    background: ${themeGet("colors.background")};
    border-right: 0;
  }

  .cm-s-glyph .CodeMirror-linenumber {
    color: ${themeGet("colors.secondary")};
  }

  .cm-s-glyph .CodeMirror-cursor {
    border-left: 1px solid ${themeGet("colors.primary")};
  }

  .cm-s-glyph span.cm-comment {
    color: ${themeGet("colors.tertiary")};
  }

  .cm-s-glyph span.cm-atom {
    color: ${themeGet("colors.external")};
  }

  .cm-s-glyph span.cm-number {
    color: ${themeGet("colors.external")};
  }

  .cm-s-glyph span.cm-property,
  .cm-s-glyph span.cm-attribute {
    color: ${themeGet("colors.primary")};
  }

  .cm-s-glyph span.cm-keyword {
    color: ${themeGet("colors.accent")};
  }

  .cm-s-glyph span.cm-string {
    color: ${themeGet("colors.primary")};
  }

  .cm-s-glyph span.cm-property.cm-string {
    color: ${themeGet("colors.primary")};
  }

  .cm-s-glyph span.cm-error,
  .cm-s-glyph span.cm-invalidchar {
    background-color: ${themeGet("colors.danger")};
    color: ${themeGet("colors.background")};
  }

  .cm-s-glyph span.cm-bracket {
    color: ${themeGet("colors.primary")};
  }

  .cm-s-glyph span.cm-link {
    color: ${themeGet("colors.external")};
  }

  .cm-s-glyph .CodeMirror-matchingbracket {
    text-decoration: underline;
  }
`;
