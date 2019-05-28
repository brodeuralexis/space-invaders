import { Component, ComponentClass, ComponentType } from './component'

/**
 * An entity used by the game.
 *
 * An entity holds and controls a group of components to be used by systems.
 * Entities and their respective components are the state of the game.
 */
export class Entity {
  private components: Map<ComponentClass<any>, Component> = new Map()

  private constructor (components: Component[]) {
    for (const component of components) {
      this.with(component)
    }
  }

  /**
   * Builds an entity with the given components associated with it.
   *
   * ```ts
   * const playerEntity = Entity.build()
   * ```
   * @param components The components to put in the entity
   * @returns An entity
   */
  public static build (...components: Component[]): Entity {
    return new this(components)
  }

  /**
   * Associates the given component to this entity.
   *
   * If there already is a component of the same class associated with this
   * entity, the one provided to this method will override the existing one.
   *
   * ```ts
   * playerEntity
   *   .with(new Healh(10))
   *   .with(new Position(0, 0))
   *   .with(new Poisoned(2))
   * ```
   * @param component A component
   * @returns A reference to this entity
   */
  public with<C extends Component> (component: C): this {
    this.components.set(component.constructor as ComponentClass<C>, component)
    return this
  }

  /**
   * Dissociates the given component from this entity using its class.
   *
   * If no components of the given class exist on this entity, this operation is
   * a noop.
   *
   * ```ts
   * playerEntity.without(Poisoned)
   * ```
   * @param componentClass A component's class
   * @returns A reference to this entity
   */
  public without<CC extends ComponentClass<any>> (componentClass: CC): this {
    this.components.delete(componentClass)
    return this
  }

  /**
   * Returns the amount of components in this entity.
   *
   * ```ts
   * const playerEntity = Entity.build()
   *   .with(new Health(10))
   *   .with(new Position(0, 0))
   *
   * expect(playerEntity.size).toBe(2)
   * ```
   */
  public get size (): number {
    return this.components.size
  }

  /**
   * Returns a component with the given class from this entity.
   *
   * If no such component exists, `null` is returned instead.
   *
   * ```ts
   * const healthComponent = playerEntity.get(Health)
   *
   * expect(healthComponent).not.toBe(null)
   * ```
   * @param componentClass A component's class
   * @returns The component of the given class
   */
  public get<CC extends ComponentClass<any>> (componentClass: CC): ComponentType<CC> | null {
    return (this.components.get(componentClass) || null) as ComponentType<CC> | null
  }
}
