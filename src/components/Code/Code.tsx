import "codemirror/lib/codemirror.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/lint.css";
import "codemirror-graphql/hint";
import "codemirror-graphql/lint";
import "codemirror-graphql/info";
import "codemirror-graphql/jump";
import "codemirror-graphql/mode";

import React from "react";
import { createGlobalStyle } from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import {
  UnControlled as CodeMirror,
  IUnControlledCodeMirror,
} from "react-codemirror2";
import { THEME } from "./theme";

const CodeStyles = createGlobalStyle`
  .CodeMirror {
    width: 100%;
    height: 100%;
    overflow: auto;
    font-family: ${themeGet("fonts.mono")};
    font-size: ${themeGet("fontSizes.1")};
    ${THEME}
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
