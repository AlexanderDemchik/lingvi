export const styles = theme => ({
  hidden: {
    opacity: 0,
    visibility: "hidden",
  },
  popper: {
    fontSize: 15,
    position: "absolute",
    left: "calc(50% - 150px)",
    minWidth: "300px",
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
    // "&::selection": {
    //   background: theme.palette.primary.main,
    //   borderRadius: 5
    // }
  },
  active: {
    background: theme.palette.secondary.main,
    borderRadius: 2
  }
});