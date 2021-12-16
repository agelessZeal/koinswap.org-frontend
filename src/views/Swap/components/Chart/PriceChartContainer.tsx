import { Currency } from '@pancakeswap/sdk'
import { FFF_ADDRESS } from 'config/constants'
import { useCurrency } from 'hooks/Tokens'
import useTheme from 'hooks/useTheme'
import React, { useCallback, useState } from 'react'
import { useFetchPairPrices } from 'state/swap/hooks'
import { PairDataTimeWindowEnum } from 'state/swap/types'
import BnbWbnbNotice from './BnbWbnbNotice'
import { BNB_ADDRESS } from './constants'
import NoChartAvailable from './NoChartAvailable'
import PriceChart from './PriceChart'
import { getTokenAddress } from './utils'

type PriceChartContainerProps = {
  inputCurrencyId: string
  inputCurrency: Currency
  outputCurrencyId: string
  outputCurrency: Currency
  isChartExpanded: boolean
  setIsChartExpanded: React.Dispatch<React.SetStateAction<boolean>>
  isChartDisplayed: boolean
  currentSwapPrice: {
    [key: string]: number
  }
  isMobile?: boolean
}

const PriceChartContainer: React.FC<PriceChartContainerProps> = ({
  inputCurrencyId,
  inputCurrency,
  outputCurrency,
  outputCurrencyId,
  isChartExpanded,
  setIsChartExpanded,
  isChartDisplayed,
  currentSwapPrice,
  isMobile,
}) => {


  const [timeWindow, setTimeWindow] = useState<PairDataTimeWindowEnum>(0)

  const fftChartInputId = inputCurrencyId// '0x166daee763902da67984e38baa478a63f55cc25b'

  const fftChartOutputId = outputCurrencyId//  '0x55d398326f99059fF775485246999027B3197955'

  const fffoutputCurrency = outputCurrency;// useCurrency(fftChartOutputId)

  const fffinputCurrency = inputCurrency;// useCurrency(fftChartInputId)

  const token0Address = getTokenAddress(fftChartInputId)
  const token1Address = getTokenAddress(fftChartOutputId)

  // if(outputCurrencyId.toLowerCase() !== FFF_ADDRESS && inputCurrencyId.toLowerCase() !== FFF_ADDRESS){
  //    fffoutputCurrency = outputCurrency
  //    fffinputCurrency = inputCurrency
  //    token0Address = getTokenAddress(inputCurrencyId)
  //    token1Address = getTokenAddress(outputCurrencyId)
  // }


  const [isPairReversed, setIsPairReversed] = useState(false)
  const togglePairReversed = useCallback(() => setIsPairReversed((prePairReversed) => !prePairReversed), [])

  const { pairPrices, pairId } = useFetchPairPrices({
    token0Address: isPairReversed ? token1Address : token0Address,
    token1Address: isPairReversed ? token0Address : token1Address,
    timeWindow,
    currentSwapPrice,
  })

  const { isDark } = useTheme()

  if (!isChartDisplayed) {
    return null
  }

  const isBnbWbnb = token0Address === BNB_ADDRESS && token1Address === BNB_ADDRESS

  if (isBnbWbnb) {
    return <BnbWbnbNotice isDark={isDark} isChartExpanded={isChartExpanded} />
  }

  // Sometimes we might receive array full of zeros for obscure tokens while trying to derive data
  // In that case chart is not useful to users
  const isBadData =
    pairPrices &&
    pairPrices.length > 0 &&
    pairPrices.every(
      (price) => !price.value || price.value === 0 || price.value === Infinity || Number.isNaN(price.value),
    )

  // If results did came back but as empty array - there is no data to display
  if ((!!pairPrices && pairPrices.length === 0) || isBadData || !pairId) {
    return (
      <NoChartAvailable
        isDark={isDark}
        isChartExpanded={isChartExpanded}
        token0Address={token0Address}
        token1Address={token1Address}
        pairAddress={pairId}
        isMobile={isMobile}
      />
    )
  }

  return (
    <PriceChart
      lineChartData={pairPrices}
      timeWindow={timeWindow}
      setTimeWindow={setTimeWindow}
      inputCurrency={isPairReversed ? fffoutputCurrency : fffinputCurrency}
      outputCurrency={isPairReversed ? fffinputCurrency : fffoutputCurrency}
      onSwitchTokens={togglePairReversed}
      isDark={isDark}
      isChartExpanded={isChartExpanded}
      setIsChartExpanded={setIsChartExpanded}
      isMobile={isMobile}
    />
  )
}

export default React.memo(PriceChartContainer, (prev, next) => {
  const prevToken0Address = getTokenAddress(prev.inputCurrencyId)
  const nextToken0Address = getTokenAddress(next.inputCurrencyId)
  const prevToken1Address = getTokenAddress(prev.outputCurrencyId)
  const nextToken1Address = getTokenAddress(next.outputCurrencyId)

  return (
    prev.inputCurrencyId === next.inputCurrencyId &&
    prev.outputCurrencyId === next.outputCurrencyId &&
    prev.isChartExpanded === next.isChartExpanded &&
    prev.isChartDisplayed === next.isChartDisplayed &&
    prev.isMobile === next.isMobile &&
    prev.setIsChartExpanded === next.setIsChartExpanded &&
    ((prev.currentSwapPrice !== null &&
      next.currentSwapPrice !== null &&
      prev.currentSwapPrice[prevToken0Address] === next.currentSwapPrice[nextToken0Address] &&
      prev.currentSwapPrice[prevToken1Address] === next.currentSwapPrice[nextToken1Address]) ||
      (prev.currentSwapPrice === null && next.currentSwapPrice === null))
  )
})
