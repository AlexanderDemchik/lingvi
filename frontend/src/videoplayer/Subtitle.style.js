export const styles = (theme) => ({
  subtitle: {
    color : "#fff",
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  text: {
    paddingLeft: 20,
    paddingRight: 20,

    [theme.breakpoints.up('sm')]: {
      fontSize: 20,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 25,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 15
    },
    "&::selection": {
      background: theme.palette.primary.main
    },
  },
  subSeq: {
    display: "flex"
  },
});
