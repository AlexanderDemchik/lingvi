export const style = (theme) => ({
  first: {
    backgroundColor: "#9BB1FF",
    height: "100vh",
    minHeight: "300px",
    backgroundImage: 'linear-gradient(\n' +
    '          rgba(0, 0, 0, 0), \n' +
    '          rgba(0, 0, 0, 0.2)\n' +
    '        ), url(' + require("../assets/Flat-Mountains.svg") + ')',
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    display: "flex",
    alignContent: "center",
    flexDirection: "column",
    justifyContent: "center"
  },
  tagWrapper: {
    paddingTop: "60px",
    display: "flex",
    alignContent: "center",
    flexDirection: "column",
    justifyContent: "center",
    flexGrow: 1
  },
  title: {
    fontWeight: 700,
    display: "flex",
    alignSelf: "center",
    fontSize: "2.5rem",
    textShadow: "2px 2px 4px #313131",
    color: "#fff",
    textAlign: "center",
    [theme.breakpoints.down('xs')]: {
      fontSize: "1.5rem"
    }
  },
  subtitle: {
    textAlign: "center",
    fontWeight: 300,
    display: "flex",
    alignSelf: "center",
    fontSize: "1.5rem",
    textShadow: "2px 2px 4px #313131",
    color: "#fff",
    [theme.breakpoints.down('xs')]: {
      fontSize: "1rem"
    }
  },
  howItWork: {
    textAlign: "center",
    fontWeight: 200,
    display: "flex",
    alignSelf: "center",
    fontSize: "1rem",
    flexDirection: "column",
    textShadow: "2px 2px 4px #313131",
    alignItems: "center",
    color: "rgba(255,255,255,0.7)",
    padding: 30,

  },
});