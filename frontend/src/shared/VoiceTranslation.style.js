export const style = (theme) => ({
  icon: {
    display: "flex", alignItems: "center", cursor: "pointer",
    fill: theme.palette.grey[500],
    color: theme.palette.grey[500]
  },
  playing: {
    fill: theme.palette.secondary.main + "!important",
    color: theme.palette.secondary.main + "!important"
  }
});