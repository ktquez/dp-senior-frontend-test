# Senior Frontend Developer Test (Dog and Pony Studios)

## TOC

- [Setup](#setup)
- [Composition API](#composition-api)
- [CSS framework](#css-framework)
- [Eslint rules](#eslint-rules)
- [Unit tests](#unit-tests)
- [e2e tests](#e2e-tests)
- [Accessibility Statement](#accessibility-statement)

This file contains instructions for setting up and running the test.

## Setup

```shell
git clone git@github.com:ktquez/senior-frontend-test.git
cd senior-frontend-test
npm i
```

### Run development environment
```shell
npm run dev
```

### Run production environment
```shell
npm run build
npm run start
```

---

## Composition API
Provides a way to use the Vue 3 Composition API in with Nuxt-specific features.
More details about `@nuxtjs/composition-api`: https://composition-api.nuxtjs.org/
More details about `@vue/composition-api`: https://composition-api.vuejs.org/

NOTE: Currently I already use the composition-api in Vue apps and now using it with Vue 3, but I took advantage of the test to get to know a little bit of `@nuxtjs/composition-api` that will be available in Nuxt 3.

---

## CSS framework
The CSS framework used is `TailwindCSS` using the Nuxt community module [@nuxtjs/tailwindcss](https://tailwindcss.nuxtjs.org/).
More details about TailwindCSS: https://tailwindcss.com/

To optimize the final CSS package, `PurgeCSS` is used, already included in @nuxtjs/tailwindcss.
More details about PurgeCSS: https://purgecss.com/

---

## Eslint rules
ESLint is using the style based on the `JavaScript Standard Style` rules
More details about https://standardjs.com/

### Lints and fixes files
```shell
npm run lint
# or
npm run lint:fix
```
---

## Unit tests

`Jest` is being used as a javascript testing framework along with the Vue tool called `@vue/test-utils`  
More details about https://vue-test-utils.vuejs.org/

### Structure and Nomenclature
- Unit tests are performed on specific files, so it must be in the same directory;
- All unit tests are named as:
  - `ComponentName.test.js`

**For example:**  
```
| - /components  
| --- Button.test.js
| --- Button.vue
```

### Running unit tests

#### All tests
```shell
npm run test
```

#### Run a specific file
```shell
npm run test -- Button
```

### Coverage
When running the tests, a directory called `coverage` is generated which displays the application's test coverage in a graphical interface.
It is possible to access it through `tests/unit/coverage/index.html`.

## e2e tests
For integration tests, `Cypress` was used 
More details about https://www.cypress.io/

### Structure and Nomenclature
- Integration tests are performed holistically, tests the componentization of several files, it must be in a specific directory located in `tests/e2e/specs`;
- Although all JavaScript files are executed within the specs directory, the naming convention must be:
  - `PageName.spec.js`

**For example:**  
```
| - /tests
| --- /e2e
| ---- /specs 
| ------ PageName.spec.js
```

### Running e2e tests

```shell
npm run e2e
```

### Running e2e tests with browser

```shell
npm run e2e:open
```

---

## Accessibility Statement

The test project strives to be compatible with AA [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/).

### Accessibility features

- HTML semântico;
- Page title;
- Well-defined header hierarchy;
- Descriptive names for links and interactive controls such as buttons and inputs;
- Adding ARIA attributes when needed;
- ARIA landmarks;
- Contrast color accessible for people with low vision and color blindness:
  - `useColorContrast` composable was created to define the text color based on the background color defined for the card.
- Live regions for toast notifications and error messages on the form;
  - aria-live in Notification and role alert in form error messages
- Focus trap on the form to maintain tabulation:
  - Using [@vue-a11y/focus-loop](https://github.com/vue-a11y/vue-focus-loop)

### Discussions

#### Disable button on form (UX & accessibility)
- Assistive technologies are generally not able to navigate to the disabled buttons;
- Maintaining predictable actions helps users with cognitive or learning disabilities;
- Complies with WCAG Success Criterion 3.2.2 On Input

##### References
- https://axesslab.com/disabled-buttons-suck

##### Solution
I added a cursor of type `not-allowed` to simulate disabled button + Validation if any field is still invalid.

#### Masks in inputs are inaccessible
Screen reader users report accessibility issues and that it can take the form unusable with VoiceOver or JAWS.

##### References
- https://www.filamentgroup.com/lab/politespace.html

##### Solution
Based on this problem, I am developing a plugin that will be published soon in the [Vue A11y](https://github.com/vue-a11y) repository to solve accessibility problems in masks for Vue.js users.
