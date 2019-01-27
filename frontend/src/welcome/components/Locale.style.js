const style = (theme) => ({
  localeWrapper: {
    height: "100%",
    borderRadius: "4px",
    paddingLeft: 5,
    color: theme.palette.secondary.main
  },
  flag: {
    height: "20px",
    width: "30px",
    backgroundImage: 'url(' + require("../../assets/en.svg") + ')',
    backgroundSize: "cover",
    backgroundPosition: "center"
  }
});

export default style;