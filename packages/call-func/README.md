# eslint-plugin-call-func

This is a rule to encourage the use of specific func.

## Rule Details

✓ GOOD:: function called in outer function

```typescript
function outer() {
  checkPermissions() // <-- This rule checks if this function is called.
  someFunc()
}
```

✓ GOOD:: function called with variable assignment

```typescript
const runFunctionWithCheckPermission = (fn: () => void) => {
  checkPermissions()
  fn()
}

// ref: https://remix.run/docs/en/main/route/loader
export const loader = runFunctionWithCheckPermission(() => { // <-- This rule also can checks if specific wrapper func is used.
  console.log('function called after check permission')
})
```

✗ BAD: No function called

```typescript
function outer() {
  someFunc()
}
```

## NOTE

This is useful when you want to run simple code within a framework that exports functions with specific names.

```typescript
// Using this rule, you can ensure that permission checks are performed within the loader.
// It can be used to supplement parts not supported by the framework.
// related ref: https://github.com/remix-run/remix/discussions/1432
export const loader = () => {
  checkPermissions()
}

// Or you can use a wrapper function to ensure that the permission check is performed.
export const loader = runFunctionWithCheckPermission(() => {
  console.log('function called after check permission')
})
```

## Installation

### Add package

```shell
# npm
npm i -D eslint-plugin-call-func

# yarn
yarn add -D eslint-plugin-call-func
```

### Update your eslint config

```json
{
  "plugins": ["call-func"],
  "rules": {
    "call-func/call-inner-func-in-outer-func": [
      "error",
      {
        "functionSets": [
          { "outerFunction": "action", "innerFunction": "checkPermissions" },
          { "outerFunction": "loader", "innerFunction": "checkPermissions" }
        ]
      }
    ]
  }
}
```
