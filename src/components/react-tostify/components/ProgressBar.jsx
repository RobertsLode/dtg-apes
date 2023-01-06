import React from "react"
import cx from "clsx"

import { Default, isFn, Type } from "../utils"

export function ProgressBar({
  delay,
  isRunning,
  closeToast,
  type = Type.DEFAULT,
  hide,
  className,
  style: userStyle,
  controlledProgress,
  progress,
  rtl,
  isIn,
  theme
}) {
  const isHidden = hide || (controlledProgress && progress === 0)
  const style = {
    ...userStyle,
    animationDuration: `${delay}ms`,
    animationPlayState: isRunning ? "running" : "paused",
    opacity: isHidden ? 0 : 1
  }

  if (controlledProgress) style.transform = `scaleX(${progress})`
  const defaultClassName = cx(
    `${Default.CSS_NAMESPACE}__progress-bar`,
    controlledProgress
      ? `${Default.CSS_NAMESPACE}__progress-bar--controlled`
      : `${Default.CSS_NAMESPACE}__progress-bar--animated`,
    `${Default.CSS_NAMESPACE}__progress-bar-theme--${theme}`,
    `${Default.CSS_NAMESPACE}__progress-bar--${type}`,
    {
      [`${Default.CSS_NAMESPACE}__progress-bar--rtl`]: rtl
    }
  )
  const classNames = isFn(className)
    ? className({
      rtl,
      type,
      defaultClassName
    })
    : cx(defaultClassName, className)

  // 🧐 controlledProgress is derived from progress
  // so if controlledProgress is set
  // it means that this is also the case for progress
  const animationEvent = {
    [controlledProgress && progress >= 1
      ? "onTransitionEnd"
      : "onAnimationEnd"]:
      controlledProgress && progress < 1
        ? null
        : () => {
          isIn && closeToast()
        }
  }

  // TODO: add aria-valuenow, aria-valuemax, aria-valuemin

  return (
    <div
      role="progressbar"
      aria-hidden={isHidden ? "true" : "false"}
      aria-label="notification timer"
      className={classNames}
      style={style}
      {...animationEvent}
    />
  )
}
