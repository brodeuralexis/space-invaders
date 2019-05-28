import { ComponentClass, ComponentType } from './component'
import { Entity } from './entity'

/**
 * The component query type for a required component.
 */
export type FamilyComponentRequiredQuery<CC extends ComponentClass<any>>
  = CC

  /**
   * Returns a component query for a required component of the specified class.
   *
   * ```ts
   * const family = Family.build({
   *   health: Required(Health)
   * })
   * ```
   * @param componentClass A component's class
   * @returns A component query
   */
export function Required<CC extends ComponentClass<any>> (componentClass: CC): FamilyComponentRequiredQuery<CC> {
  return componentClass
}

/**
 * The component query for an optional component.
 */
export type FamilyComponentOptionalQuery<CC extends ComponentClass<any> = ComponentClass<any>>
  = { optional: CC }

/**
 * Returns a component query for an optional component of the specified class.
 *
 * ```ts
 * const family = Family.build({
 *   health: Required(Health),
 *   poisoned: Optional(Poisoned)
 * })
 * ```
 * @param componentClass A component's class
 * @retursn A component query
 */
export function Optional<CC extends ComponentClass<any>> (componentClass: CC): FamilyComponentOptionalQuery<CC> {
  return { optional: componentClass }
}

function isOptional<CC extends ComponentClass<any>> (object: FamilyComponentQuery<CC>): object is FamilyComponentOptionalQuery<CC> {
  return object.hasOwnProperty('optional')
}

/**
 * A component query.
 */
export type FamilyComponentQuery<CC extends ComponentClass<any>>
  = FamilyComponentRequiredQuery<CC>
  | FamilyComponentOptionalQuery<CC>

/**
 * The base type of a query for a family of entities.
 */
export type FamilyQuery = {
  [key: string]: FamilyComponentQuery<ComponentClass<any>>
}

/**
 * The type of a component according to its component query.
 */
export type FamilyComponentResult<FCQ extends FamilyComponentQuery<any>>
  = FCQ extends FamilyComponentOptionalQuery<infer CC> ? (ComponentType<CC> | null) : (
    FCQ extends FamilyComponentRequiredQuery<infer CC> ? ComponentType<CC> : never
  )

export type FamilyResult<Q extends FamilyQuery> = {
  [K in keyof Q]: FamilyComponentResult<Q[K]>
}

/**
 * A family of components as identified by a query object.
 */
export class Family<Q extends FamilyQuery> {
  private constructor (
    private query: Q
  ) {}

  /**
   * Returns a family for the given query.
   *
   * ```ts
   * const poisonedFamily = Family.build({
   *   health: Required(Health),
   *   poisoned: Required(Poisoned)
   * })
   * ```
   * @param query A query
   * @returns A family
   */
  public static build<Q extends FamilyQuery> (query: Q): Family<Q> {
    return new this(query)
  }

  /**
   * Applies the query to the given entity to find a match, or returns `null` if
   * the entity does not match.
   *
   * ```ts
   * const result = poisonedFamily.get(entity)
   *
   * if (result) {
   *   const { health, poisoned } = result
   *   // ...
   * }
   * ```
   * @param entity An entity
   * @returns The result for applying the query upon the given entity
   */
  public get (entity: Entity): FamilyResult<Q> | null {
    const result = {} as FamilyResult<Q>

    for (const key in this.query) {
      if (this.query.hasOwnProperty(key)) {
        const componentQuery = this.query[key]

        if (isOptional(componentQuery)) {
          result[key] = entity.get(componentQuery.optional)
        } else {
          const component = entity.get(componentQuery as FamilyComponentRequiredQuery<ComponentClass<any>>)

          if (!component) {
            return null
          }

          result[key] = component
        }
      }
    }

    return result
  }

  /**
   * Iterates over all the given entities that match the query associated with
   * this family.
   *
   * ```ts
   * for (const [entity, { health, poisoned }] of poisonedFamily.all(entityManager)) {
   *   // ...
   * }
   * ```
   * @param entities An iterable collection of entities
   * @retursn An iterator of entities and their result
   */
  public * all (entities: Iterable<Entity>): IterableIterator<[Entity, FamilyResult<Q>]> {
    for (const entity of entities) {
      const result = this.get(entity)

      if (result) {
        yield [entity, result]
      }
    }
  }
}
