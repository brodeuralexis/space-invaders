import { Game } from './game.js'

/**
 * A state manages the updating and rendering of some data for a specific
 * context of the application.
 *
 * Such a context might be the "Main Menu", a "Splash Screen", etc.
 */
export class State {
  /**
   * The game instance.
   * @type {Game}
   */
  _game = undefined

  /**
   * The states that are managed by the game this state currently is in.
   * @type {Game['_states']}
   */
  get states () {
    return this._game._states
  }

  /**
   * The keys that are managed by the game this state currently is in.
   * @type {Game['_keys']}
   */
  get keys () {
    return this._game._keys
  }

  /**
   * Notifier for when the state is first pushed unto the state manager.
   */
  onEnter () {
    /// empty
  }

  /**
   * Notifier for when a state leaves the state manager.
   */
  onLeave () {
    /// empty
  }

  /**
   * Notifier for when the state is paused.
   *
   * A paused state is a current state that is being shadowed by a new pushed
   * state unto the state manager.
   */
  onPause () {
    /// empty
  }

  /**
   * Notifier for when the state is resumed.
   *
   * A resumed state is a state under the current state of the state manager
   * that is being brought since the current state was popped.
   */
  onResume () {
    /// empty
  }

  /**
   * Draws this state unto the given canvas by the use of the given rendering
   * context.
   * @param {CanvasRenderingContext2D} _context The rendering context
   * @param {HTMLCanvasElement} _canvas The canvas upon which to draw
   */
  draw (_context, _canvas) {
    /// empty
  }

  /**
   * Advances the state of this instance by a delta since the last tick.
   * @param {number} delta The elapsed time since the last tick
   */
  tick (_delta) {
    /// empty
  }
}
