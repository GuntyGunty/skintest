import { has, I, perform, recipe, Recipe, till } from '@skintest/sdk';
import { todos } from './todos.view';

/**
 * add new todo item to the list of todos
 * 
 * @param name tile of the new todo
 * @returns recipe
 */
export async function add_todo(name: string): Promise<Recipe> {
  return recipe(
    perform(`add todo \`${name}\``
      , I.fill(todos.what, name)
      , I.press('Enter')
    )
  );
}

/**
 * clear todos list
 * 
 * @returns recipe
 */
 export async function clear_todos(): Promise<Recipe> {
  return recipe(
    perform('remove item'
      , I.hover(todos.item_label_at(0))
      , I.click(todos.item_remove_at(0))
      , till('list has items')
      , I.see(todos.list, has.length.above, 0)
    ),
  );
}

/**
 * generate todo times and put them to the list of todos
 * 
 * @param count number of items to generate
 * @returns generate todos client recipe
 */
 export async function generate_todos(count: number): Promise<Recipe> {
  let id = 1;

  return recipe(
    perform('add todo'
      , I.do(add_todo, `generated todo #${id++}`)
      , till(`until list has ${count} items`)
      , I.see(todos.list, has.no.length, count)
    )
  );
}