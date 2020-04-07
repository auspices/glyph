import React, { useState, useEffect, useCallback } from "react";
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
  Button,
  Box,
} from "@auspices/eos";
import { Indicator } from "./components/Indicator";
import { Editor } from "./components/Editor";
import { Code } from "./components/Code";

const ENDPOINT = "https://atlas.auspic.es";

enum Mode {
  Pending,
  Loading,
  Resting,
  Error,
}

const App = () => {
  const { theme, toggleScheme, scheme } = useThemer();

  const [mode, setMode] = useState(Mode.Pending);
  const [path, setPath] = useState(window.location.pathname);
  const [value, setValue] = useState("");
  const [output, setOutput] = useState<Record<string, any>>({ loading: true });

  const endpoint = [ENDPOINT, path].join("");

  const execute = useCallback(() => {
    setMode(Mode.Loading);

    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ query: value }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((parsed) => {
        setOutput(parsed);

        if ("errors" in parsed || "error" in parsed) {
          setMode(Mode.Error);
          return;
        }

        setMode(Mode.Resting);
      })
      .catch((err) => {
        setOutput({ error: err.message });

        setMode(Mode.Error);
      });
  }, [endpoint, value]);

  const handleUrlChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPath(event.currentTarget.value.split(ENDPOINT)[1]);
    },
    []
  );

  const handleClick = useCallback(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    window.history.replaceState({}, "", path);
  }, [path]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <Stack minHeight="100vh" p={[0, 0, 2, 4]}>
        <Stack direction="horizontal">
          <Dropdown label="options" zIndex={100}>
            {({ handleClose }) => (
              <PaneOption
                onClick={() => {
                  toggleScheme();
                  handleClose();
                }}
              >
                toggle {{ dark: "light", light: "dark" }[scheme]} mode
              </PaneOption>
            )}
          </Dropdown>

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

          <Button onClick={handleClick}>execute</Button>

          {/* TODO: Copy-to-clipboard executable JS to make call with query */}
          <Button>copy</Button>
        </Stack>

        <Stack direction={["vertical", "vertical", "horizontal"]} flex="1">
          <Pill px={0} py={0} flex="2" position="relative">
            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
            >
              <Editor onUpdate={setValue} />
            </Box>
          </Pill>

          <Pill px={0} py={0} flex="3" position="relative">
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

export default () => {
  return (
    <ThemerProvider>
      <App />
    </ThemerProvider>
  );
};
