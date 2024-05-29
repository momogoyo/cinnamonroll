import { createGlobalStyle } from 'styled-components'
import { useConfig } from '../ContextConfig'

import type { Config } from '../../types'

interface GlobalStyleProps {
  config: Config
}

const GlobalStyles = createGlobalStyle<GlobalStyleProps>`
  :root {
    --size: 300px;
    --radius: ${({ config }) => config.radius}px;
    --padding: ${({ config }) => config.scrollPadding}px;
    --bg: hsl(180 0% 33%);
    --bar: hsl(0 0% 100% / 0.5);
    --panel: hsl(20 60% 50%);
    timeline-scope: --scroller;
  }
`

const GlobalStyleWrapper = () => {
  const { config } = useConfig()

  return <GlobalStyles config={config} />
}

export default GlobalStyleWrapper
