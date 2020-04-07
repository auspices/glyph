import styled, { keyframes, css } from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Box } from "@auspices/eos";

const pulse = keyframes`
  0% {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.5
  }
`;

enum Mode {
  Pending,
  Loading,
  Resting,
  Error,
}

export const Indicator = styled(Box)<{ mode: Mode }>`
  width: ${themeGet("space.4")};
  height: ${themeGet("space.4")};
  border-radius: 50%;

  ${({ mode, ...rest }) =>
    ({
      [Mode.Pending]: css`
        background-color: ${themeGet("colors.hint")(rest)};
      `,
      [Mode.Loading]: css`
        background-color: ${themeGet("colors.hint")(rest)};
        animation: ${pulse} 4s ease infinite;
      `,
      [Mode.Resting]: css`
        background-color: ${themeGet("colors.accent")(rest)};
        animation: ${pulse} 4s ease infinite;
      `,
      [Mode.Error]: css`
        background-color: ${themeGet("colors.danger")(rest)};
      `,
    }[mode])}
`;
