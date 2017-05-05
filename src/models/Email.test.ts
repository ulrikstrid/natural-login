import * as Email from './Email'

test('emailRegex matches valid emails', () => {
  const matchedEmails = Email.standardEmailDomains
    .map((domain) => `ulrik.strid@${domain}`)
    .map((validEmail) => Email.emailRegex.test(validEmail))

  expect(matchedEmails).toEqual(expect.arrayContaining([true, true, true, true, true]))
})

test('emailRegex gives false for invalid emails', () => {
  const unmatchedEmail = Email.standardEmailDomains
    .map((domain) => `ulrik.strid${domain}`)
    .map((nonValidEmail) => Email.emailRegex.test(nonValidEmail))

  expect(unmatchedEmail).toEqual(expect.arrayContaining([false, false, false, false, false]))
})

test('validate email', () => {
  expect(Email.validateEmail('ulrik.strid@outlook.com')).toBe(true)
  expect(Email.validateEmail('ulrik.stridoutlook.com')).toBe(false)
})

test('string diff', () => {
  const gmail = 'gmail.com'
  const gnail = 'gnail.com'

  const longerStringA = 'something longer with more diffs'
  const longerStringB = 'somehting lnger  with more difs'

  expect(Email.stringDiff(gmail, gnail)).toBe(1)
  expect(Email.stringDiff(longerStringA, longerStringB)).toBe(2 + 5 + 0 + 0 + 2) // diffs per word summed
})

test('best match', () => {
  const outlook = 'outlook.com'
  const outjook = 'outjook.com'
  const gmail = 'gmail.com'
  const gnail = 'gnail.com'

  expect(Email.bestMatch(Email.standardEmailDomains, outlook)).toEqual({ word: outlook, bestMatch: 'outlook.com', diff: 0})
  expect(Email.bestMatch(Email.standardEmailDomains, outjook)).toEqual({ word: outjook, bestMatch: 'outlook.com', diff: 1})
  expect(Email.bestMatch(Email.standardEmailDomains, gmail)).toEqual({ word: gmail, bestMatch: 'gmail.com', diff: 0})
  expect(Email.bestMatch(Email.standardEmailDomains, gnail)).toEqual({ word: gnail, bestMatch: 'gmail.com', diff: 1})
})
