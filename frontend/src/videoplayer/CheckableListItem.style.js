export const style = (theme) => ({
  wrapper: {
    width: "100%",
    padding: "7px 9px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    }
  },
  tick: {
    minWidth: "1.1rem",
    minHeight: "1.1rem"
  },
  tickIcon: {
    width: "1rem",
    height: "1rem",
    fill: "#DAE8EF",
    color: "#DAE8EF",
    display: "flex",
    alignItems: "center"
  },
  label: {
    fontSize: "0.7rem",
    color: "#DAE8EF"
  }
});