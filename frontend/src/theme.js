import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    secondary: {
      // light: will be calculated from palette.primary.main,
      main: "#ec174f",
      dark: "#c4002d"
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#ec174f",
      dark: "#c4002d"
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    }
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    // MuiButtonBase: {
    //   root: {
    //     "&:hover:not($disabled):not($error):not($focused)": {
    //       backgroundColor: "#ef3868"
    //     },
    //   }
    // }
  }
});
