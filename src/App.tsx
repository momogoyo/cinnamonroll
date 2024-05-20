import { ConfigProvider } from './components/ContextConfig'

const App = () => {
  const userConfig = {
    radius: 20,
    scrollPadding: 40,
    stroke: 8,
    thumb: 100,
  }

  return (
    <ConfigProvider {...userConfig}>
      <h1>시나몬 롤</h1>
      <div></div>
    </ConfigProvider>
  )
}

export default App
