import parseDomString from './utils/parse-dom'
import insertHeading from './utils/insert-heading'

const headingReg = /<h\d[^<]*>.*<\/h\d>/g

function getHeadingObj(node) {
  return {
    anchor: node.props.id,
    name: node.content,
    sub: [],
    depth: +node.tagName.substr(1)
  }
}

export default function (html) {
  const headingNodes = html.match(headingReg)
  let headings = []

  if (headingNodes && headingNodes.length > 0) {
    for (let i = 0, len = headingNodes.length; i < len; ++i) {
      insertHeading(headings, getHeadingObj(parseDomString(headingNodes[i])))
    }
  }

  return headings
}
