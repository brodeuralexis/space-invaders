import { Required, Optional, Family } from '../family'
import { Entity } from '../entity'

class Health {
  public constructor (
    public value: number
  ) {}
}

class Position {
  public constructor (
    public x: number,
    public y: number
  ) {}
}

class Velocity {
  public constructor (
    public xVelocity: number,
    public yVelocity: number
  ) {}
}

describe('the `Required/1` function', function () {
  it('should return the given component class', function () {
    expect(Required(Velocity)).toBe(Velocity)
  })
})

describe('the `Optional/1` function', function () {
  it('should return a component query', function () {
    expect(Optional(Position)).toStrictEqual({ optional: Position })
  })
})

describe('a `Family`', function () {
  describe('that is being built using `build/1`', function () {
    it('should return a family with the given query', function () {
      expect(Family.build({ health: Health })).toBeInstanceOf(Family)
    })
  })

  describe('has a `get/1` method that', function () {
    it('should return a result if the entity matches the family', function () {
      const movementFamily = Family.build({
        position: Required(Position),
        velocity: Required(Velocity)
      })

      const position = new Position(0, 10)
      const velocity = new Velocity(20, 4)

      const playerEntity = Entity.build(
        position,
        velocity
      )

      expect(movementFamily.get(playerEntity)).toStrictEqual({
        position,
        velocity
      })
    })

    it('should return `null` if the entity does not match the family', function () {
      const movementFamily = Family.build({
        position: Optional(Position),
        velocity: Required(Velocity)
      })

      const position = new Position(0, 10)

      const playerEntity = Entity.build(position)

      expect(movementFamily.get(playerEntity)).toBe(null)
    })
  })

  describe('has an `all/1` method that', function () {
    it('should accept an iterable of entities and return a iterator of all the entities matching this family', function () {
      const movementFamily = Family.build({
        position: Required(Position),
        velocity: Required(Velocity)
      })

      const position = new Position(0, 0)
      const velocity = new Velocity(1, 1)

      let entities = movementFamily.all([
        Entity.build(position, velocity),
        Entity.build(velocity),
        Entity.build(position, velocity),
        Entity.build(position, velocity),
        Entity.build(position)
      ])

      expect(Array.from(entities).length).toBe(3)
    })
  })
})
