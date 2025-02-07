import { errors, escapeRE, StringDictionary } from '@skintest/common';
import { OnStage, Plugin } from '@skintest/platform';
import { Scenario, Suite } from '@skintest/sdk';

type TagFilterOptions = {
  include: string[],
  method: 'include-only-matched' | 'include-all-when-no-matches'
};

type Statistics = StringDictionary<{
  featureMatch: boolean,
  scenarioMatches: Set<string>,
}>;

export function tagFilter(options: TagFilterOptions): Plugin {
  const { include, method } = options;

  return async (stage: OnStage) => stage({
    'project:ready': async ({ suite }) => {
      const stat = getStat(suite, include);
      const onlyMatched = () => {
        suite.operations.filterFeature = (feature: string) =>
          stat[feature].featureMatch ||
          stat[feature].scenarioMatches.size > 0;

        suite.operations.filterScenario = (feature: string, scenario: Scenario) =>
          stat[feature].featureMatch ||
          stat[feature].scenarioMatches.has(scenario.name);
      };

      switch (method) {
        case 'include-only-matched': {
          onlyMatched();
          break;
        }
        case 'include-all-when-no-matches': {
          const hasMatches = Object
            .keys(stat)
            .some(key =>
              stat[key].featureMatch ||
              stat[key].scenarioMatches.size > 0
            );

          if (hasMatches) {
            onlyMatched();
          }

          break;
        }
        default: {
          throw errors.invalidArgument('method', method);
        }
      }
    }
  });
}

function matchHashTag(search: string) {
  return (tag: string) => {
    const contains = new RegExp(`(^|\\s)${escapeRE(tag)}(\\s|$)`, 'gi');
    return contains.test(search);
  };
}

function getStat(suite: Suite, include: string[]): Statistics {
  const stat: Statistics = {};
  for (const script of suite.getScripts()) {
    stat[script.name] = {
      featureMatch: include.some(matchHashTag(script.name)),
      scenarioMatches: new Set(
        script
          .scenarios
          .map(({ name }) => name)
          .filter(name => include.some(matchHashTag(name)))
      )
    };
  }

  return stat;
}