import React, { useEffect, useLayoutEffect, useRef } from "react"
import { collapseToast } from "./collapseToast"
import { Default, SyntheticEvent } from "./constant"

var AnimationStep

  ; (function (AnimationStep) {
    AnimationStep[(AnimationStep["Enter"] = 0)] = "Enter"
    AnimationStep[(AnimationStep["Exit"] = 1)] = "Exit"
  })(AnimationStep || (AnimationStep = {}))

/**
 * Css animation that just work.
 * You could use animate.css for instance
 *
 *
 * ```
 * cssTransition({
 *   enter: "animate__animated animate__bounceIn",
 *   exit: "animate__animated animate__bounceOut"
 * })
 * ```
 *
 */
export function cssTransition({
  enter,
  exit,
  appendPosition = false,
  collapse = true,
  collapseDuration = Default.COLLAPSE_DURATION
}) {
  return function ToastTransition({
    children,
    position,
    preventExitTransition,
    done,
    nodeRef,
    isIn
  }) {
    const enterClassName = appendPosition ? `${enter}--${position}` : enter
    const exitClassName = appendPosition ? `${exit}--${position}` : exit
    const animationStep = useRef(AnimationStep.Enter)

    useLayoutEffect(() => {
      const node = nodeRef.current
      const classToToken = enterClassName.split(" ")

      const onEntered = e => {
        if (e.target !== nodeRef.current) return

        node.dispatchEvent(new Event(SyntheticEvent.ENTRANCE_ANIMATION_END))
        node.removeEventListener("animationend", onEntered)
        node.removeEventListener("animationcancel", onEntered)
        if (
          animationStep.current === AnimationStep.Enter &&
          e.type !== "animationcancel"
        ) {
          node.classList.remove(...classToToken)
        }
      }

      const onEnter = () => {
        node.classList.add(...classToToken)
        node.addEventListener("animationend", onEntered)
        node.addEventListener("animationcancel", onEntered)
      }

      onEnter()
    }, [])

    useEffect(() => {
      const node = nodeRef.current

      const onExited = () => {
        node.removeEventListener("animationend", onExited)
        collapse ? collapseToast(node, done, collapseDuration) : done()
      }

      const onExit = () => {
        animationStep.current = AnimationStep.Exit
        node.className += ` ${exitClassName}`
        node.addEventListener("animationend", onExited)
      }

      if (!isIn) preventExitTransition ? onExited() : onExit()
    }, [isIn])

    return <>{children}</>
  }
}
