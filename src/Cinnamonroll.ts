import type { Configs } from './type'

// default configs
const defaultConfigs = {
  resizeable: true,
  speed: 0.75,
  radius: 20,
  scrollShow: true,
  scrollPadding: 100
}

function Cinnamonroll (element: HTMLElement, configs: Configs) {
  const CONFIGS = Object.assign(defaultConfigs, configs)
  const scroller = element.querySelector('#scroller')

  const initialize = () => {
    // 초기 설정값을 적용하는 함수
    console.log('Initializing', element, CONFIGS)

    syncScrollBar()
    updateConfigs()
  }

  const syncScrollBar = () => {
    // 스크롤바 svg 관련 설정
    // configs에 정의된 내용을 기준으로 스크롤 정의하는 함수
  }

  const updateConfigs = () => {
    // configs 설정을 업데이트하고 변경사항을 반영하는 함수
  }

  return {
    initialize
  }
}

export default Cinnamonroll