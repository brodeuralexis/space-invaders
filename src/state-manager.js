
import { State } from './state.js'
import { Game } from './game.js'

/**
 * A manager for all the states of the application.
 *
 * An instance of this class behaves as a stack of states.  A stack is a LIFO
 * data structure.
 *
 * This stack pushes and pops to the front of the stack instead of the back,
 * like most stack, as it simplifies the lookup operation.
 */
export class StateManager {
  /**
   * Creates a new state manager managing a single state initially.
   * @param {Game} game The game instance
   * @param {State} initialState An initial state for the application.
   */
  constructor (game, initialState) {
    this._game = game

    if (initialState == null) {
      throw new Error(`StateManager started without an initial state`)
    }

    this.states = [initialState]
  }

  /**
   * Pushes the given state to the top of the stack of this state manager,
   * making it the current state.
   * @param {State} state The state to push
   */
  push (state) {
    state._game = this._game

    this.current.onPause()
    this.states.unshift(state)
    state.onEnter()
  }

  /**
   * Pops a single state from the stack, returning it.
   * @returns {State} The returned state.
   */
  pop () {
    const state = this.states.shift()
    state.onLeave()
    this.current.onResume()

    state._game = undefined
    return state
  }

  /**
   * Replaces the current state with a new state, effectively taking its place
   * on top of the stack.
   * @param {State} newState The new current state
   * @returns {State} The previous current state
   */
  replace (newState) {
    newState._game = this._game

    const oldState = this.states.shift()
    oldState.onLeave()
    this.states.unshift(newState)
    newState.onEnter()

    oldState._game = this._game
    return oldState
  }

  /**
   * Returns the state at the given offset or the current state if none is
   * specified.
   * @param {number} offset An optional offset
   * @returns {State} A state
   */
  peek (offset = 0) {
    return this.states[offset]
  }

  /**
   * The current state
   * @type {State}
   */
  get current () {
    return this.states[0]
  }

  /**
   * Ticks the current state managed by this instance.
   * @param {number} delta The elapsed time since the last tick
   */
  tick (delta) {
    this.current.draw(delta)
  }

  /**
   * Draws the current state managed by this instance using the provided context
   * and canvas.
   * @param {CanvasRenderingContext2D} context The rendering context
   * @param {HTMLCanvasElement} canvas The canvas element
   */
  draw (context, canvas) {
    this.current.draw(contet, canvas)
  }
}
