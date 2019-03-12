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
    textAlign: "center",
    lineHeight: "1.5rem",
    [theme.breakpoints.up('sm')]: {
      fontSize: 20,
      paddingTop: 7,
      paddingBottom: 7,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 25,
      paddingTop: 9,
      paddingBottom: 9
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 13,
      paddingTop: 2,
      paddingBottom: 2,
      lineHeight: "1.2rem",
    },
    // "&::selection": {
    //   background: theme.palette.primary.main
    // },
  },
  subSeq: {
    display: "flex"
  },
});
