export const style = (theme) => ({
  header: {
    minHeight: 30,
    width: "100%",
    color: "#000"
    // borderBottom: `1px solid ${theme.palette.primary.main}`
  },
  icon: {
    height: "100%",
    width: "1rem",
    cursor: "pointer",
    fill: theme.palette.grey[700],
    transition: "linear 0.2s fill",
  },
  wrapper: {
    backgroundColor: theme.palette.background.paper,
    // backgroundColor: "rgba(28,28,28,0.99)",
    borderRadius: 5,
    userSelect: "none",
    padding: 17,
  },
  word: {
    color: "#000",
    fontSize: "1rem",
    userSelect: "none",
    textOverflow: "ellipsis",
    minWidth: 0,
    overflow: "hidden",
    "white-space": "nowrap"
  },
  loader: {
    color: theme.palette.secondary.main,
    display: "flex",
    alignSelf: "center",
  },
  translationItem: {
    textAlign: "left",
    padding: "5px 10px",
    fontSize: "0.9rem",
    cursor: "pointer",
    "&:last-child": {
      borderRadius: "0px 0px 5px 5px"
    },
    "&:hover": {
      backgroundColor: "rgba(35,35,35,0.99)"
    }
  },
  more: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  translationWrapper: {
  },
  translations: {
    fontWeight: 100,
    fontSize: "0.9rem",
    lineHeight: "0.8rem",
    textAlign: "left",
    color: "#000"
  },
  partOfSpeech: {
    fontWeight: 100,
    fontSize: "0.7rem",
    color: "#000",
  },
  defaultTranslation: {
    fontWeight: 500,
    color: theme.palette.grey[700],
    fontSize: "1rem",
    display: "flex",
    textAlign: "left",
  },
  dictionaryIcon: {

  },
  inUserDict: {
    color: theme.palette.success.main,
    fill: theme.palette.success.main
  }
});