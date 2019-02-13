export const convertSeconds = (s) => { //convert seconds to hh:mm:ss format
  let m = Math.floor(s/60);
  s = Math.floor(s%60);
  if(s < 10) s = "0" + s;
  if(m < 60) {
    return m + ":" + s
  } else {
    let h = Math.floor(m/60);
    m = Math.floor(m%60);
    return h + ":" + ((m<10)?("0" + m):(m)) + ":" + s;
  }
};