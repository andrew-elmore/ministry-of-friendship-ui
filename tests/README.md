# Ministry of Friendship UI - Test Suite

## Directory Structure

```
tests/
├── unit/              Unit tests for individual functions/modules
├── integration/       Integration tests for components with Redux
├── e2e/              Playwright end-to-end tests
│   └── fixtures/     E2E test data
├── helpers/          Test utilities and mocks
└── fixtures/         Test data
```

## Test File Naming

Files are named by the MODULE being tested:

- Unit: `<module>.unit.test.js` (or `.test.jsx` for React)
- Integration: `<module>.integration.test.js`
- E2E: `<feature-flow>.e2e.spec.ts`

Examples:
- `profile-actions.unit.test.js` - Tests for profileActions.js
- `squad-card.integration.test.jsx` - Tests for SquadCard.js component
- `authentication.e2e.spec.ts` - E2E test for the Clerk sign in / sign out flow

Card numbers go in file comments, NOT in filenames.

## Running Tests

```bash
npm test                  Run all tests
npm run test:unit         Run unit tests only
npm run test:integration  Run integration tests only
npm run test:e2e         Run Playwright e2e tests
npm run test:coverage    Generate coverage report
npm run test:watch       Watch mode for development
```

## Writing Tests

### Unit Tests
Test individual functions, reducers, actions in isolation.

```javascript
import { someFunction } from '@/path/to/module';

describe('someFunction', () => {
  it('should do something', () => {
    expect(someFunction()).toBe(expectedValue);
  });
});
```

### Integration Tests
Test components with Redux, routing, and other integrations.

```javascript
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MyComponent } from '@components/MyComponent';

test('renders component with state', () => {
  render(
    <Provider store={mockStore}>
      <MyComponent />
    </Provider>
  );
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

### E2E Tests
Test complete user workflows. Sign-in goes through Clerk: `tests/e2e/helpers/clerkUsers.js` creates a
throwaway Clerk test user with the Backend API, signs it in with `@clerk/testing`, and deletes it afterwards.
E2E runs need `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` (a development instance) in the UI `.env`, and the
API test server (`npm run start:test` in the API repo) running on port 1338.

```typescript
import { test, expect } from '@playwright/test';
import { signInNewClerkUser, enlist, deleteClerkUser } from './helpers/clerkUsers.js';

test('a new Clerk user reaches the dashboard', async ({ page, baseURL }) => {
  const clerkUser = await signInNewClerkUser(page, baseURL, 'example');
  await enlist(page, 'ExampleDiver');
  await expect(page.locator('text=Start A Squad')).toBeVisible();
  await deleteClerkUser(clerkUser);
});
```

## Coverage Requirements

Minimum 80% coverage for:
- Branches
- Functions
- Lines
- Statements
