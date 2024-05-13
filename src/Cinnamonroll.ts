import type { Configs } from './type'

function Cinnamonroll (element: HTMLElement, configs: Configs) {
  const initialize = () => {
    console.log('Initializing', element, configs)
  }

  return {
    initialize
  }
}

export default Cinnamonroll