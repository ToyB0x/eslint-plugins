# todo-comment/ticket-url

ensure the ticket url exists

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
