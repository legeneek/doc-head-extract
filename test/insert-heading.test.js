import insertHeading from '../src/utils/insert-heading'

test('the first head should push to headings directly', () => {
  let headings = []
  let headObj = {
    anchor: 1,
    name: 'head',
    depth: 1,
    sub: []
  }
  insertHeading(headings, headObj)
  expect(headings[0]).toBe(headObj)
})

test('larger depth heading should be the sub of previous heading', () => {
  let headings = [
    {
      anchor: 'a',
      name: 'head-a',
      depth: 1,
      sub: [
        {
          anchor: 'b',
          name: 'head-b',
          depth: 2,
          sub: []
        }
      ]
    }
  ]
  let headObj = {
    anchor: 'c',
    name: 'head-c',
    depth: 3,
    sub: []
  }
  insertHeading(headings, headObj)
  expect(headings[0].sub[0].sub[0]).toBe(headObj)
})
