import { isValidElement } from "react"

export const isNum = v => typeof v === "number" && !isNaN(v)

export const isStr = v => typeof v === "string"

export const isFn = v => typeof v === "function"

export const parseClassName = v => (isStr(v) || isFn(v) ? v : null)

export const getAutoCloseDelay = (toastAutoClose, containerAutoClose) =>
  toastAutoClose === false || (isNum(toastAutoClose) && toastAutoClose > 0)
    ? toastAutoClose
    : containerAutoClose

export const canBeRendered = content =>
  isValidElement(content) || isStr(content) || isFn(content) || isNum(content)
