import React from "react";
import { ThemeProvider } from "styled-components";
import { Box, GlobalStyles, ThemerProvider, useThemer } from "@auspices/eos";

const App = () => {
  const { theme } = useThemer();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <Box>hey</Box>
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
