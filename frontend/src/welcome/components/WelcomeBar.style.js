const style = (theme) => ({
  wrapper: {
    position: "absolute",
    width: "100%",
    minHeight: "60px",
    paddingLeft: "10px",
    paddingRight: "10px",
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[6],
    zIndex: 1000
  },
  logo: {
    padding: 5,
    paddingBottom: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#fff"
  },
});

export default style;