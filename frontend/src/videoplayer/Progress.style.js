import {fade} from "@material-ui/core/styles/colorManipulator";

export const styles = (theme) => ({
  wrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: "15px",
    paddingRight: "1px",
    cursor: "pointer",
    userSelect: "none",
    position: "relative"
  },
  slider: {
    width: "100%",
    backgroundColor: fade(theme.palette.grey["300"], 0.1),
    height: "5px",
    display: "flex",
    alignItems: "center",
    position: "relative"
  },
  filled: {
    left: 0,
    position: "absolute",
    height: "100%",
    width: 0,
    zIndex: 2,
    backgroundColor: theme.palette.primary.main
  },
  thumb: {
    userSelect: "none",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    position: "absolute",
    zIndex: 3,
    transition: "visibility .2s ease-in-out, opacity .2s ease-in-out",
    opacity: 1,
    backgroundColor: theme.palette.primary.main
  },
  tooltip: {
    opacity: 1,
    visibility: "visible",
    transition: "visibility .2s ease-in-out, opacity .2s ease-in-out",
    borderRadius: 3,
    width: 150,
    height: 85,
    transformOrigin: "bottom",
    position: "absolute",
    bottom: "150%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: "hsla(0, 0%, 6.7%, .8)",
    color: theme.palette.primary.contrastText,
    // "&:after": {
    //   position: "absolute",
    //   content: "' '",
    //   top: "100%",
    //   left: "50%",
    //   height: 0,
    //   width: 0,
    //   border: "5px solid transparent",
    //   // borderTopColor: theme.palette.primary.main,
    //   borderTopColor: "hsla(0, 0%, 6.7%, .8)",
    //   marginLeft: -5
    // }
  },
  tooltipTime: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "hsla(0, 0%, 6.7%, .8)",
    fontSize: 11,
    minWidth: 30,
    userSelect: "none",
    height: 20,
    justifyContent: "center"
  },
  hidden: {
    visibility: "hidden",
    opacity: 0,
  },
  bufferFilled: {
    left: 0,
    zIndex: 1,
    position: "absolute",
    height: "100%",
    width: 0,
    transition: "width .2s linear",
    backgroundColor: fade(theme.palette.primary.main, 0.3)
  }
});