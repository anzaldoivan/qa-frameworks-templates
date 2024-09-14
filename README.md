# Cubika Playwright Demo

This project is a TypeScript-based test automation framework using Playwright for end-to-end testing of web applications. It provides a clean structure, reusable components, and modular test setup for running tests.

## Features

- **Playwright Testing:** Automated browser testing with Playwright.
- **Modular Page Object Model (POM):** Reusable classes representing different pages and components.
- **Parallel execution:** Playwright's default feature for faster execution across multiple browsers.
- **Prettier:** Code linting and formatting with Prettier. You can use the command `npx prettier . --write` to fix any formatting issues you may have
- **TypeScript:** Strongly typed programming language that builds on JavaScript.

## Test Cases

There is only one test case in this repository. However, there are 2 different approaches for running this test.

- **E2E:** This approach implements a full-stack, UI-driven automated test where the user logs into the Qubika Sports Club management platform, navigates to the Category page, and creates both a new category and a subcategory. The UI elements involved in this workflow are validated to ensure they behave as expected. The test scenario includes a verification of page navigation, form submissions, and proper rendering of the new category in the UI. The test script, with inline documentation and detailed comments, is located in the file tests/e2e/category/category-creation.spec.ts. This E2E test provides comprehensive coverage but can be more prone to flakiness due to its dependency on UI elements, browser interactions, and external factors like network latency.
- **API:** This approach leverages API-level automation to perform the same scenario as the E2E test but bypasses the UI, focusing on the underlying business logic. The test authenticates the user by making a request to the Qubika Login endpoint, retrieves an access token, and uses it to interact with the Create Category API endpoint. After creating the new category and subcategory, the test validates the creation by sending a GET request to retrieve the category IDs. By testing at the API level, this approach ensures the integrity of the core functionality without the overhead or potential instability introduced by the UI layer. The API test can be found in tests/api/category-creation.spec.ts.

### QA Automation Best Practices

In accordance with the Test Automation Pyramid model, we emphasize prioritizing API-level tests over E2E UI tests wherever feasible. The pyramid suggests that the majority of automated tests should reside at the lower levels (unit and API), as these tests are faster to execute, easier to maintain, and less susceptible to flakiness caused by UI instability or environmental issues.

While E2E tests are crucial for validating workflows that involve complex user interactions or validating the UI itself, they are typically more brittle, time-consuming, and harder to maintain. As such, E2E tests should be limited to scenarios where UI behavior is explicitly under test, or when a specific feature cannot be validated effectively through lower-level tests.

API tests, in contrast, provide faster feedback, offer better stability, and can cover a broader range of test cases at a lower maintenance cost. They also facilitate early detection of issues within the business logic, allowing for more efficient debugging and quicker identification of root causes.

By focusing on API automation where possible, this test strategy not only aligns with the principles of efficient test automation but also enhances the reliability and maintainability of the testing suite. This approach ensures robust validation of core functionality while minimizing test flakiness and the overhead of managing UI-centric test failures.

## Getting Started

### Prerequisites

- Node.js (Version specified in `package.json`'s `engines` field) `>=20.12.2`
- npm or Yarn

### Installation Steps

1. Clone the Repository: Start by cloning the repository to your local machine and navigate to the project directory.

```bash
git clone https://github.com/craincode/crain-playwright-tests.git
cd crain-playwright-tests
```

2. Install Dependencies: Install the necessary project dependencies to get up and running.

```bash
npm install
npx playwright install --with-deps
```

3.  Add a `.env` file in the root with the user credentials:

```bash

TEST_EMAIL={CUBIKA_EMAIL}
TEST_PASSWORD={CUBIKA_PASSWORD}
```

### Running Tests locally

There are multiple ways of executing test cases locally. You can change the ENVIRONMENT variable below to execute test cases in development, staging or production.

1. Headless Mode: Run tests without the UI .

```bash
npm run test
```

2. UI Mode: Run tests with the UI visible.

```bash
npm run test-ui
```

3. Test Report: View a comprehensive report of the test outcomes.

```bash
npx allure generate --single-file allure-results --output allure-report --clean
```

## Directory Structure

```bash
├── src
│ ├── api # API interaction classes and methods
│ ├── fixtures # Test data and mock files
│ ├── types # Custom TypeScript types
│ ├── pages # Page Object Model (POM) classes representing different pages/components
│ ├── utils # Utility functions and reusable logic
├── test-results # Test results and reports generated by Playwright
├── tests
│ ├── api # API tests
│ └── e2e # End-to-End tests
├── package.json
├── tsconfig.json
├── global-setup.ts # Common Setup for reporting failed tests (+ image compression)
└── README.md
└── playwright.config.ts # Playwright configuration
```

### Description of Folders and files:

- **src/api:** Contains classes for interacting with APIs used in tests.
- **src/fixtures:** Holds test data, mock files, or any other necessary static input.
- **src/types:** Contains TypeScript type definitions for the project.
- **src/pages:** Houses the Page Object Model classes representing web pages or components.
- **src/utils:** General utility functions or helpers that are reusable across the framework.
- **test-results:** Stores the test results and reports generated by Playwright.
- **tests/api:** API-related test files.
- **tests/e2e:** End-to-end test files for full workflow coverage.

This structure aligns with the modularity and reusability principles of a typical Playwright framework.
