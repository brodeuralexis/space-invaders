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

describe('an `Entity`', function () {
  describe('that is being built using `build/0`', function () {
    it('should be empty', function () {
      const entity = Entity.build()

      expect(entity.size).toBe(0)
    })
  })

  describe('that is being build using `build/1..*`', function () {
    it('should contain the components used to build it', function () {
      const health = new Health(10)
      const position = new Position(2, 9)

      const entity = Entity.build(health, position)

      expect(entity.size).toBe(2)
      expect(entity.get(Health)).toBe(health)
      expect(entity.get(Position)).toBe(position)
    })
  })

  describe('has a `with/1` method that', function () {
    it('should associate the given component to the entity', function () {
      const entity = Entity.build()

      expect(entity.size).toBe(0)

      const health = new Health(10)
      entity.with(health)

      expect(entity.size).toBe(1)
      expect(entity.get(Health)).toBe(health)
    })

    it('should override an existing component if one of the same class is already present', function () {
      const originalPosition = new Position(1, 2)
      const entity = Entity.build(originalPosition)

      expect(entity.size).toBe(1)

      const replacingPosition = new Position(10, 100)
      entity.with(replacingPosition)

      expect(entity.size).toBe(1)
      expect(entity.get(Position)).not.toBe(originalPosition)
      expect(entity.get(Position)).toBe(replacingPosition)
    })
  })

  describe('has a `without/1` method that', function () {
    it('should dissociate the given component from the entity using its class', function () {
      const health = new Health(10)
      const position = new Position(2, 3)
      const entity = Entity.build(health, position)

      expect(entity.size).toBe(2)

      entity.without(Health)

      expect(entity.size).toBe(1)
      expect(entity.get(Health)).toBe(null)
    })

    it('should do nothing if no such component is associated with the entity', function () {
      const position = new Position(2, 3)
      const entity = Entity.build(position)

      expect(entity.size).toBe(1)

      entity.without(Health)

      expect(entity.size).toBe(1)
    })
  })

  describe('has a `size` property that', function () {
    it('should return the amount of components associated with the entity', function () {
      const health = new Health(10)
      const position = new Position(2, 3)
      const entity = Entity.build(health, position)

      expect(entity.size).toBe(2)

      entity.without(Health)

      expect(entity.size).toBe(1)

      entity.without(Position)

      expect(entity.size).toBe(0)
    })
  })

  describe('has a `get/1` method that', function () {
    it('should return the component associated with the entity that has the given class', function () {
      const health = new Health(10)
      const position = new Position(2, 3)
      const entity = Entity.build(health, position)

      expect(entity.get(Position)).toBe(position)
      expect(entity.get(Health)).toBe(health)
    })

    it('should return null if no such component is associated with the entity', function () {
      const health = new Health(10)
      const entity = Entity.build(health)

      expect(entity.get(Position)).toBe(null)
    })
  })
})
