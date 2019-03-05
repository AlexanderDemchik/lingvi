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

export const isOrContains = (node, container) => {
  while (node) {
    if (node === container) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

export const elementContainsSelection = (el) => {
  let sel;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount > 0) {
      for (let i = 0; i < sel.rangeCount; ++i) {
        if (!isOrContains(sel.getRangeAt(i).commonAncestorContainer, el)) {
          return false;
        }
      }
      return true;
    }
  } else if ( (sel = document.selection) && sel.type !== "Control") {
    return isOrContains(sel.createRange().parentElement(), el);
  }
  return false;
};

export const clearSelection = (el) => {
  if(elementContainsSelection(el)) {
    if (window.getSelection) {
      if (window.getSelection().empty) {  // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {  // Firefox
        window.getSelection().removeAllRanges();
      }
    } else if (document.selection) {  // IE?
      document.selection.empty();
    }
  }
};
