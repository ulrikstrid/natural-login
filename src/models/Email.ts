export type Email = string

export type HelpMessage = {
  email: Email,
  valid: boolean
}

// Naive regex to validate emails, it doesn't support a lot of stuff that it should
export const emailRegex = /([a-z\.]+)@([a-z\.]+\.(com|se))/

export function validateEmail (email: string): boolean {
  return emailRegex.test(email)
}

export function getMatchingUsername (matchArr: RegExpMatchArray) {
  return matchArr[1]
}

export function getMatchingDomain (matchArr: RegExpMatchArray) {
  return matchArr[2]
}

// This list should probably be dynamically fetched from the backend
export const standardEmailDomains = [
  'gmail.com',
  'outlook.com',
  'hotmail.com',
  'live.com',
  'telia.se',
  'example.com'
]

// Naive diffing of strings, we just compare characters at the same index
export function stringDiff (stringA: string, stringB: string): number {
  return stringA.split('')
    .map((char, index) => {
      return stringB[index] === char ? 0 : 1
    })
    .reduce((acc, curr) => acc + curr, 0)
}

// This function will only be as good as the stringDiff function
export function bestMatch (list: string[], word: string): { word: string, bestMatch: string, diff: number } {
  const bestDiff = list
    .map((item) => {
      return {
        item,
        diff: stringDiff(word, item)
      }
    })
    .reduce((acc, curr) => {
      if (acc.diff < curr.diff) {
        return acc
      }

      return curr
    })

  return { word, bestMatch: bestDiff.item, diff: bestDiff.diff }
}

export function findDomainInString (domainList: string[], input: string): null | string {
  return domainList.reduce((match: null | string, curr): string | null => {
    if (match !== null) {
      return match
    }

    return new RegExp(curr).test(input) ? curr : null
  }, null)
}
