export const style = (theme) => ({
  controlsWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 3
  },
  controls: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
    backgroundImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
  },
  volumeSlider: {
    width: 70
  },
  icon: {
    verticalAlign: "middle",
    cursor: "pointer",
    fill: "#fff",
    width: "1.8rem",
    [theme.breakpoints.down('xs')]: {
      width: "1.4rem",
    },
    "&:hover": {
      filter: "drop-shadow( 0 0 6px #fff)"
    }
  },
  time: {
    color: "#fff",
    fontSize: "0.7rem",
    userSelect: "none"
  }
});