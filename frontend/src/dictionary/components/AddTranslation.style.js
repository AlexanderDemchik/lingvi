export const style = (theme) => ({
  addTranslation: {
    color: "#995B36",
    fontSize: "0.8rem",
    borderBottom: "1px dotted #995B36",
    cursor: "pointer",
  },
  hidden: {
    visibility: "hidden"
  },
  popper: {
    margin: 10,
    zIndex: theme.zIndex.modal
  },
  popperBody: {
    backgroundColor: "#fff"
  },
  translation: {
    padding: 10,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    }
  },
  inUserDict: {
    backgroundColor: theme.palette.success.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.success.main
    }
  },
});