import './style.css'
import Cinnamonroll from './Cinnamonroll'

import type { Configs } from './type'

const element = document.querySelector('#cinnamon') as HTMLElement
const configs: Configs = {
  resizeable: true,
  speed: 0.5,
  radius: 32,
  scrollShow: true,
  scrollPadding: 100,
}

const cinnamonroll = Cinnamonroll(element, configs)

cinnamonroll.initialize()