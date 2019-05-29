export default (theme) => ({
  root: {
    margin: "20px auto",
    maxWidth: 600
  },
  subtitles: {
    border: '1px solid ' + theme.palette.grey[300],
    padding: 10
  },
  subtitlesValues: {
    border: '1px solid ' + theme.palette.grey[300],
    padding: 10,
    marginBottom: 10
  },
  subFileChooser: {
    minHeight: "unset",
    height: "100%",
    width: "100%"
  }
});