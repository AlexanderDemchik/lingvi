import {containerStyle} from "../shared/styles/containerStyle";

export const style = (theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
    // backgroundColor: theme.palette.primary.main,
    height: theme.mixins.toolbar.minHeight,
    [theme.breakpoints.up('sm')]: {
      height: theme.mixins.toolbar[theme.breakpoints.up('sm')].minHeight
    },
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    ...containerStyle,
    padding: 0
  }
});