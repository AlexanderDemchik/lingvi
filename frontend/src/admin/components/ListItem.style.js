export default (theme) => ({
  listItem: {
    margin: 17,
    borderRadius: 4,
    color: "#fff",
    padding: 10,
    fill: "#fff",
    display: "flex",
    alignItems: "center"
  },
  active: {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: `0 12px 20px -10px rgba(0, 172, 193,.28), 0 4px 20px 0 rgba(0, 0, 0,.12), 0 7px 8px -5px rgba(0, 172, 193,.2)`
  }
});