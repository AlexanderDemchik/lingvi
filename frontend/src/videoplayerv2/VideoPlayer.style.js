import poster from "../assets/gots1s1.jpg";
import {fade} from "@material-ui/core/styles/colorManipulator";

export const style = (theme) => ({
  wrapper: {
    position: "relative",
    paddingBottom: "56.25%",
    overflow: "hidden",
    margin: "0 auto",
    width: "100%",
    height: 0
  },
  poster: {
    width: "100%",
    height: "100%",
    backgroundPosition: "center",
    backgroundImage: `url(${poster})`,
    position: "absolute",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "inset 0 0 300px 2px #282a2d",
  },
  posterPlayBtn: {
    fill: theme.palette.primary.main,
    display: "flex",
    cursor: "pointer",
    transition: "fill .15s linear",
    "&:hover": {
      fill: fade(theme.palette.primary.main, 0.5)
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
    color: theme.palette.primary.main
  },
  hidden: {
    visibility: "hidden",
    opacity: 0
  },
  controls: {
    transition: "visibility .2s ease-in-out, opacity .2s ease-in-out",
  },
  cursorHidden: {
    cursor: "none"
  },
});