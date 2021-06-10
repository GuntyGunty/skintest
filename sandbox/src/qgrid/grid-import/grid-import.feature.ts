import { feature, has, I } from '@skintest/sdk';
import { grid } from '../grid/grid.view';
import { page } from '../main/page';
import { data } from '../project/data';
import { import_data_from } from './grid-import.recipes';
import { example_import } from './grid-import.view';

feature('grid import')
  .before('scenario'
    , I.open(page.start)
    , I.goto(example_import.url)
  )

  .scenario('check the import from csv button fills the grid'
    , I.do(import_data_from, data.atoms_csv_path)
    , I.test('grid has rows')
    , I.see(grid.row_at(0), has.state, 'visible')
    , I.see(grid.row_list, has.length, 50)
  )