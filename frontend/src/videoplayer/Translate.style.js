export const style = (theme) => ({
  header: {
    minHeight: 30
  },
  icon: {
    height: "100%",
    width: "1rem",
    cursor: "pointer",
    fill: theme.palette.primary.contrastText
  },
  wrapper: {
    padding: 10,
    backgroundColor: "rgba(28,28,28,0.99)",
    borderRadius: 5,
    userSelect: "none"
  },
  word: {
    color: theme.palette.primary.contrastText,
    fontSize: "1rem",
    userSelect: "none"
  },
  loader: {
    color: theme.palette.primary.main,
    display: "flex",
    alignSelf: "center",
    padding: 10
  }
});