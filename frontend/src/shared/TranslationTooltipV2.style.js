export const style = (theme) => ({
  loader: {
    color: theme.palette.secondary.main,
    display: "flex",
    alignSelf: "center",
  },
  header: {
    padding: '5px 5px 5px 5px'
  },
  translation: {
    padding: "7px 10px",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
      cursor: "pointer"
    }
  },
  inDictTranslation: {
    backgroundColor: theme.palette.success.main,
    color: "#fff",
    "$:hover": {
      backgroundColor: theme.palette.success.main,
    }
  },
  word: {
    fontSize: "1rem",
    userSelect: "none",
    textOverflow: "ellipsis",
    minWidth: 0,
    overflow: "hidden",
    "white-space": "nowrap"
  },
  body: {
    minWidth: 200,
  },
});