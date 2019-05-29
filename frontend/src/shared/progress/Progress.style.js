export default (theme) => ({
  root: {
    height: 20,
    width: "100%",
    position: "relative",
    background: theme.palette.grey[200],
    borderRadius: 5,
    boxShadow: "inset 0 -1px 1px rgba(255,255,255,0.3)",
    overflow: "hidden",
    "&>span": {
      display: "block",
      height: "100%",
      backgroundColor: theme.palette.secondary.main,
      boxShadow: "inset 0 2px 9px  rgba(255,255,255,0.3), inset 0 -2px 6px rgba(0,0,0,0.4)",
      position: "relative",
      overflow: "hidden",
      transition: "width .5s linear"
    },
  },
  stripped: {
    backgroundImage: "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)",
    animation: "progress-bar-stripes 1s linear infinite",
    backgroundSize: "1rem 1rem"
  }
});