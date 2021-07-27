import {
  getIntrospectionQuery,
  buildClientSchema,
  GraphQLSchema,
} from "graphql";
import React, { useState, useEffect, useCallback } from "react";
import useClipboard from "react-use-clipboard";
import { ThemeProvider } from "styled-components";
import {
  Pill,
  Input,
  Stack,
  GlobalStyles,
  ThemerProvider,
  useThemer,
  PaneOption,
  Dropdown,
  Box,
} from "@auspices/eos";
import { Indicator } from "./components/Indicator";
import { Editor } from "./components/Editor";
import { Code } from "./components/Code";
import { camelize } from "./lib/camelize";
import { request } from "./lib/request";

const ENDPOINT = "https://atlas.auspic.es";
const Z_DROPDOWN = 100;

enum Mode {
  Pending,
  Loading,
  Resting,
  Error,
}

const INITIAL_QUERY = `{
  object {
    ... on Collection {
      title
    }
  }
}`;

const App = () => {
  const { theme } = useThemer();

  const [name, setName] = useState("example");
  const [mode, setMode] = useState(Mode.Pending);
  const [path, setPath] = useState(window.location.pathname);
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState<Record<string, any>>({ loading: true });
  const [schema, setSchema] = useState<GraphQLSchema | undefined>();

  const endpoint = [ENDPOINT, path].join("");
  const [isEndpointCopied, handleEndpointCopy] = useClipboard(endpoint, {
    successDuration: 1000,
  });

  const execute = useCallback(() => {
    if (query === "") return;

    setMode(Mode.Loading);

    request({ url: endpoint, query })
      .then((res) => {
        setOutput(res);

        if ("errors" in res || "error" in res) {
          setMode(Mode.Error);
          return;
        }

        setMode(Mode.Resting);
      })
      .catch((err) => {
        setOutput({ error: err.message });

        setMode(Mode.Error);
      });
  }, [endpoint, query]);

  const handleUrlChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPath(event.currentTarget.value.split(ENDPOINT)[1]);
    },
    []
  );

  useEffect(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    window.history.replaceState({}, "", path);
  }, [path]);

  useEffect(() => {
    request({ url: endpoint, query: INITIAL_QUERY }).then(
      ({
        data: {
          object: { title },
        },
      }) => {
        setName(camelize(title));
      }
    );
  }, [endpoint]);

  useEffect(() => {
    request({
      url: endpoint,
      query: getIntrospectionQuery(),
    }).then(({ data }) => setSchema(buildClientSchema(data)));
  }, [endpoint]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <Stack minHeight="100vh" p={[0, 0, 2, 4]}>
        <Stack direction={["vertical", "vertical", "horizontal"]}>
          <Box flex="1" display="flex" position="relative">
            <Indicator
              position="absolute"
              top="50%"
              left={7}
              style={{ transform: "translate(-50%, -50%)" }}
              mode={mode}
            />

            <Input
              px={0}
              pl="3rem"
              pr={6}
              flex="1"
              defaultValue={endpoint}
              onChange={handleUrlChange}
            />
          </Box>

          <Stack direction="horizontal">
            <Dropdown flex="1" label="copy" zIndex={Z_DROPDOWN}>
              {({ handleClose }) => (
                <PaneOption
                  onClick={() => {
                    handleEndpointCopy();
                    setTimeout(() => handleClose(), 500);
                  }}
                >
                  {isEndpointCopied ? "copied" : "endpoint"}
                </PaneOption>
              )}
            </Dropdown>
          </Stack>
        </Stack>

        <Stack direction={["vertical", "vertical", "horizontal"]} flex="1">
          <Pill px={0} py={0} flex={2} position="relative">
            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
            >
              <Editor name={name} schema={schema} onUpdate={setQuery} />
            </Box>
          </Pill>

          <Pill px={0} py={0} flex={3} position="relative">
            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
            >
              <Code
                value={JSON.stringify(output, null, 2)}
                options={{ mode: "application/json" }}
              />
            </Box>
          </Pill>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

const AppWithTheme = () => {
  return (
    <ThemerProvider>
      <App />
    </ThemerProvider>
  );
};

export default AppWithTheme;
