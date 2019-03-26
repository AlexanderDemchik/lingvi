export const style = (theme) => ({
  profilePhoto: {
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    marginLeft: 5
  },
  wrapper: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    fill: "#fff",
    position: "relative",
    "&:hover": {
      backgroundColor: "rgb(55, 57, 64)",
    }
  },
  active: {
    backgroundColor: "rgb(55, 57, 64)",
  },
  menu: {
    width: 200,
    backgroundColor: "#fff",
    position: "absolute",
    boxShadow: theme.shadows[1],
    top: "100%",
    right: 0,
    transform: "translate(0, 0)",
    opacity: 1,
    transition: "all .2s linear",
  },
  arrow: {
    position: 'absolute',
    fontSize: 10,
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '0 1em 1em 1em',
      borderColor: `transparent transparent #fff transparent`,
    },
    top: 0,
    right: "20px",
    marginTop: '-0.95em',
    width: '3em',
    height: '1em',
  },
  hidden: {
    visibility: "hidden",
    transform: "translate(0, 20px)",
    opacity: 0,
  },
  icon: {
    fill: theme.palette.grey[500],
    height: "1.5rem"
  },
  block: {
    display: "flex",
    alignItems: "center",
    height: "100%"
  },
  name: {
    color: "#fff",
    paddingLeft: 5
  },
  listItem: {
    "&:hover svg": {
      fill: theme.palette.primary.main + "!important",
      color: theme.palette.primary.main
    }
  }
});
