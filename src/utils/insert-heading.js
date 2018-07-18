export default function insertHeading (headings, headObj) {
  if (!headObj) {
    return
  }
  if (headings.length === 0) {
    headings.push(headObj)
  } else {
    const depth = headObj.depth
    const h = headings[headings.length - 1]
    if (depth <= h.depth) {
      headings.push(headObj)
    } else {
      insertHeading(h.sub, headObj)
    }
  }
}
