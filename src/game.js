import { State } from './state.js'
import { StateManager } from './state-manager.js'
import { KeyManager } from './key-manager.js'

import { RedScreen } from './states/red-screen.js'

export class Game {
  /**
   * Creates a new game instance that will render upon the given canvas element.
   * @param {HTMLCanvasElement} canvas The canvas upon which to render the game
   */
  constructor (canvas) {
    this._canvas = canvas

    const context = canvas.getContext('2d')

    if (context == null) {
      throw new Error(`Unsupported rendering context: 2d`)
    }

    this._keys = new KeyManager()
    this._states = new StateManager(this, new RedScreen())

    this._context = context
  }

  run () {
    const state = {
      previous: performance.now()
    }

    this._run(state)
  }

  async _run (state) {
    const current = performance.now()
    let delta = current - state.previous

    const currentState = this._states.current
    currentState.tick(delta)
    currentState.draw(this._context, this._canvas)

    requestAnimationFrame(() => this._run(state))
  }

  /**
   * Updates the state of the application by the given elapsed time.
   * @param {number} delta The elapsed time since the last draw.
   */
  tick (delta) {
    this._keys.tick()
    this._states.tick()
  }

  /**
   * Draws this state upon the rendering canvas using the given context.
   * @param {CanvasRenderingContext2D} context The rendering context
   * @param {HTMLCanvasElement} canvas The rendering canvas
   */
  draw (context, canvas) {
    this._states.draw()
  }
}
