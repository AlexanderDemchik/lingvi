export const style = (theme) => ({
  selectAllCheckbox: {
    padding: 0,
    margin: 12
  },
  wrapper: {
    borderBottom: "1px solid rgba(200,200,200)",
    height: 70,
    paddingRight: 10
  },
  selected: {
    color: "rgba(150,150,150)",
    marginRight: 20
  },
  deleteDict: {
    fill: "rgba(200,200,200,1)",
    cursor: "pointer",
    "&:hover": {
      fill: theme.palette.error.main
    }
  }
});