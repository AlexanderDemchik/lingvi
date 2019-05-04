export const style = (theme) => ({
  wrapper: {
    backgroundColor: "#fff",
    borderRadius: 5,
    width: "100%",
    boxShadow: theme.shadows[1]
  },
  loaderWrapper: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 0",
    color: theme.palette.secondary.main
  }
});