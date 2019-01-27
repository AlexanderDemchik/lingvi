export const style = {
  first: {
    backgroundColor: "#9BB1FF",
    height: "100vh",
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
    textAlign: "center"
  },
  subtitle: {
    textAlign: "center",
    fontWeight: 300,
    display: "flex",
    alignSelf: "center",
    fontSize: "1.5rem",
    textShadow: "2px 2px 4px #313131",
    color: "#fff"
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
};