import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
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

export const Code: React.FC<CodeProps> = ({ options = {}, ...rest }) => {
  return (
    <>
      <CodeStyles />

      <CodeMirror
        className="CodeMirror"
        options={{
          theme: "glyph",
          ...options,
        }}
        {...rest}
      />
    </>
  );
};
