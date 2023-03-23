import { NextResponse } from 'next/server'
import { getCurrencyRate } from '@shared/util/currency'
import { Currency } from '@enums/currency'

export async function GET() {
  const rate = getCurrencyRate(Currency.USD)
  return NextResponse.json(rate)
}
