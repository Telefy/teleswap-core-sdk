import JSBI from 'jsbi'
import { Currency } from '../entities/currency'
import { CurrencyAmount } from '../entities/fractions/currencyAmount'
import { Rebase } from '../interfaces'

export function rebase(value: JSBI, from: JSBI, to: JSBI): JSBI {
  return from ? JSBI.divide(JSBI.multiply(value, to), from) : JSBI.BigInt(0)
}

export function toElastic(total: Rebase, base: JSBI, roundUp: boolean): JSBI {
  let elastic: JSBI
  if (JSBI.equal(total.base, JSBI.BigInt(0))) {
    elastic = base
  } else {
    elastic = JSBI.divide(JSBI.multiply(base, total.elastic), total.base)
    if (roundUp && JSBI.lessThan(JSBI.divide(JSBI.multiply(elastic, total.base), total.elastic), base)) {
      elastic = JSBI.add(elastic, JSBI.BigInt(1))
    }
  }

  return elastic
}

export function toHex(currencyAmount: CurrencyAmount<Currency>) {
  return `0x${currencyAmount.quotient.toString(16)}`
}
