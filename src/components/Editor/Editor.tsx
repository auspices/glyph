import { GraphQLSchema } from "graphql";
import React, { useEffect, useRef } from "react";
import { Code, CodeProps } from "../Code";

const generateQuery = (name: string) => `{
  ${name}: object {
    ... on Collection {
      id
      name
      contents {
        id
        entity {
          kind: __typename
          ... on Image {
            id
            name
            resized(width: 500, height: 500) {
              width
              height
              urls {
                _1x
                _2x
              }
            }
          }
          ... on Text {
            id
            name
            body
          }
          ... on Link {
            id
            name
            url
          }
          ... on Collection {
            id
            name
            counts {
              contents
            }
          }
        }
      }
    }
  }
}
`;

export type EditorProps = Omit<CodeProps, "onUpdate"> & {
  name: string;
  schema?: GraphQLSchema;
  onUpdate(value: string): void;
};

export const Editor: React.FC<EditorProps> = ({
  name,
  schema,
  onUpdate,
  ...rest
}) => {
  const ref = useRef(null);
  const instance = useRef<any | null>(null);

  useEffect(() => {
    onUpdate(generateQuery(name));
  }, [name, onUpdate]);

  return (
    <Code
      ref={ref}
      value={generateQuery(name)}
      options={{
        mode: "graphql",
        viewportMargin: Infinity,
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        showCursorWhenSelecting: true,
        keyMap: "sublime",
        tabSize: 2,
        lint: {
          schema,
        },
        hintOptions: {
          schema,
          closeOnUnfocus: false,
          completeSingle: false,
        },
        info: { schema },
        jump: { schema },
      }}
      onUpdate={(editor) => onUpdate(editor.getValue())}
      onKeyUp={(editor, event) => {
        const { keyCode, shiftKey } = event;
        if (
          (keyCode >= 65 && keyCode <= 90) || // letters
          (!shiftKey && keyCode >= 48 && keyCode <= 57) || // numbers
          (shiftKey && keyCode === 189) || // underscore
          (shiftKey && keyCode === 50) || // @
          (shiftKey && keyCode === 57) // (
        ) {
          editor.execCommand("autocomplete");
        }
      }}
      editorDidMount={(editor) => {
        instance.current = editor;
      }}
      {...rest}
    />
  );
};
