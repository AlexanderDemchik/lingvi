import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    secondary: {
      // light: will be calculated from palette.primary.main,
      main: "#2196f3",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#20232a",
      light: "rgb(55, 57, 64)"
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    background: {
      dark: "#20232a",
    },
    success: {
      main: "#379c4d"
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

//#2196f3