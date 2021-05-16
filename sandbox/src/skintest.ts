import { exploreFeatures, platform, playwrightLauncher, tagFilter } from '@skintest/api';
import * as path from 'path';

const PROJECT_NAME = 'todomvc';
const FEATURES_DIR = 'todomvc/features';

platform()
  .newProject(PROJECT_NAME, async project => {
    const dir = path.join(__dirname, FEATURES_DIR);
    await project.run(
      playwrightLauncher()
      , exploreFeatures(dir)
      , tagFilter('#dev')
    );
  });