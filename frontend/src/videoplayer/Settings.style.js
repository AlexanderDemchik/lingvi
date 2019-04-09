export const style = (theme) => ({
  wrapper: {
    transition: "transform 0.5s linear"
  },
  menu: {
    position: "absolute",
    backgroundColor: theme.palette.primary.main,
    transition: "all .2s linear",
    opacity: 1,
    bottom: "100%"
  },
  hidden: {
    visibility: "hidden",
    opacity: 0
  },
  iconOpen: {
    transform: "rotate(30deg)"
  },
  icon: {
    transition: "transform 0.2s linear",
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
  qualityItem: {
    userSelect: "none",
    padding: "5px 10px",
    color: theme.palette.primary.contrastText,
    fontSize: "0.8rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    }
  }
});