export default (theme) => ({
  root: {
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
    alignItems: "center",
    width: "100%",
    height: "100%",
    alignContent: "center",
    justifyContent: "center"
  },
  placeholder: {
    color: "#ced4da",
    fontSize: 20,
    fontWeight: 600
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
  }
});