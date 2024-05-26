import styled from 'styled-components'
import { ConfigProvider } from './components/ContextConfig'
import GlobalStyleWrapper from './components/GlobalStyles'
import Scroller from './components/Scroller'

import './index.css'

const App = () => {
  const userConfig = {
    radius: 20,
    scrollPadding: 40,
    stroke: 8,
    thumb: 100,
  }

  return (
    <ConfigProvider {...userConfig}>
      <GlobalStyleWrapper />
      <h1>시나몬 롤</h1>

      <div className="cinnamonroll">
        <Scroller>
          <UI padding={userConfig.scrollPadding}>
            <LI></LI>
            <LI></LI>
            <LI></LI>
            <LI></LI>
          </UI>
        </Scroller>
      </div>
    </ConfigProvider>
  )
}

const UI = styled.ul<{ padding: number }>`
  list-style: none;
  scrollbar-width: 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;

  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: hsl(180 0% 33%);
  border-radius: 20px;
  display: grid;
  grid-auto-flow: row;
  gap: 1rem;
  margin: 0;
  padding: ${({ padding }) => `${padding}px 0`};

  &::webkit-scrollbar {
    display: none;
    opacity: 0 !important;
  }
`

const LI = styled.li`
  width: 100%;
  height: calc(300px * 0.75);
  background-color: hsl(20 60% 50%);
  border-radius: 20px;
  scroll-snap-align: center;

  &:first-of-type {
    scroll-snap-align: start;
  }

  &:last-of-type {
    scroll-snap-align: end;
  }
`

export default App
