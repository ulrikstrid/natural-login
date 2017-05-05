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

export const standardEmailDomains = [
  'gmail.com',
  'outlook.com',
  'hotmail.com',
  'live.com',
  'telia.se'
]

export function stringDiff (stringA: string, stringB: string): number {
  return stringA.split('')
    .map((char, index) => {
      return stringB[index] === char ? 0 : 1
    })
    .reduce((acc, curr) => acc + curr, 0)
}

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
