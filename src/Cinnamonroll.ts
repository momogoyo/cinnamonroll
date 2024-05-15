import type { Configs } from './type'

// default configs


function Cinnamonroll (element: HTMLElement, configs: Configs) {
  const scroller = element.querySelector('#scroller')

  const initialize = () => {
    console.log('Initializing', element, configs)
  }

  return {
    initialize
  }
}

export default Cinnamonroll