export const style = (theme) => ({
  dialog: {
    maxWidth: 300,
    margin: "48px auto !important"
  },
  closeIcon: {
    color: theme.palette.secondary.main,
    fontSize: 15,
    position: "absolute",
    right: 0,
    top: 0,
    cursor: "pointer",
    padding: "0 5px",
    minWidth: "2em",
    minHeight: "1.6em",
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
    borderLeft: `1px solid ${theme.palette.secondary.main}`,
    borderBottomLeftRadius: 5,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "#fff"
    }
  },
});