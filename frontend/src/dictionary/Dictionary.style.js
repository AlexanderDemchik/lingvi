import {containerStyle} from "../shared/styles/containerStyle";

export const style = (theme) => ({
  wrapper: {
    width: "100%",
    padding: "50px 0"
  },
  dictionary: {
    flexGrow: 1,
  },
  meta: {
    paddingRight: 70,
    minWidth: 270
  },
  select: {
    margin: "20px 0"
  },
  container: containerStyle
});