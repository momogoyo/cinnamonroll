import React, { useRef, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import gsap from 'gsap'
import { useConfig } from '../ContextConfig'

import type { Config } from '../../types'

interface ScrollBarProps {
  scrollerRef: React.RefObject<HTMLDivElement>
  setStyle: (value: string) => void
}

const ScrollBar: React.FC<ScrollBarProps> = ({ scrollerRef, setStyle }) => {
  const { config, updateConfig } = useConfig()
  const scrollbarRef = useRef<SVGSVGElement>(null)
  const scrollThumbRef = useRef<SVGPathElement>(null)
  const scrollTrackRef = useRef<SVGPathElement>(null)

  const generatePath = useCallback(
    (mid: number, innerRadius: number, paddingTop: number, paddingLeft: number) => {
      return `M${mid - config.trail!},${paddingTop} ${innerRadius === 0 ? `` : `L${mid},${paddingTop}`} ${
        innerRadius === 0
          ? `L${paddingLeft},${paddingTop}`
          : `a${innerRadius},${innerRadius} 0 0 1 ${innerRadius} ${innerRadius}`
      }`
    },
    [config.trail],
  )

  const generatePathCorners = useCallback(
    (mid: number, innerRadius: number, paddingTop: number, paddingLeft: number, container: HTMLDivElement) => {
      return `M${mid - config.trail!},${paddingTop} ${innerRadius === 0 ? `` : `L${mid},${paddingTop}`} ${
        innerRadius === 0
          ? `L${paddingLeft},${paddingTop}`
          : `a${innerRadius},${innerRadius} 0 0 1 ${innerRadius} ${innerRadius}`
      } L${paddingLeft},${container.offsetHeight - (config.inset! + config.stroke! * 0.5 + innerRadius)} ${
        innerRadius === 0
          ? `L${paddingLeft},${container.offsetHeight - (config.inset! + config.stroke! * 0.5)}`
          : `a${innerRadius},${innerRadius} 0 0 1 ${-innerRadius} ${innerRadius}`
      } L${mid - config.trail!},${container.offsetHeight - (config.inset! + config.stroke! * 0.5)}`
    },
    [config.trail, config.inset, config.stroke],
  )

  const setCSSVariables = useCallback(
    (variable: string, value: Config[keyof Config] | number) => {
      if (scrollerRef.current) {
        scrollerRef.current.style.setProperty(variable, String(value))
      }
    },
    [scrollerRef],
  )

  const initializeTimeline = (config: Config, scrollTrack: SVGPathElement | null) => {
    if (scrollerRef.current && scrollTrack) {
      const frameOne = `${Math.floor(config.scrollPadding! / (scrollerRef.current.scrollHeight - scrollerRef.current.offsetHeight)) * 100}%`
      const frameTwo = `${Math.floor(config.scrollPadding! / (scrollerRef.current.scrollHeight - scrollerRef.current.offsetHeight)) * 100}%`

      const keyframes = {
        '0%': { strokeDashOffset: config.thumb! - config.finish! },
        [frameOne]: { strokeDashOffset: config.cornerLength! * -1 },
        [frameTwo]: {
          strokeDashOffset: Math.floor(scrollTrack.getTotalLength()) - config.cornerLength! - config.thumb! * -1,
        },
        '100%': { strokeDashOffset: Math.floor(scrollTrack.getTotalLength() - config.finish!) * -1 },
      }

      gsap.to('.scroll-thumb', {
        scrollTrigger: {
          scroller: scrollerRef.current,
          scrub: true,
        },
        ease: 'none',
        keyframes,
      })
    }
  }

  const updateScrollBar = useCallback(
    (
      config: Config,
      scrollBar: SVGSVGElement | null,
      scrollThumb: SVGPathElement | null,
      scrollTrack: SVGPathElement | null,
      updateConfig: (newConfig: Partial<Config>) => void,
    ) => {
      const mid = config.radius!
      const innerRadius = Math.max(0, config.radius! - (config.inset! + config.stroke! * 0.5))
      const paddingTop = config.inset! + config.stroke! * 0.5
      const paddingLeft = config.radius! * 2 - paddingTop

      scrollBar?.setAttribute('viewBox', `0 0 ${config.radius! * 2} ${scrollerRef.current?.offsetHeight}`)
      setCSSVariables('--stroke-width', config.stroke)

      let d = generatePath(mid, innerRadius, paddingTop, paddingLeft)
      scrollThumb?.setAttribute('d', d)

      const cornerLength = scrollThumb?.getTotalLength()
      updateConfig({ cornerLength })

      d = generatePathCorners(mid, innerRadius, paddingTop, paddingLeft, scrollerRef.current as HTMLDivElement)
      scrollThumb?.setAttribute('d', d)
      scrollTrack?.setAttribute('d', d)

      const trackLength = scrollTrack?.getTotalLength() as number
      setCSSVariables('--track-length', Math.ceil(trackLength))
      setCSSVariables('--track-start', cornerLength)
      setCSSVariables('--start', config.thumb! * 2 + cornerLength!)
      setCSSVariables('--destination', Math.ceil(trackLength) - cornerLength! + config.thumb!)

      if (scrollerRef.current) {
        const style = `
          @keyframes scroll {
            0% { stroke-dashoffset: ${config.thumb! - config.finish!}; }
            ${Math.floor((config.scrollPadding! / (scrollerRef.current?.scrollHeight - scrollerRef.current?.offsetHeight)) * 100)}% { stroke-dashoffset: ${cornerLength! * -1}; }
            ${100 - Math.floor((config.scrollPadding! / (scrollerRef.current?.scrollHeight - scrollerRef.current?.offsetHeight)) * 100)}% { stroke-dashoffset: ${(Math.floor(trackLength) - cornerLength! - config.thumb!) * -1}; }
            100% { stroke-dashoffset: ${(Math.floor(trackLength) - config.finish!) * -1}; }
          }
        `

        console.log(style)
        setStyle(style)
      }
    },
    [generatePath, generatePathCorners, scrollerRef, setCSSVariables, setStyle],
  )

  useEffect(() => {
    const scrollBar = scrollbarRef.current
    const scrollThumb = scrollThumbRef.current
    const scrollTrack = scrollTrackRef.current

    updateScrollBar(config, scrollBar, scrollThumb, scrollTrack, updateConfig)

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        console.log(entry)
        updateScrollBar(config, scrollBar, scrollThumb, scrollTrack, updateConfig)
        initializeTimeline
      }
    })

    if (scrollerRef.current) {
      resizeObserver.observe(scrollerRef.current)
    }
  }, [])

  return (
    <>
      <ScrollBarContainer ref={scrollbarRef}>
        <ScrollBarThumb ref={scrollThumbRef} className="scroll-thumb" fill="none" strokeLinecap="round" />
        <ScrollBarTrack ref={scrollTrackRef} className="scroll-track" fill="none" strokeLinecap="round" />
      </ScrollBarContainer>
    </>
  )
}

const ScrollBarContainer = styled.svg`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0.5rem;
  pointer-events: none;
  width: calc(var(--radius) * 2px);
  height: 100%;
  overflow: visible;
`

const ScrollBarThumb = styled.path`
  transition: opacity 0.2s;

  stroke-width: calc(var(--stroke-width) * 2px);
  stroke: hsl(0, 0% 100% / var(--bar-alpha, 0.5)); // 색상 각도, 채도%, 밝기% / 알차 채널값 (투명도)
  stroke-dasharray: var(--thumb-size) var(--track-length);
`

const ScrollBarTrack = styled.path`
  transition: opacity 0.2s;

  stroke-width: calc(var(--stroke-width) * 2px);
  stroke: hsl(0, 0%, 100% / var(--track-alpha, 0));
`

export default ScrollBar
