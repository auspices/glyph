import React, { useEffect } from "react";
import { Code, CodeProps } from "../Code";

const EXAMPLE_QUERY = `{
  example: object {
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
        }
      }
    }
  }
}
`;

export type EditorProps = Omit<CodeProps, "onUpdate"> & {
  onUpdate(value: string): void;
};

export const Editor: React.FC<EditorProps> = ({ onUpdate, ...rest }) => {
  useEffect(() => {
    onUpdate(EXAMPLE_QUERY);
  }, [onUpdate]);

  return (
    <Code
      value={EXAMPLE_QUERY}
      options={{
        mode: "graphql",
        lineNumbers: true,
      }}
      onUpdate={(editor) => onUpdate(editor.getValue())}
      {...rest}
    />
  );
};
