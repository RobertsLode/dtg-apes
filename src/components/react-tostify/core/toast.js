import { POSITION, TYPE, isStr, isNum, isFn, Type } from "../utils"
import { eventManager, Event } from "./eventManager"

let containers = new Map()
let latestInstance
let queue = []
let TOAST_ID = 1

/**
 * Get the toast by id, given it's in the DOM, otherwise returns null
 */
function getToast(toastId, { containerId }) {
  const container = containers.get(containerId || latestInstance)
  return container && container.getToast(toastId)
}

/**
 * Generate a random toastId
 */
function generateToastId() {
  return `${TOAST_ID++}`
}

/**
 * Generate a toastId or use the one provided
 */
function getToastId(options) {
  return options && (isStr(options.toastId) || isNum(options.toastId))
    ? options.toastId
    : generateToastId()
}

/**
 * If the container is not mounted, the toast is enqueued and
 * the container lazy mounted
 */
function dispatchToast(content, options) {
  if (containers.size > 0) {
    eventManager.emit(Event.Show, content, options)
  } else {
    queue.push({ content, options })
  }

  return options.toastId
}

/**
 * Merge provided options with the defaults settings and generate the toastId
 */
function mergeOptions(type, options) {
  return {
    ...options,
    type: (options && options.type) || type,
    toastId: getToastId(options)
  }
}

function createToastByType(type) {
  return (content, options) =>
    dispatchToast(content, mergeOptions(type, options))
}

function toast(content, options) {
  return dispatchToast(content, mergeOptions(Type.DEFAULT, options))
}

toast.loading = (content, options) =>
  dispatchToast(
    content,
    mergeOptions(Type.DEFAULT, {
      isLoading: true,
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
      ...options
    })
  )

function handlePromise(promise, { pending, error, success }, options) {
  let id

  if (pending) {
    id = isStr(pending)
      ? toast.loading(pending, options)
      : toast.loading(pending.render, {
        ...options,
        ...pending
      })
  }

  const resetParams = {
    isLoading: null,
    autoClose: null,
    closeOnClick: null,
    closeButton: null,
    draggable: null,
    delay: 100
  }

  const resolver = (type, input, result) => {
    // Remove the toast if the input has not been provided. This prevents the toast from hanging
    // in the pending state if a success/error toast has not been provided.
    if (input == null) {
      toast.dismiss(id)
      return
    }

    const baseParams = {
      type,
      ...resetParams,
      ...options,
      data: result
    }
    const params = isStr(input) ? { render: input } : input

    // if the id is set we know that it's an update
    if (id) {
      toast.update(id, {
        ...baseParams,
        ...params
      })
    } else {
      // using toast.promise without loading
      toast(params.render, {
        ...baseParams,
        ...params
      })
    }

    return result
  }

  const p = isFn(promise) ? promise() : promise

  //call the resolvers only when needed
  p.then(result => resolver("success", success, result)).catch(err =>
    resolver("error", error, err)
  )

  return p
}

toast.promise = handlePromise
toast.success = createToastByType(Type.SUCCESS)
toast.info = createToastByType(Type.INFO)
toast.error = createToastByType(Type.ERROR)
toast.warning = createToastByType(Type.WARNING)
toast.warn = toast.warning
toast.dark = (content, options) =>
  dispatchToast(
    content,
    mergeOptions(Type.DEFAULT, {
      theme: "dark",
      ...options
    })
  )

/**
 * Remove toast programmaticaly
 */
toast.dismiss = id => {
  if (containers.size > 0) {
    eventManager.emit(Event.Clear, id)
  } else {
    queue = queue.filter(t => id != null && t.options.toastId !== id)
  }
}

/**
 * Clear waiting queue when limit is used
 */
toast.clearWaitingQueue = (params = {}) =>
  eventManager.emit(Event.ClearWaitingQueue, params)

/**
 * return true if one container is displaying the toast
 */
toast.isActive = id => {
  let isToastActive = false

  containers.forEach(container => {
    if (container.isToastActive && container.isToastActive(id)) {
      isToastActive = true
    }
  })

  return isToastActive
}

toast.update = (toastId, options = {}) => {
  // if you call toast and toast.update directly nothing will be displayed
  // this is why I defered the update
  setTimeout(() => {
    const toast = getToast(toastId, options)
    if (toast) {
      const { props: oldOptions, content: oldContent } = toast

      const nextOptions = {
        ...oldOptions,
        ...options,
        toastId: options.toastId || toastId,
        updateId: generateToastId()
      }

      if (nextOptions.toastId !== toastId) nextOptions.staleId = toastId

      const content = nextOptions.render || oldContent
      delete nextOptions.render

      dispatchToast(content, nextOptions)
    }
  }, 0)
}

/**
 * Used for controlled progress bar.
 */
toast.done = id => {
  toast.update(id, {
    progress: 1
  })
}

/**
 * Subscribe to change when a toast is added, removed and updated
 *
 * Usage:
 * ```
 * const unsubscribe = toast.onChange((payload) => {
 *   switch (payload.status) {
 *   case "added":
 *     // new toast added
 *     break;
 *   case "updated":
 *     // toast updated
 *     break;
 *   case "removed":
 *     // toast has been removed
 *     break;
 *   }
 * })
 * ```
 */
toast.onChange = callback => {
  eventManager.on(Event.Change, callback)
  return () => {
    eventManager.off(Event.Change, callback)
  }
}

/**
 * @deprecated
 * Will be removed in the next major release.
 */
toast.POSITION = POSITION

/**
 * @deprecated
 * Will be removed in the next major release.
 */
toast.TYPE = TYPE

/**
 * Wait until the ToastContainer is mounted to dispatch the toast
 * and attach isActive method
 */
eventManager
  .on(Event.DidMount, containerInstance => {
    latestInstance = containerInstance.containerId || containerInstance
    containers.set(latestInstance, containerInstance)

    queue.forEach(item => {
      eventManager.emit(Event.Show, item.content, item.options)
    })

    queue = []
  })
  .on(Event.WillUnmount, containerInstance => {
    containers.delete(containerInstance.containerId || containerInstance)

    if (containers.size === 0) {
      eventManager
        .off(Event.Show)
        .off(Event.Clear)
        .off(Event.ClearWaitingQueue)
    }
  })

export { toast }
