export default function (str) {
  if (typeof str !== 'string') {
    return null
  }
  const reg = /<([^<]+)>(.*)<\/.+>/
  const matchs = str.match(reg)
  if (matchs) {
    const head = matchs[1]
    const arr = head.split(' ')
    let content = matchs[2]
    content = content.split(/<\/?\w[^<]*>/).join('').trim()
    
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
