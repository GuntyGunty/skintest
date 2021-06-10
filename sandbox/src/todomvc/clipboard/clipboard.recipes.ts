import { I, perform, Query, Recipe, recipe } from '@skintest/sdk';

  /**
   * copy to the clipboard by element text selection
   * 
   * @param query element selector, which text will be copied
   * @returns recipe
   */
export async function copy_from(query: Query<HTMLElement>): Promise<Recipe> {
  return recipe(
    perform(`copy ${query.toString()}`
      , I.select(query)
      , I.press('Control+C')
    )
  );
}


/**
 * paste ext from the clipboard by using fill method
 * 
 * @param query target element selector
 * @returns recipe
 */
 export async function paste_to(query: Query<HTMLInputElement | HTMLAreaElement>): Promise<Recipe> {
  return recipe(
    perform(`paste ${query.toString()}`
      // todo: investigate why focus doesn't work?
      , I.focus(query)
      , I.fill(query, '')
      , I.press('Control+V')
    )
  );
}