skintest

# skintest
ui automatization framework

### how to run

first terminal:
```bash
cd api 
npm run build:watch
```

second terminal:
```bash
cd sandbox
npm run start
```
### todo 

* skintest.io
* $ and $$ should wait
* cli tool
* setup eslint for project and core
* time travel
* fill supporting of asserts
* https://www.chaijs.com/plugins/chai-webdriver/
* https://www.chaijs.com/plugins/chai-dom/
* has.state 'visible|checked|disabled|editable|enabled|hidden'
* better exception management
* stubs/network intersection support
* keyboard keys to lowercase and type checking
* multiple selector strategy, data-test-id, search by the text
* deal with translations?
* timeout, headless setting from the user (as a plugin)
* file upload/download, how to assert results?
* https://playwright.dev/docs/api/class-download
* https://playwright.dev/docs/api/class-filechooser
* playwright typical functions like 'type'
* drag and drop
* recipe library (oauth etc)
* and inspect to dbg in .debug
* better reporting, playwright logs, verbose reporting, file logs, integrations
* https://playwright.dev/docs/api/class-logger
* use attempt in the scene not in the step
* add documentation
* add comments to the ego, selectors and recipes
* https://playwright.dev/docs/selectors
* propagate options to driver methods(like delay in dblcick)
* dialog support, alert(), confirm(), prompt()
* https://playwright.dev/docs/api/class-dialog
* video and screenshots support
* starter github repository
* launch.json for debugging
* better stacktrace of exceptions, solutions/links to solutions
* own inspector
* own chrome extension for codegen?, look for the extensions
* https://playwright.dev/docs/cli
* multi-page scenarios
* CI
* https://playwright.dev/docs/ci
* total report
* better tagging support
* copy/paste support
* https://github.com/microsoft/playwright/issues/2511
* better plugin support

### questions

* how to store secrets?
* do we need special waiters for angular/react/view etc.
* introduce roles for writing features/recipes
* __prefix for the dev steps
* do we really need check step
* schema concept? strict, not strict versions? 
* recipe type `assert`
* websockets?
* auth, session and local storages?
* https://playwright.dev/docs/auth
* device emulation
* playwright as a plugin?
* browser console messages? error catching?
* https://playwright.dev/docs/verification
* own browser instance for each feature/scenario/before.scenario?
* https://playwright.dev/docs/test-runners
* browser and node runners?
* use value from the selector like `I.fill(todos.what, todos.user)`

### code style

* project page_objects, and field_names there
* project recipe_names
* feature, scenario, assert text should be in a lower case

* api ClassNames and InterfaceNames
* api CONSTANT_NAMES and SYMBOL_NAMES
* api functionNames and instanceNamess
