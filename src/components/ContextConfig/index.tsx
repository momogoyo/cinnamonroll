import React, { createContext, useContext, useState } from 'react'

import type { Config, ConfigContextProps } from '../../types'

const defaultConfig: Config = {
  show: true,
  radius: 32,
  scrollPadding: 100,
  stroke: 7,
  inset: 4,
  trail: 0,
  track: true,
  thumb: 80,
  finish: 5,
  alpha: 0.75,
  trackAlpha: 0,
  // cornerLength: 스크롤 thumb 경로의 전체 길이를 설정
}
const ConfigContext = createContext<ConfigContextProps>({
  config: { ...defaultConfig, cornerLength: 0 },
  updateConfig: () => {},
})

export const ConfigProvider = ({ children, ...userConfig }: React.PropsWithChildren<Config>) => {
  const mergedConfig = { ...defaultConfig, ...userConfig }
  const [config, setConfig] = useState<Config & { cornerLength: number }>({ ...mergedConfig, cornerLength: 0 })

  const updateConfig = (newConfig: Partial<Config>) => {
    setConfig((prevConfig) => ({ ...prevConfig, ...newConfig }))
  }

  return <ConfigContext.Provider value={{ config, updateConfig }}>{children}</ConfigContext.Provider>
}

export const useConfig = () => useContext(ConfigContext)
