import React, { cloneElement, isValidElement } from "react"
import cx from "clsx"

import { ProgressBar } from "./ProgressBar.jsx"
import { CloseButton } from "./CloseButton.jsx"
import { Default, isFn } from "../utils"
import { useToastify } from "../hooks/useToast"

export const Toast = props => {
  const {
    isRunning,
    preventExitTransition,
    toastRef,
    eventHandlers
  } = useToastify(props)
  const {
    closeButton,
    children,
    autoClose,
    onClick,
    type,
    hideProgressBar,
    closeToast,
    transition: Transition,
    position,
    className,
    style,
    bodyClassName,
    bodyStyle,
    progressClassName,
    progressStyle,
    updateId,
    role,
    progress,
    rtl,
    toastId,
    deleteToast,
    isIn,
    isLoading,
    iconOut,
    closeOnClick,
    theme
  } = props
  const defaultClassName = cx(
    `${Default.CSS_NAMESPACE}__toast`,
    `${Default.CSS_NAMESPACE}__toast-theme--${theme}`,
    `${Default.CSS_NAMESPACE}__toast--${type}`,
    {
      [`${Default.CSS_NAMESPACE}__toast--rtl`]: rtl
    },
    {
      [`${Default.CSS_NAMESPACE}__toast--close-on-click`]: closeOnClick
    }
  )
  const cssClasses = isFn(className)
    ? className({
      rtl,
      position,
      type,
      defaultClassName
    })
    : cx(defaultClassName, className)
  const isProgressControlled = !!progress || !autoClose

  const closeButtonProps = { closeToast, type, theme }
  let Close = null

  if (closeButton === false) {
    // hide
  } else if (isFn(closeButton)) {
    Close = closeButton(closeButtonProps)
  } else if (isValidElement(closeButton)) {
    Close = cloneElement(closeButton, closeButtonProps)
  } else {
    Close = CloseButton(closeButtonProps)
  }

  return (
    <Transition
      isIn={isIn}
      done={deleteToast}
      position={position}
      preventExitTransition={preventExitTransition}
      nodeRef={toastRef}
    >
      <div
        id={toastId}
        onClick={onClick}
        className={cssClasses}
        {...eventHandlers}
        style={style}
        ref={toastRef}
      >
        <div
          {...(isIn && { role: role })}
          className={
            isFn(bodyClassName)
              ? bodyClassName({ type })
              : cx(`${Default.CSS_NAMESPACE}__toast-body`, bodyClassName)
          }
          style={bodyStyle}
        >
          {iconOut != null && (
            <div
              className={cx(`${Default.CSS_NAMESPACE}__toast-icon`, {
                [`${Default.CSS_NAMESPACE}--animate-icon ${Default.CSS_NAMESPACE}__zoom-enter`]: !isLoading
              })}
            >
              {iconOut}
            </div>
          )}
          <div>{children}</div>
        </div>
        {Close}
        <ProgressBar
          {...(updateId && !isProgressControlled
            ? { key: `pb-${updateId}` }
            : {})}
          rtl={rtl}
          theme={theme}
          delay={autoClose}
          isRunning={isRunning}
          isIn={isIn}
          closeToast={closeToast}
          hide={hideProgressBar}
          type={type}
          style={progressStyle}
          className={progressClassName}
          controlledProgress={isProgressControlled}
          progress={progress || 0}
        />
      </div>
    </Transition>
  )
}
