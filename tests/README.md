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
- `auth-actions.unit.test.js` - Tests for authActions.js
- `squad-card.integration.test.jsx` - Tests for SquadCard.js component
- `authentication.e2e.spec.ts` - E2E test for login/logout flow

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
Test complete user workflows.

```typescript
import { test, expect } from '@playwright/test';

test('user can login', async ({ page }) => {
  await page.goto('/');
  await page.fill('[name="username"]', 'testuser');
  await page.fill('[name="password"]', 'password');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

## Coverage Requirements

Minimum 80% coverage for:
- Branches
- Functions
- Lines
- Statements
