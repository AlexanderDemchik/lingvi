import {fade} from "@material-ui/core/styles/colorManipulator";

export const style = (theme) => ({
  textField: {
    height: 40,
    border: "none",
    backgroundColor: "#f0f1f1",
    color: "#58585a",
    fontSize: "14px",
    boxShadow: "none",
    padding: "6px 8px",
    width: "100%",
    borderRadius: "6px 6px 0 0",
    boxSizing: "border-box",
    outline: "none",
    paddingRight: "58px",
    "&:focus": {
      boxShadow: `0 0 0 0.2rem ${fade(theme.palette.secondary.main, 0.25)}`,
    }
  },
  wrapper :{
    display: "flex",
    direction: "row",
    wrap: "nowrap",
    position: "relative"
  },
  button: {
    height: "100%",
    position: "absolute",
    fill: "#fff",
    right: 0,
    width: "50px",
    minWidth: 0,
    padding: 0,
    borderRadius: "0 6px 0 0"
  }
});