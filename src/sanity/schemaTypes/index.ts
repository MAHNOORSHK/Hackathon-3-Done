import { type SchemaTypeDefinition } from 'sanity'
import { Foods } from './foods'
import { Chefs } from './chefs'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Foods, Chefs],
}
