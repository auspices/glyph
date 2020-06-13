import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/lint.css";
import "codemirror-graphql/hint";
import "codemirror-graphql/lint";
import "codemirror-graphql/info";
import "codemirror-graphql/jump";
import "codemirror-graphql/mode";
import "codemirror/keymap/sublime";
import React from "react";
import { createGlobalStyle } from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import {
  UnControlled as CodeMirror,
  IUnControlledCodeMirror,
} from "react-codemirror2";
import { THEME } from "./theme";
import { pillFocusMixin, paneShadowMixin } from "@auspices/eos";

const CodeStyles = createGlobalStyle`
  .CodeMirror {
    width: 100%;
    height: 100%;
    overflow: auto;
    font-family: ${themeGet("fonts.mono")};
    font-size: ${themeGet("fontSizes.1")};
    ${THEME}
  }

  .CodeMirror-hints {
    position: absolute;
    z-index: 10;
    overflow: hidden;
    list-style: none;
    margin: 0;
    border-radius: 4px;
    background-color: ${themeGet("colors.background")};
    overflow-y: auto;
    font-size: ${themeGet("fontSizes.1")};
    font-family: ${themeGet("fonts.body")};
    ${paneShadowMixin}
  }

  .CodeMirror-hint {
    text-align: left;
    cursor: pointer;
    text-decoration: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: box-shadow 250ms ease;
    padding: ${themeGet("space.2")} ${themeGet("space.4")};

    &:hover {
      background-color: ${themeGet("colors.hint")};
    }

    &:focus {
      outline: 0;
      ${pillFocusMixin}
    }
  }

  .CodeMirror-hint-active {
    background-color: ${themeGet("colors.hint")};
  }
`;

export type CodeProps = IUnControlledCodeMirror;

export const Code = React.forwardRef(
  ({ options = {}, ...rest }: CodeProps, forwardedRef) => {
    return (
      <>
        <CodeStyles />

        <CodeMirror
          ref={forwardedRef as any}
          className="CodeMirror"
          options={{ theme: "glyph", ...options }}
          {...rest}
        />
      </>
    );
  }
);
