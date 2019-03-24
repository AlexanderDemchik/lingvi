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
      backgroundColor: "rgb(55, 57, 64)",
      color: "#fff"
    }
  },
  line: {
    height: "3px",
    backgroundColor: theme.palette.primary.main,
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0
  },
  active: {
    color: theme.palette.primary.main
  }
});