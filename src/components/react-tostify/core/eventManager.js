export let Event

  ; (function (Event) {
    Event[(Event["Show"] = 0)] = "Show"
    Event[(Event["Clear"] = 1)] = "Clear"
    Event[(Event["DidMount"] = 2)] = "DidMount"
    Event[(Event["WillUnmount"] = 3)] = "WillUnmount"
    Event[(Event["Change"] = 4)] = "Change"
    Event[(Event["ClearWaitingQueue"] = 5)] = "ClearWaitingQueue"
  })(Event || (Event = {}))

export const eventManager = {
  list: new Map(),
  emitQueue: new Map(),

  on(event, callback) {
    this.list.has(event) || this.list.set(event, [])
    this.list.get(event).push(callback)
    return this
  },

  off(event, callback) {
    if (callback) {
      const cb = this.list.get(event).filter(cb => cb !== callback)
      this.list.set(event, cb)
      return this
    }
    this.list.delete(event)
    return this
  },

  cancelEmit(event) {
    const timers = this.emitQueue.get(event)
    if (timers) {
      timers.forEach(clearTimeout)
      this.emitQueue.delete(event)
    }

    return this
  },

  /**
   * Enqueue the event at the end of the call stack
   * Doing so let the user call toast as follow:
   * toast('1')
   * toast('2')
   * toast('3')
   * Without setTimemout the code above will not work
   */
  emit(event, ...args) {
    this.list.has(event) &&
      this.list.get(event).forEach(callback => {
        const timer = setTimeout(() => {
          // @ts-ignore
          callback(...args)
        }, 0)

        this.emitQueue.has(event) || this.emitQueue.set(event, [])
        this.emitQueue.get(event).push(timer)
      })
  }
}
