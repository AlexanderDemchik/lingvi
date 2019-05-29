import {fade} from "@material-ui/core/styles/colorManipulator";

export default (theme) => ({
  root: {
    position: "relative"
  },
  area: {
    fontFamily: theme.typography.fontFamily,
    border: "1px solid #ced4da",
    fontSize: "14px",
    boxShadow: "none",
    padding: "6px 8px",
    width: "100%",
    height: "100px",
    borderRadius: "4px",
    boxSizing: "border-box",
    outline: "none",
    "&:focus": {
      boxShadow: `0 0 0 0.2rem ${fade(theme.palette.secondary.main, 0.25)}`,
    }
  },
  required: {
    position: "absolute",
    top: 5,
    right: 5,
    color: theme.palette.error.main,
  },
});