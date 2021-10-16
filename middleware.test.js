const { isInternal } = require('./middleware')

// internal
test('checks an internal ip to see if it is internal', () => {
  expect(isInternal('192.168.1.63')).toBe(true)
})

// public
test('checks an public ip to see if it is public', () => {
  expect(isInternal('3.145.51.87')).toBe(false)
})
