import parseDom from '../src/utils/parse-dom'

test('illegal input should get null', () => {
  const html = null
  const dom = parseDom(html)
  expect(dom).toBeNull()
})

test('no tag match should get null', () => {
  const html = 'foo'
  const dom = parseDom(html)
  expect(dom).toBeNull()
})

test('should get the tagname', () => {
  const html = `<div></div>`
  const dom = parseDom(html)
  expect(dom.tagName).toBe('div')
})

test('should get the content without inner tag', () => {
  const html = `<div> the <div class="inner">inner div</div></div>`
  const dom = parseDom(html)
  expect(dom.content).toBe('the inner div')
})

test('should get trimed content', () => {
  const html = `<div> test </div>`
  const dom = parseDom(html)
  expect(dom.content).toBe('test')
})

test('should get all the props', () => {
  const html = `<div id="test" class="test-class">test</div>`
  const dom = parseDom(html)
  expect(dom.props.id).toBe('test')
  expect(dom.props.class).toBe('test-class')
})
