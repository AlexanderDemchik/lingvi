export const style = (theme) => ({
  row: {
    display: "flex",
    flexWrap: "nowrap",
    minHeight: 50,
    width: "100%",
    borderBottom: "1px solid rgba(200,200,200)",
    "&:hover": {
      boxShadow: "1px 3px 19px 0 rgba(150,150,150,1)"
    }
  },
  column: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgb(20,20,20)"
  },
  word: {
    fontWeight: 500,
  },
  volume: {
    marginRight: 10,
    fill: "rgb(47,47,47)",
  },
  translation: {
    color: "rgb(100,100,100)"
  },
  delete: {
    marginRight: 10,
    marginLeft: 10,
    justifyContent: "flex-end",
    fill: "rgba(200,200,200,1)",
  },
  progress: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  delimiter: {
    marginRight: 10,
    marginLeft: 10
  },
  deleteIcon: {
    cursor: "pointer",
    "&:hover": {
      fill: theme.palette.secondary.main
    }
  },
  icon: {
    cursor: "pointer",
    display: "flex", alignItems: "center"
  }
});