import { Boxed, getCaller, getMeta, Optional, reinterpret, Serializable } from '@skintest/common';
import { RecipeIterable, RecipeOperator } from './recipe';
import { EvalStep } from './steps/eval';

export function serialize<V extends Serializable>(value: V): Boxed<V> {
  return { value };
}

export function evaluate<A extends Serializable>(message: string, arg: Boxed<A>, pageFunction: (arg: A) => void): RecipeOperator<Optional<RecipeIterable>, RecipeIterable> {
  const caller = getCaller();
  const getStepMeta = () => getMeta(caller);

  return source => [...(source || []),
  new EvalStep(
    getStepMeta,
    message,
    reinterpret<(arg: Serializable) => void>(pageFunction),
    arg.value
  )];
}