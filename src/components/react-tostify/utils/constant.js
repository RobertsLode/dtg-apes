/**
 * @deprecated
 */
export const POSITION = {
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  TOP_CENTER: "top-center",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_CENTER: "bottom-center"
}

/**
 * @deprecated
 */
export const TYPE = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
  DEFAULT: "default"
}

export let Type

  ; (function (Type) {
    Type["INFO"] = "info"
    Type["SUCCESS"] = "success"
    Type["WARNING"] = "warning"
    Type["ERROR"] = "error"
    Type["DEFAULT"] = "default"
  })(Type || (Type = {}))

export let Default

  ; (function (Default) {
    Default[(Default["COLLAPSE_DURATION"] = 300)] = "COLLAPSE_DURATION"
    Default[(Default["DEBOUNCE_DURATION"] = 50)] = "DEBOUNCE_DURATION"
    Default["CSS_NAMESPACE"] = "Toastify"
    Default[(Default["DRAGGABLE_PERCENT"] = 80)] = "DRAGGABLE_PERCENT"
  })(Default || (Default = {}))

export let Direction

  ; (function (Direction) {
    Direction["X"] = "x"
    Direction["Y"] = "y"
  })(Direction || (Direction = {}))

export let SyntheticEvent

  ; (function (SyntheticEvent) {
    SyntheticEvent["ENTRANCE_ANIMATION_END"] = "d"
  })(SyntheticEvent || (SyntheticEvent = {}))
