export const style = (theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.dark,
    height: theme.mixins.toolbar.minHeight,
    [theme.breakpoints.up('sm')]: {
      height: theme.mixins.toolbar[theme.breakpoints.up('sm')].minHeight
    }
  },
});