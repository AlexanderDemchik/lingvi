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
    borderRadius: "6px",
    boxSizing: "border-box",
    outline: "none",
    "&:focus": {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    }
  },
  error: {
    borderBottom: `2px solid ${theme.palette.error.main}!important`,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  }
});