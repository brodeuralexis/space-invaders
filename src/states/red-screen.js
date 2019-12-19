import { State } from '../state.js'
import { BlueScreen } from './blue-screen.js'

export class RedScreen extends State {
  /**
   * Draws a red screen upon the given rendering context.
   *
   * @param {CanvasRenderingContext2D} context The rendering context
   * @param {HTMLCanvasElement} canvas The canvas
   */
  draw (context, canvas) {
    context.fillStyle = 'red'
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  tick () {
    if (this.keys.isDown('Space')) {
      this.states.replace(new BlueScreen())
    }
  }
}
