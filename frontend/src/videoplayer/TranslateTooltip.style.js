export const style = (theme) => ({
  header: {
    minHeight: 30,
    width: "100%",
    color: "#DAE8EF"
    // borderBottom: `1px solid ${theme.palette.primary.main}`
  },
  icon: {
    height: "100%",
    width: "1rem",
    cursor: "pointer",
    fill: "#DAE8EF",
    transition: "linear 0.2s fill",
  },
  wrapper: {
    backgroundColor: "rgba(28,28,28,0.99)",
    borderRadius: 5,
    userSelect: "none",
    padding: 17,
  },
  word: {
    color: "#DAE8EF",
    fontSize: "1rem",
    userSelect: "none",
    textOverflow: "ellipsis",
    minWidth: 0,
    overflow: "hidden",
    "white-space": "nowrap"
  },
  loader: {
    color: theme.palette.primary.main,
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
    color: "#DAE8EF"
  },
  partOfSpeech: {
    fontWeight: 100,
    fontSize: "0.7rem",
    color: "#DAE8EF",
  },
  defaultTranslation: {
    fontWeight: 500,
    color: "#fff",
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