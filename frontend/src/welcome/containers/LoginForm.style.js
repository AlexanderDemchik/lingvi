import { fade } from '@material-ui/core/styles/colorManipulator';

export const style = (theme) => ({
  dialog: {
    maxWidth: 300,
    margin: "48px auto !important"
  },
  bottomIntend: {
    marginBottom: 8
  },
  or: {
    display: "flex",
    color: "#999",
    marginLeft: 10,
    marginRight: 10
  },
  orWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "no-wrap"
  },
  orBefore: {
    width: "100%",
    display: "flex",
    height: 1,
    backgroundColor: "#999"
  },
  orAfter: {
    width: "100%",
    display: "flex",
    height: 1,
    backgroundColor: "#999"
  },
  closeIcon: {
    color: theme.palette.secondary.main,
    fontSize: 15,
    position: "absolute",
    right: 0,
    top: 0,
    cursor: "pointer",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
    borderLeft: `1px solid ${theme.palette.secondary.main}`,
    borderBottomLeftRadius: 5,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "#fff"
    }
  },
  link: {
    color: theme.palette.secondary.main,
    cursor: "pointer",
    textAlign: "center",
    "&:hover": {
      color: theme.palette.secondary.light
    }
  },
  errorBlock: {
    backgroundColor: fade(theme.palette.error.main, 0.9),
    display: "flex",
    marginBottom: 10,
    padding: 10,
    color: theme.palette.secondary.contrastText,
    fontSize: 12,
    borderRadius: 4
  }
});