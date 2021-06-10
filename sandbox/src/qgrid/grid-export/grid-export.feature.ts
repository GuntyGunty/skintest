import { feature, I } from '@skintest/sdk';
import { that_data_exists, wait_until_grid_has_rows } from '../grid/grid.recipes';
import { page } from '../main/page';
import { export_data_as } from './grid-export.recipes';
import { example_export } from './grid-export.view';

feature('grid export')
  .before('scenario'
    , I.open(page.start)
    , I.goto(example_export.url)
  )

  .scenario('check the export to csv button downloads the file'
    , I.do(wait_until_grid_has_rows)
    , I.do(export_data_as, 'check-export-data.csv')
    , I.test('cvs file exists and contains data')
    , I.see(that_data_exists, 'check-export-data.csv')
    , I.__pause()
  )