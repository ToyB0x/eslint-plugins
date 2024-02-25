# eslint-plugin-use-inner-func

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
npm i -D eslint-plugin-use-inner-func

# yarn
yarn add -D eslint-plugin-use-inner-func
```

### Update your eslint config
```json
{
  "plugins": [
    "use-inner-func"
  ],
  "rules": {
    "use-inner-func/use-inner-func": "error"
  }
}
```
