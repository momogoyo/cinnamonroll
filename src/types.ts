export interface Config {
  show?: boolean
  radius?: number
  scrollPadding?: number
  stroke?: number
  inset?: number
  trail?: number
  track?: boolean
  thumb?: number
  finish?: number
  alpha?: number
  trackAlpha?: number
  cornerLength?: number
}

export interface ConfigContextProps {
  config: Config
  updateConfig: (newConfig: Partial<Config>) => void
}
