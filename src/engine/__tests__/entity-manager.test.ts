import { EntityManager } from '../entity-manager'

describe('an `EntityManager`', function () {
  describe('that is being built using `build/0`', function () {
    it('should be empty', function () {
      const entityManager = EntityManager.build()

      expect(Array.from(entityManager)).toStrictEqual([])
    })
  })

  describe('has a `create/1` method that', function () {
    it('should schedule the given entity for creation', function () {
      const entityManager = EntityManager.build()

      entityManager.create()

      expect(Array.from(entityManager)).toStrictEqual([])
    })

    it('should create the entity when the entity manager is flushed', function () {
      const entityManager = EntityManager.build()

      const playerEntity = entityManager.create()
      const enemyEntity = entityManager.create()
      const bulletEntity = entityManager.create()

      expect(Array.from(entityManager)).toStrictEqual([])

      entityManager.flush()

      expect(Array.from(entityManager)).toStrictEqual([playerEntity, enemyEntity, bulletEntity])
    })
  })

  describe('has a `remove/0..*` method that', function () {
    it('should schedule the entity for removal', function () {
      const entityManager = EntityManager.build()

      const playerEntity = entityManager.create()
      const enemyEntity = entityManager.create()
      const bulletEntity = entityManager.create()
      entityManager.flush()

      entityManager.remove(playerEntity)

      expect(Array.from(entityManager)).toStrictEqual([playerEntity, enemyEntity, bulletEntity])
    })

    it('should remove the entity when the entity manager is flushed', function () {
      const entityManager = EntityManager.build()

      const playerEntity = entityManager.create()
      const enemyEntity = entityManager.create()
      const bulletEntity = entityManager.create()
      entityManager.flush()

      entityManager.remove(playerEntity, bulletEntity)

      entityManager.flush()

      expect(Array.from(entityManager)).toStrictEqual([enemyEntity])
    })

    it('should remove an entity scheduled to be created directly', function () {
      const entityManager = EntityManager.build()

      const playerEntity = entityManager.create()
      const enemyEntity = entityManager.create()
      const bulletEntity = entityManager.create()
      entityManager.remove(playerEntity, bulletEntity)

      entityManager.flush()

      expect(Array.from(entityManager)).toStrictEqual([enemyEntity])
    })
  })

  describe('has a `flush/0` method that', function () {
    it('should persist the changes made to the entity manager since the last flush', function () {
      const entityManager = EntityManager.build()

      const playerEntity = entityManager.create()
      const enemyEntity = entityManager.create()
      const bulletEntity = entityManager.create()

      entityManager.flush()

      expect(Array.from(entityManager)).toStrictEqual([playerEntity, enemyEntity, bulletEntity])

      entityManager.remove(enemyEntity)

      entityManager.flush()

      expect(Array.from(entityManager)).toStrictEqual([playerEntity, bulletEntity])
    })
  })
})
