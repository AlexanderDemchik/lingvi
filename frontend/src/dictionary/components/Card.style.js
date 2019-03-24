import {theme} from "../../theme";

export const style = (theme) => ({
  wrapper: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
    paddingTop: 150,
  },
  word: {
    fontSize: "1.8rem",
    marginBottom: "7px",
    color: "#995B36"
  },
  deleteIcon: {
    fill: "rgba(200,200,200,1)",
    position: "absolute",
    bottom: "10px",
    right: "20px",
    cursor: "pointer",
    "&:hover": {
      fill: theme.palette.primary.main
    }
  },
  translation: {
    color: "#995B36",
    "&:first-child": {
      fontSize: "1.2rem"
    }
  },
  icon: {
    "svg": {
      width: "100px"
    }
  },
  wordImg: {
    position: "absolute",
    top: -30,
    backgroundColor: theme.palette.background.dark,
    left: "50%",
    transform: "translate(-50%, 0)",
    width: "160px",
    height: "160px",
    boxShadow: "0 1px 3px rgba(0,0,0,.3)",
    padding: 3
  },
  cut: {
    position: "absolute",
    bottom: -5,
    height: "10px",
    width: "300px",
    left: "50%",
    transform: "translate(-50%, 0)",
    backgroundColor: theme.palette.background.dark,
  },
  cutImg: {
    position: "absolute",
    top: -10,
    transform: "translate(-50%, 0)",
  },
  sound: {
    color: "rgb(200,200,200)",
    fill: "rgb(200,200,200)"
  }
});