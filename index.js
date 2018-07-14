const headingReg = /<h\d.*>.*<\/h\d>/g

function parseDomString (str) {
  if (typeof str !== 'string') {
    return null
  }
  const reg = /<(.+)>(.*)<\/.+>/
  const matchs = str.match(reg)
  if (matchs) {
    const head = matchs[1]
    const content = matchs[2]
    const arr = head.split(' ')
    let obj = {
      tagName: '',
      props: {},
      content: content
    }
    if (arr.length > 0) {
      obj.tagName = arr[0]
      for (let i = 1, len = arr.length; i < len; ++i) {
        const prop = arr[i].split('=')
        obj.props[prop[0]] = String(prop[1]).replace(/['"]/g, '').trim()
      }
    }

    return obj
  }
}

function getHeadingObj(node) {
  let obj = null
  if (node) {
    obj = {
      anchor: node.props.id,
      name: node.content,
      sub: [],
      depth: +node.tagName.substr(1)
    }
  }
  return obj
}

function insertHeading(headings, target) {
  const headObj = getHeadingObj(target)
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
      insertHeading(h.sub, target)
    }
  }
}

function extractor(html) {
  const headingNodes = html.match(headingReg)
  let headings = []

  if (headingNodes && headingNodes.length > 0) {
    for (let i = 0, len = headingNodes.length; i < len; ++i) {
      insertHeading(headings, parseDomString(headingNodes[i]))
    }
  }

  return headings
}

module.exports = extractor
