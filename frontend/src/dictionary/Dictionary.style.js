import {containerStyle} from "../shared/styles/containerStyle";

export const style = (theme) => ({
  wrapper: {
    width: "100%",
    padding: 0,
    [theme.breakpoints.up("sm")]: {
      padding: "50px 0",
    },
    [theme.breakpoints.up("md")]: {
      flexWrap: "nowrap",
    },
  },
  dictionary: {
    flexGrow: 1,
  },
  meta: {
    [theme.breakpoints.down("sm")]: {
      paddingRight: 0,
      flexGrow: 1,
      flexBasis: "100%"
    },
    flexGrow: 0,
    paddingRight: 40,
    minWidth: 280
  },
  select: {
    margin: "20px 0"
  },
  langSelect: {
    marginBottom: 10,
    flexGrow: 1,
  },

  container: containerStyle
});