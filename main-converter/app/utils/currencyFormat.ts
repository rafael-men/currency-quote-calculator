const LOCALE = 'pt-BR'
const MAX_INTEGER_DIGITS = 12

const createCurrencyFormatter = (currencyCode: string, options?: Intl.NumberFormatOptions) => {
  try {
    return new Intl.NumberFormat(LOCALE, {
      style: 'currency',
      currency: currencyCode,
      ...options,
    })
  } catch {
    return null
  }
}

export const getCurrencyFractionDigits = (currencyCode: string) => {
  const formatter = createCurrencyFormatter(currencyCode)

  if (formatter) {
    return formatter.resolvedOptions().maximumFractionDigits ?? 2
  }

  return 2
}

export const getCurrencyPrefix = (currencyCode: string) => {
  const formatter = createCurrencyFormatter(currencyCode)

  if (!formatter) {
    return currencyCode
  }

  const parts = formatter.formatToParts(0)
  let prefix = ''

  for (const part of parts) {
    if (part.type === 'currency') {
      prefix += part.value
      continue
    }

    if (part.type === 'literal' && prefix.length > 0) {
      if (part.value.includes(' ')) {
        prefix += ' '
      }
      break
    }

    if (part.type !== 'literal') {
      break
    }
  }

  return prefix.trimEnd() || currencyCode
}

type FormatAmountOptions = {
  padFraction?: boolean
}

export const formatAmountNumber = (amount: number, currencyCode: string, options?: FormatAmountOptions) => {
  const fractionDigits = getCurrencyFractionDigits(currencyCode)
  const padFraction = options?.padFraction ?? true
  const minimumFractionDigits = padFraction && fractionDigits > 0 ? fractionDigits : 0

  const formatter = createCurrencyFormatter(currencyCode, {
    minimumFractionDigits,
    maximumFractionDigits: fractionDigits,
  })

  if (formatter) {
    const parts = formatter.formatToParts(amount)

    return parts
      .filter((part) => ['integer', 'group', 'decimal', 'fraction'].includes(part.type))
      .map((part) => part.value)
      .join('')
  }

  return new Intl.NumberFormat(LOCALE, {
    minimumFractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount)
}

export const normalizeAmountForCurrency = (amount: number, currencyCode: string) => {
  const fractionDigits = getCurrencyFractionDigits(currencyCode)

  if (fractionDigits === 0) {
    return Math.floor(amount)
  }

  return Math.round(amount * 10 ** fractionDigits) / 10 ** fractionDigits
}

const stripLeadingZeros = (integerPart: string) => {
  if (!integerPart) {
    return '0'
  }

  const normalized = integerPart.replace(/^0+(?=\d)/, '')
  return normalized || '0'
}

export const parseCurrencyInput = (raw: string, currencyCode: string) => {
  const fractionDigits = getCurrencyFractionDigits(currencyCode)
  const cleaned = raw.replace(/[^\d,.]/g, '')

  if (!cleaned) {
    return 0
  }

  const hasComma = cleaned.includes(',')
  const hasDot = cleaned.includes('.')
  let normalized: string

  if (hasComma && hasDot) {
    normalized = cleaned.replace(/\./g, '').replace(',', '.')
  } else if (hasComma) {
    normalized = cleaned.replace(',', '.')
  } else if (hasDot) {
    const dotCount = (cleaned.match(/\./g) ?? []).length
    const afterLastDot = cleaned.split('.').pop() ?? ''

    if (dotCount > 1 || fractionDigits === 0) {
      normalized = cleaned.replace(/\./g, '')
    } else if (afterLastDot.length <= fractionDigits) {
      normalized = cleaned
    } else {
      normalized = cleaned.replace(/\./g, '')
    }
  } else {
    normalized = cleaned
  }

  const [rawInteger = '0', rawDecimal] = normalized.split('.')
  let integerPart = stripLeadingZeros(rawInteger)

  if (integerPart.length > MAX_INTEGER_DIGITS) {
    integerPart = integerPart.slice(0, MAX_INTEGER_DIGITS)
  }

  let decimalPart = rawDecimal

  if (decimalPart !== undefined && fractionDigits >= 0) {
    decimalPart = decimalPart.slice(0, fractionDigits)
  }

  normalized = decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart

  let parsed = Number.parseFloat(normalized)

  if (Number.isNaN(parsed) || parsed < 0) {
    return 0
  }

  if (fractionDigits === 0) {
    parsed = Math.floor(parsed)
  } else {
    parsed = Math.round(parsed * 10 ** fractionDigits) / 10 ** fractionDigits
  }

  const maxValue = 10 ** MAX_INTEGER_DIGITS - 1
  return Math.min(parsed, maxValue)
}

export const sanitizeCurrencyTyping = (raw: string) => {
  let value = raw.replace(/[^\d,.]/g, '')

  if (!value) {
    return ''
  }

  const digitsOnly = value.replace(/[.,]/g, '')

  if (digitsOnly.length > 1 && digitsOnly.startsWith('0')) {
    value = value.replace(/^0+(?=\d)/, '')
  }

  return value
}
