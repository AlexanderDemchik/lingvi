export default (theme) => ({
  root: {
    borderRadius: 4,
    marginBottom: 10,
    color: "#fff",
    padding: 10,
    fill: "#fff",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: 'rgba(200,200,200,0.15)',
    }
  },
  icon: {
    display: "flex",
    alignItems: "center",
    marginRight: "7px",
    width: "1.5em"
  },
  active: {
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
    boxShadow: `0 12px 20px -10px rgba(0, 172, 193,.28), 0 4px 20px 0 rgba(0, 0, 0,.12), 0 7px 8px -5px rgba(0, 172, 193,.2)`
  }
});