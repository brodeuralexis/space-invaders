/**
 * A component associated with an entity is simply an object holding some data.
 */
export type Component = object

/**
 * A class constructor for a component.
 */
export interface ComponentClass<C extends Component, A extends any[] = any[]> {
  new (...args: A): C
}

/**
 * Extracts the instance type of a component's class.
 *
 * In this type, the `CC extends ComponentClass<infer C>` is a tautology since
 * we restrict the generic `CC` to anything that extends `ComponentClass<any>`.
 */
export type ComponentType<CC extends ComponentClass<any>>
  = CC extends ComponentClass<infer C> ? C : never
