import { type SchemaTypeDefinition } from 'sanity'
import { Foods } from './foods'
import { Chefs } from './chefs'
import { Order} from './order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Foods, Chefs, Order],
}
