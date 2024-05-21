import { PropsWithChildren, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { useConfig } from '../ContextConfig'
import ScrollBar from '../ScrollBar'

import type { Config } from '../../types'

const Scroller = ({ children }: PropsWithChildren) => {
  const { config, updateConfig } = useConfig()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const updateCSSVariable = (variable: string, value: string) => {
    if (!scrollerRef.current) return

    scrollerRef.current.style.setProperty(variable, value)
  }

  const update = (updatedConfig: Partial<Config>) => {
    const { radius, scrollPadding, thumb, alpha, trackAlpha, inset } = updatedConfig
    const cssVariables = {
      '--radius': radius,
      '--padding': scrollPadding,
      '--thumb-size': thumb,
      '--bar-alpha': alpha,
      '--track-alpha': trackAlpha,
    }
    let shouldUpdate = false

    Object.entries(cssVariables).forEach(([variable, value]) => {
      if (value !== undefined) {
        updateCSSVariable(variable, `${value}px`)
        shouldUpdate = true
      }
    })

    if (contentRef.current && scrollerRef.current && inset !== undefined && thumb !== undefined) {
      const destination =
        Math.ceil(contentRef.current.scrollHeight) -
        (Math.ceil(contentRef.current.scrollHeight) - scrollerRef.current.offsetHeight) * 0.5 +
        inset

      updateCSSVariable('--destination', `${destination}px`)
      updateCSSVariable('--start', `${thumb * 2}px`)

      shouldUpdate = true
    }

    if (shouldUpdate) {
      updateConfig(updatedConfig)
    }
  }

  useEffect(() => {
    update(config)
  }, [])

  return (
    <ScrollerContainer ref={scrollerRef} className="scroller">
      <ScrollBar />

      <div ref={contentRef} className="content">
        {children}
      </div>
    </ScrollerContainer>
  )
}

const ScrollerContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0 0.5rem 0 0;
  overflow: hidden;
  resize: both;
`

export default Scroller
