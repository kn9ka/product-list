import { useState, useEffect } from 'react'
import useSWR, { Fetcher } from 'swr'

const REFRESH_INTERVAL = 10000

const fetcher: Fetcher<number, string> = (...args) =>
  fetch(...args).then((res) => res.json())

// чтобы можно было в любой момент поменять логику получения курс
// например сделать правильно и фетчить данные с какого-нибудь апи
export const useCurrencyRate = () => {
  const [prevRate, setPrevRate] = useState(0)
  const [nextRate, setNextRate] = useState(0)

  const { data } = useSWR(`/api/currency`, fetcher, {
    refreshInterval: REFRESH_INTERVAL,
  })

  useEffect(() => {
    if (data) {
      setPrevRate(nextRate)
      setNextRate(data)
    }
  }, [data])

  return [nextRate, prevRate]
}
