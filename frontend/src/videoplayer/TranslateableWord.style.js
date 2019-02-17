export const styles = theme => ({
  hidden: {
    opacity: 0,
    visibility: "hidden",
  },
  popper: {
    fontSize: 15,
    position: "absolute",
    left: "calc(50% - 100px)",
    width: "200px",
    paddingBottom: 10
  },
  popperBottom: {
    marginTop: 10,
    top: "100%"
  },
  popperTop: {
    bottom: "100%",
  },
  right: {
    right: 0,
    left: "unset"
  },
  left: {
    left: 0
  },
  wordWrapper: {
    position: "relative",
  },
  word: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main
    },
    "&::selection": {
      background: theme.palette.primary.main
    },
  }
});