import { State } from '../state.js'
import { RedScreen } from './red-screen.js'

export class BlueScreen extends State {
  /**
   * Draws a blue screen upon the given rendering context.
   *
   * @param {CanvasRenderingContext2D} context The rendering context
   * @param {HTMLCanvasElement} canvas The canvas
   */
  draw (context, canvas) {
    context.fillStyle = 'blue'
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  tick () {
    if (this.keys.isDown('Space')) {
      this.states.replace(new RedScreen())
    }
  }
}
