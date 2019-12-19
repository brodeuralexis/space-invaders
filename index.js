import { main } from './src/main.js'

const canvas = document.getElementById('game')

Promise.resolve(main(canvas))
  .catch(error => console.error(error))
