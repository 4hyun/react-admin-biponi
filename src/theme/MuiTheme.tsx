import { CssBaseline, ThemeProvider } from "@mui/material";
import { FC, ReactNode } from "react";
import { bazarTheme } from "./theme";

// ===========================================
type MuiThemeProps = { children: ReactNode };
// ===========================================

const MuiTheme: FC<MuiThemeProps> = ({ children }) => {
  return (
    <ThemeProvider theme={bazarTheme()}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiTheme;
