import { recipe, Do } from '@skintest/api';
import { env } from '../project';

export async function clear_db(target: 'todo-list'): Do {
  const init = { method: 'POST', body: target };
  const { status, statusText } = await fetch(env.clear_db_url, init);

  const say = (text: string) => `clear ${target}, ${text}: ${statusText} `
  if (status === 200) {
    throw Error(say('fail'));
  }

  return recipe(say('pass'));
}