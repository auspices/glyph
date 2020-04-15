import React, { useEffect } from "react";
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
  onUpdate(value: string): void;
};

export const Editor: React.FC<EditorProps> = ({ name, onUpdate, ...rest }) => {
  useEffect(() => {
    onUpdate(generateQuery(name));
  }, [name, onUpdate]);

  return (
    <Code
      value={generateQuery(name)}
      options={{
        mode: "graphql",
        lineNumbers: true,
      }}
      onUpdate={(editor) => onUpdate(editor.getValue())}
      {...rest}
    />
  );
};
