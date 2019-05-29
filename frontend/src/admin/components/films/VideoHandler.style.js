export default (theme) => ({
  dropZone: {
    minHeight: 100,
    width: "100%",
    border: `3px dashed #ced4da`,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer"
  },
  placeholderContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  placeholder: {
    color: "#ced4da",
    fontSize: 20,
    fontWeight: 600,
    padding: 10,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  file: {
    height: 85,
    width: 70,
    borderRadius: 5,
    margin: 5,
    position: "relative",
    backgroundColor: theme.palette.grey[200],
    display: "flex",
    justifyContent: "center",
    backgroundSize: "cover"
  },
  fileSize: {
    fontSize: 11,
    textAlign: "center",
  },
  fileIcon: {
    fill: "#fff",
  },
  imageIcon: {
    fill: "#fff",
  },
  image: {
    height: 85,
    borderRadius: 5,
    margin: 5,
    position: "relative",
    backgroundColor: theme.palette.grey[200],
    display: "flex",
    justifyContent: "center",
    backgroundSize: "cover"
  },
  imageWidth: {
    width: 120
  },
  progress: {
    position: "absolute",
    bottom: 4,
    width: "100%"
  },
  cancelOverlay: {
    position: "absolute",
    zIndex: 3,
    backgroundColor: "rgba(0,0,0,0.5)",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  closeIcon: {
    position: "absolute",
    fill: "#fff",
    top: 2, right: 2
  },
  root: {
    border: `2px solid ${theme.palette.grey[300]}`,
    padding: 10
  },
  progressWrapper: {
    minHeight: 30,
    display: "flex",
    alignItems: "center"
  },
  controlsItem: {
    fontSize: 17,
    textAlign: "center",
    cursor: "pointer",
    padding: "5px 10px",
    color: theme.palette.grey[400],
    border: `1px solid ${theme.palette.grey[400]}`,
    "&:hover": {
      color: theme.palette.secondary.main,
      border: `1px solid ${theme.palette.secondary.main}`,
    }
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    "& > div > div": {
      backgroundColor: theme.palette.secondary.main,
    }
  },
  selectStreamTitle: {
    fontSize: 18,
    textAlign: "center",
    color: theme.palette.grey[400],
    padding: "5px 10px",
    border: `1px solid ${theme.palette.grey[400]}`,
  },
  info: {
    fontSize: 18,
    textAlign: "center",
    padding: 15,
    color: theme.palette.grey[400],
  }
});