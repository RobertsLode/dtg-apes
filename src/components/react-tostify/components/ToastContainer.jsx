// https://github.com/yannickcr/eslint-plugin-react/issues/3140
/* eslint react/prop-types: "off" */
import React, { forwardRef, useEffect } from "react"
import cx from "clsx"

import { Toast } from "./Toast.jsx"
import { CloseButton } from "./CloseButton.jsx"
import { Bounce } from "./Transitions.jsx"
import { Direction, Default, parseClassName, isFn } from "../utils"
import { useToastContainer } from "../hooks/useToastContainer"

export const ToastContainer = forwardRef((props, ref) => {
  const { getToastToRender, containerRef, isToastActive } = useToastContainer(
    props
  )
  const { className, style, rtl, containerId } = props

  function getClassName(position) {
    const defaultClassName = cx(
      `${Default.CSS_NAMESPACE}__toast-container`,
      `${Default.CSS_NAMESPACE}__toast-container--${position}`,
      { [`${Default.CSS_NAMESPACE}__toast-container--rtl`]: rtl }
    )
    return isFn(className)
      ? className({
        position,
        rtl,
        defaultClassName
      })
      : cx(defaultClassName, parseClassName(className))
  }

  useEffect(() => {
    if (ref) {
      ref.current = containerRef.current
    }
  }, [])

  return (
    <div ref={containerRef} className={Default.CSS_NAMESPACE} id={containerId}>
      {getToastToRender((position, toastList) => {
        const containerStyle = !toastList.length
          ? { ...style, pointerEvents: "none" }
          : { ...style }

        return (
          <div
            className={getClassName(position)}
            style={containerStyle}
            key={`container-${position}`}
          >
            {toastList.map(({ content, props: toastProps }, i) => {
              return (
                <Toast
                  {...toastProps}
                  isIn={isToastActive(toastProps.toastId)}
                  style={{
                    ...toastProps.style,
                    "--nth": i + 1,
                    "--len": toastList.length
                  }}
                  key={`toast-${toastProps.key}`}
                >
                  {content}
                </Toast>
              )
            })}
          </div>
        )
      })}
    </div>
  )
})

ToastContainer.displayName = "ToastContainer"

ToastContainer.defaultProps = {
  position: "top-right",
  transition: Bounce,
  autoClose: 5000,
  closeButton: CloseButton,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  closeOnClick: true,
  draggable: true,
  draggablePercent: Default.DRAGGABLE_PERCENT,
  draggableDirection: Direction.X,
  role: "alert",
  theme: "light"
}
