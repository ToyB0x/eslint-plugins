# eslint-plugin-todo-comment

This is a rules to encourage the entry of ticket URLs in TODO comments.

## Rule Details

This rule reports invalid TODO comment.

✗ BAD: No ticket url
```typescript

// TODO: refactor
const x = () => 1
```

✓ GOOD:: With ticket url
```typescript
// TODO: refactor
// https://ticket.com/1,
const x = () => 1
```
