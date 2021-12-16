import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Box, CloseIcon, IconButton, useMatchBreakpoints, Link, LinkExternal } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { usePhishingBannerManager } from 'state/user/hooks'

const Container = styled(Flex)`
  overflow: hidden;
  height: 100%;
  padding: 12px;
  align-items: center;
  background: linear-gradient(0deg, rgba(6, 17, 97, 0.4), rgba(39, 38, 44, 0.4)),
    linear-gradient(180deg, #061161 0%, #061161 100%);
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 0px;
    background: linear-gradient(180deg, #061161 0%, #061161 100%);
  }
`

const InnerContainer = styled(Flex)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const SpeechBubble = styled.div`
  // background: rgba(39, 38, 44, 0.4);
  // border-radius: 16px;
  color="#FFFFFF"
  padding: 8px;
  width: 60%;
  padding-left:20px;
  height: 80%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  & ${Text} {
    flex-shrink: 0;
    margin-right: 4px;
  }
`

const PhishingWarningBanner: React.FC = () => {
  const { t } = useTranslation()
  const [, hideBanner] = usePhishingBannerManager()
  const { isMobile, isMd } = useMatchBreakpoints()
  const warningText = t("FLIFER swap - connect your wallet and trade.")
  const warningTextAsParts = warningText.split(/(https:\/\/swap.flifer.com)/g)
  const warningTextComponent = (
    <>
      <Text as="span" color="white" fontSize="25px" bold>
        {t('Flifer Technologies')}
      </Text>
      {/* {warningTextAsParts.map((text, i) => (
        <Text
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          small
          as="span"
          bold={text === 'https://swap.flifer.com'}
          color={text === 'https://swap.flifer.com' ? '#FFFFFF' : '#BDC2C4'}
        >
          {text}
        </Text>
      ))} */}
    </>
  )
  return (
    <Container>
      {isMobile || isMd ? (
        <Link external href="https://flifer.com/">
                    <picture>
              {/* <source type="image/webp" srcSet="/images/decorations/phishing-warning-bunny.webp" /> */}
              <source type="image/png" srcSet="/logo.png" />
              <img src="/logo.png" alt="phishing-warning" width="55px" />
            </picture>
          <Box style={{marginLeft:8}}>{warningTextComponent}</Box>
          {/* <IconButton onClick={hideBanner} variant="text">
            <CloseIcon color="#FFFFFF" />
          </IconButton> */}
        </Link>
      ) : (
        <Link external href="https://flifer.com/">
          <InnerContainer>
            <picture>
              {/* <source type="image/webp" srcSet="/images/decorations/phishing-warning-bunny.webp" /> */}
              <source type="image/png" srcSet="/logo.png" />
              <img src="/logo.png" alt="phishing-warning" width="55px" />
            </picture>
            <SpeechBubble>{warningTextComponent}</SpeechBubble>
          </InnerContainer>
          {/* <IconButton onClick={hideBanner} variant="text">
            <CloseIcon color="#FFFFFF" />
          </IconButton> */}
        </Link>
      )}
    </Container>
  )
}

export default PhishingWarningBanner
