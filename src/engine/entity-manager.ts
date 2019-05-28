import { Entity } from './entity'
import { Component } from './component'

/**
 * Manages entities on behalf of the game engine.
 */
export class EntityManager implements Iterable<Entity> {
  private entitiesToAdd: Entity[] = []
  private entitiesToRemove: number[] = []

  private constructor (
    private entities: Entity[]
  ) {}

  /**
   * Builds an entity manager that is empty.
   *
   * ```ts
   * const entityManager = EntityManager.build()
   * ```
   * @returns An entity manager
   */
  public static build (): EntityManager {
    return new this([])
  }

  /**
   * Creates a new entity manager by this entity manager associating the given
   * components to the created entity.
   *
   * An entity that is created by the manager will not immediately be
   * accessible, but will instead require the entity manager to be flushed to
   * persist the changes.
   *
   * ```ts
   * const playerEntity = entityManager
   *   .create(new Position(0, 0), new Health(10))
   *   .with(new Poisoned(3))
   *
   * // entityManager does not contain playerEntity right now
   *
   * entityManager.flush()
   *
   * /// entityManager now contains playerEntity
   * ```
   * @param components The components to associate with the entity
   * @returns The entity
   */
  public create (...components: Component[]): Entity {
    const entity = Entity.build(...components)
    this.entitiesToAdd.push(entity)
    return entity
  }

  /**
   * Removes the given entities from the entity manager.
   *
   * A removed entity will no be immediately inaccessible, but will instead
   * require the entity manager to be flushed to persist the changes.
   *
   * ```ts
   * entityManager.remove(playerEntity)
   *
   * /// playerEntity is still in the entityManager
   *
   * entityManager.flush()
   *
   * // playerEntity is not longer in the entityManager
   * ```
   * @param entities The entities to remove
   */
  public remove (...entities: Entity[]): void {
    for (const entity of entities) {
      let index = this.entities.indexOf(entity)

      if (index !== -1) {
        this.entitiesToRemove.push(index)
      }

      index = this.entitiesToAdd.indexOf(entity)

      if (index !== -1) {
        this.entitiesToAdd.splice(index, 1)
      }
    }
  }

  /**
   * Flushes the changes to the entity manager.
   */
  public flush (): void {
    this.entitiesToRemove = this.entitiesToRemove.sort((a, b) => b - a)

    for (const index of this.entitiesToRemove) {
      this.entities.splice(index, 1)
    }

    this.entities.push(...this.entitiesToAdd)

    this.entitiesToAdd = []
    this.entitiesToRemove = []
  }

  /**
   * Iterate over the entities present in this entity manager
   *
   * ```ts
   * for (const entity of entityManager) {
   *   // ...
   * }
   * ```
   * @returns An iterator
   */
  [Symbol.iterator] (): Iterator<Entity> {
    return this.entities[Symbol.iterator]()
  }
}
