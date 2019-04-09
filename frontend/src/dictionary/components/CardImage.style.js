export const styles = (theme) => ({
  wrapper: {
    position: "relative",
    cursor: "pointer",
    width: "100%",
    height: "100%"
  },
  others: {
    position: "absolute",
    left: "100%",
    top: 0
  },
  smallImageWrapper: {
    minWidth: "70px",
    minHeight: "70px",
    maxWidth: "70px",
    maxHeight: "70px",
    cursor: "pointer",
    padding: 3
  },
  smallImage: {
    "&:hover": {
      transform: "scale(1.4)",
      transition: "transform .2s linear"
    },
    width: "100%",
    height: "100%",
  },
  result: {
    padding: 10,
    display: "flex",
    overflow: "visible",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  addBtn: {
    height: "50px",
    width: "50px",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "100%",
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    }
  },
  addBtnWrapper: {
    width: "70px",
    height: "70px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  addIcon: {
    height: "100%",
    width: "100%",
    fill: theme.palette.secondary.contrastText
  },
  popperPaper: {
    maxWidth: 400,
    maxHeight: 300,
  },
  popperRoot: {
    zIndex: theme.zIndex.modal
  }
});