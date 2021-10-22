const { isInternal } = require('./middleware')

// IPv4
// internal
test('internal IPv4 (random IP)', () => {
  expect(isInternal('192.168.1.63')).toBe(true)
})

// public
test('public IPv4 (random IP)', () => {
  expect(isInternal('3.145.51.87')).toBe(false)
})

// IPv6
// internal
test('internal IPv4 inside IPv6 (random IP)', () => {
  expect(isInternal('::ffff:192.168.1.63')).toBe(true)
})
test('equivalent of the IPv4 address 127.0.0.1 (::1)', () => {
  expect(isInternal('::1')).toBe(true)
})

// public
test('random IPv6 address', () => {
  expect(isInternal('27ed:1b9e:aad6:1911:021b:98de:225f:d369')).toBe(false)
})
