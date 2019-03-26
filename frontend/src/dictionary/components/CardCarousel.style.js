export const style = (theme) => ({
  modalCover: {
    position: "fixed",
    "background": "rgba(0,0,0, 0.5)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    transform: "translateZ(0)",
    visibility: "visible",
    opacity: 1,
    transition: "opacity .2s linear, visibility .2s linear"
  },
  modalContainer: {
    overflowX: "hidden",
    overflowY: "auto",
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justify: "center",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    textAlign: "center",
    transition: "visibility .2s linear",
  },
  containerHidden: {
    visibility: "hidden"
  },
  coverHidden: {
    opacity: 0,
    visibility: "hidden"
  },
  modal: {
    position: "relative",
    transform: "scale(1)",
    width: "400px",
    margin: "auto",
    display: "inline-block",
    verticalAlign: "middle",
    transition: "transform .2s linear",

  },
  modalHidden: {
    transform: "scale(0)",
  },
  bodyOverflowHidden: {
    overflow: "hidden"
  },
  arrowLeft: {
    cursor: "pointer",
    fill: theme.palette.background.dark,
    position: "absolute",
    left: "-100px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2000
  },
  arrowRight: {
    cursor: "pointer",
    fill: theme.palette.background.dark,
    position: "absolute",
    right: "-100px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2000
  },
  leaveLeft: {
    transform: "translateX(-100%)",
    opacity: 0
  },
  card: {
    position: "relative",
    backgroundColor: theme.palette.background.dark,
    boxShadow: "0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)",
    borderRadius: 10,
    opacity: 1,
    width: "100%",
    height: "100%",
    transition: "all .2s linear",
  },
  positionRight: {
    position: "absolute",
    top: 0,
    transform: "translateX(100%)",
    opacity: 0,
    visibility: "hidden"
  },
  positionLeft: {
    top: 0,
    position: "absolute",
    transform: "translateX(-100%)",
    opacity: 0,
    visibility: "hidden"
  },
  appearRight: {
    opacity: 1,
    transform: "translateX(0)"
  },
  disabledArrow: {
    fill: "rgba(150,150,150,0.5)",
    cursor: "not-allowed"
  }
});