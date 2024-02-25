# eslint-plugin-call-func

This is a rule to encourage the use of specific func.

## Rule Details

This rule reports invalid function usage.

✗ BAD: No function called
```typescript

function outer() {
    notInnerFunc()
}
```

✓ GOOD:: function called
```typescript
function outer() {
    inner()
}
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
  "plugins": [
    "call-func"
  ],
  "rules": {
    "call-func/call-func": "error"
  }
}
```
