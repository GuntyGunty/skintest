import { fail, has, I, pass, perform, Recipe, recipe, TestResult } from '@skintest/sdk';
import * as fs from 'fs';
import * as path from 'path';
import { data } from '../project/data';
import { grid } from './grid.view';

/**
 * waits until grid has some rows
 * 
 * @returns recipe
 */
export async function wait_until_grid_has_rows(): Promise<Recipe> {
  return recipe(
    perform('wait for the first grid row'
      , I.wait(grid.row_at(0), has.state, 'visible')
    )
  );
}


/**
 * assert that file is not empty
 * 
 * @param file_name name of the file
 * @returns assertion
 */
export async function that_data_exists(file_name: string): Promise<TestResult> {
  const file_path = path.join(data.downloads_path, file_name);

  if (fs.existsSync(file_path)) {
    const { size } = fs.statSync(file_path);
    if (size > 0) {
      return pass();
    }

    return fail.reason({
      description: `\`${file_path}\` doesn't contain data`,
      solution: 'make sure that data source is correct'
    });
  }

  // todo: use levenshtein distance to suggest file paths
  return fail.reason({
    description: `\`${file_path}\` doesn't exist`,
    solution: 'make sure that file path is correct'
  });
}