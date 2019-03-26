export const style = (theme) => ({
  link: {
    position: "relative",
    padding: "0 23px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#fff",
    width: "fit-content",
    transition: "all .2s linear",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: "#fff"
    }
  },
  line: {
    height: "3px",
    backgroundColor: theme.palette.secondary.main,
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0
  },
  active: {
    color: theme.palette.secondary.main
  }
});