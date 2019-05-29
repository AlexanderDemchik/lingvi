import {containerStyle} from "../shared/styles/containerStyle";

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
    fill: "rgba(255,255,255,0.7)",
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
  promo: {
    height: 500,
    backgroundImage: "linear-gradient(to top, #111423 0%, #05061b 40%, #000 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
    "&:after": {
      content: "''",
      backgroundImage: 'url("/assets/welcome-background.jpg")',
      backgroundSize: "550px",
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      height: "100%",
      width: "100%",
      display: "block",
      opacity: 0.6
    }
  },
  promoText: {
    zIndex: 1000,
    textAlign: "center"
  },
  promoTitle: {
    color: "#fff",
    fontSize: "2.7rem",
    lineHeight: 1,
    fontWeight: 700,
    textShadow: "2px 2px 4px #313131"
  },
  promoSubTitle: {
    color: "#fff",
    fontSize: "1.4rem",
    textShadow: "2px 2px 4px #313131"
  },
  feature: {
    paddingTop: 100,
    paddingBottom: 100,
    ...containerStyle
  },
  featureImg: {
    padding: 20
  },
  featureDesc: {
    padding: 20,
    fontSize: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  featureTitle: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.4rem",
    }
  },
  featureText: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    }
  }
});