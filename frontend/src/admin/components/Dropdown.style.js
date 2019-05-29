export default (theme) => ({
  root: {
    marginBottom: 10,
    borderRadius: 4,
    color: "#fff",
    padding: 10,
    fill: "#fff",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: "transparent"
  },
  active: {
    backgroundColor: 'rgba(200,200,200,0.15)',
  },
  downIcon: {
    transition: '0.16s linear'
  }
});