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

export const getSubtitleAtTime = (subList, currentTime) => {
  for(let i in subList) {
    if(subList[i].start <= currentTime && subList[i].end >= currentTime) {
      return subList[i].content;
    } else {
      if(subList[i].end > currentTime) return []
    }
  }
  return [];
};

//https://stackoverflow.com/questions/6846230/coordinates-of-selected-text-in-browser-page
//currently throw errors in edge and ie
export const getSelectionCoords = (win) => {
  try {
    win = win || window;
    let doc = win.document;
    let sel = doc.selection, range, rects, rect, lastRect;
    let left = 0, right = 0;
    if (sel) {
      if (sel.type !== "Control") {
        range = sel.createRange();
        range.collapse(true);
        left = range.boundingLeft;
        right = range.boundingRight;
      }
    } else if (win.getSelection) {
      sel = win.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0).cloneRange();
        if (range.getClientRects) {
          rects = range.getClientRects();
          if (rects.length > 0) {
            rect = rects[0];
            lastRect = rects[rects.length - 1]
          }
          left = rect.left;
          right = lastRect.right;
        }
        // Fall back to inserting a temporary element
        if (left === 0 && right === 0) {
          let span = doc.createElement("span");
          if (span.getClientRects) {
            // Ensure span has dimensions and position by
            // adding a zero-width space character
            span.appendChild(doc.createTextNode("\u200b"));
            range.insertNode(span);
            rect = span.getClientRects()[0];
            left = rect.left;
            right = rect.right;
            let spanParent = span.parentNode;
            spanParent.removeChild(span);

            // Glue any broken text nodes back together
            spanParent.normalize();
          }
        }
      }
    }
    return {left, right};
  } catch (e) {
    return {left: 0, right: 0}
  }
};