import poster from "../assets/gots1s1.jpg";
import {fade} from "@material-ui/core/styles/colorManipulator";

export const style = (theme) => ({
  wrapper: {
    position: "relative",
    paddingBottom: "56.25%",
    overflow: "hidden",
    margin: "0 auto",
    width: "100%",
    height: 0,
    "& video": {
      userSelect: "none"
    }
  },
  poster: {
    width: "100%",
    height: "100%",
    backgroundPosition: "center",
    position: "absolute",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "inset 0 0 300px 2px #282a2d",
  },
  posterPlayBtn: {
    fill: theme.palette.secondary.main,
    display: "flex",
    cursor: "pointer",
    transition: "fill .15s linear",
    "&:hover": {
      fill: fade(theme.palette.secondary.main, 0.5)
    }
  },
  loaderOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.secondary.main
  },
  hidden: {
    visibility: "hidden",
    maxHeight: 0,
    opacity: 0
  },
  controls: {
    maxHeight: 500,
    transition: "visibility .2s ease-in-out, opacity .2s ease-in-out, max-height 0.2s cubic-bezier(0, 1, 0, 1);",
  },
  cursorHidden: {
    cursor: "none"
  },
  bottomSubWrapper: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    transition: "all .2s ease-in-out"
  },
  bottomSubMargin: {
    [theme.breakpoints.down('sm')]: {
      bottom: 45
    },
    [theme.breakpoints.up('sm')]: {
      bottom: 50,
    },
    [theme.breakpoints.up('md')]: {
      bottom: 55,
    },
  },
});