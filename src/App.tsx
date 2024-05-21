import { ConfigProvider } from './components/ContextConfig'
import GlobalStyleWrapper from './components/GlobalStyles'
import Scroller from './components/Scroller'

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

      <Scroller>
        <ul>
          <li></li>
        </ul>
      </Scroller>
    </ConfigProvider>
  )
}

export default App
