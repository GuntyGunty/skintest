import { feature, has, I } from '@skintest/sdk';
import { page } from '../main/page';
import { add_todo, clear_todos } from './todos.recipes';
import { todos } from './todos.view';

feature('todos remove')
  .before('scenario'
    , I.open(page.start)
    , I.goto(todos.url)
    , I.do(clear_todos)
  )

  .scenario('check the remove button deletes items'
    , I.do(add_todo, 'item to remove')
    , I.hover(todos.item_label_at(0))
    , I.click(todos.item_remove_at(0))
    , I.test('todos list is empty after remove button clicked')
    , I.see(todos.list, has.length, 0)
  )