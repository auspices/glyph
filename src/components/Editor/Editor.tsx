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

  useEffect(() => {
    onUpdate(generateQuery(name));
  }, [name, onUpdate]);

  // console.log((ref.current as any)?.ref);

  return (
    <Code
      ref={ref}
      value={generateQuery(name)}
      options={{
        mode: "graphql",
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        showCursorWhenSelecting: true,
        tabSize: 2,
        lint: {
          schema,
        },
        hintOptions: {
          schema,
          closeOnUnfocus: false,
          completeSingle: false,
        },
        info: {
          schema,
          renderDescription: (text: any) => console.log(text),
        },
        jump: {
          schema,
        },
      }}
      onUpdate={(editor) => onUpdate(editor.getValue())}
      {...rest}
    />
  );
};
