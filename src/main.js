import { Game } from './game.js'

export async function main (canvas) {
  const game = new Game(canvas)

  console.log(canvas)

  game.run()
}
