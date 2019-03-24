const style = (theme) => ({
  wrapper: {
    position: "absolute",
    width: "100%",
    minHeight: "60px",
    paddingLeft: "10px",
    paddingRight: "10px",
    // backgroundColor: theme.palette.background.dark,
    // boxShadow: theme.shadows[3]
  },
  logo: {
    padding: 5,
    paddingBottom: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
    color: theme.palette.secondary.main
  },
});

export default style;