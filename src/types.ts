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
}

export interface ConfigContextProps {
  config: Config & { cornerLength: number }
  updateConfig: (newConfig: Config) => void
}
