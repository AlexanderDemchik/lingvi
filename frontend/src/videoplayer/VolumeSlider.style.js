import {fade} from "@material-ui/core/styles/colorManipulator";

export const styles = (theme) => ({
  wrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: "15px",
    cursor: "pointer",
    userSelect: "none",
    position: "relative"
  },
  slider: {
    width: "100%",
    backgroundColor: fade(theme.palette.grey["300"], 0.1),
    height: "4px",
    display: "flex",
    alignItems: "center",
    position: "relative"
  },
  filled: {
    left: 0,
    position: "absolute",
    height: "100%",
    width: 0,
    backgroundColor: theme.palette.primary.main
  },
  thumb: {
    opacity: 1,
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    position: "absolute",
    transition: "visibility .2s ease-in-out, opacity .2s ease-in-out",
    backgroundColor: theme.palette.primary.main
  },
  hidden: {
    visibility: "hidden",
    opacity: 0,
  },
});