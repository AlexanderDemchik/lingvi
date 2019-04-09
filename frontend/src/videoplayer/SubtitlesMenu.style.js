export const style = (theme) => ({
  wrapper: {
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
});