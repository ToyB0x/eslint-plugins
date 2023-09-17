import { RuleTester } from '@typescript-eslint/rule-tester'
import { rule } from '../src/rules/ticket-url'

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
})

ruleTester.run('rule: ticket-url', rule, {
  valid: [
    {
      name: 'line comment',
      code: `
        // TODO: refactor
        // https://ticket.com/1,
        const x = () => 1
        `,
    },
    {
      name: 'line comment(lowercase)',
      code: `
        // todo: refactor
        // https://ticket.com/1,
        const x = () => 1
        `,
    },
    {
      name: 'line comment(lowercase: @todo)',
      code: `
        // @todo refactor
        // https://ticket.com/1,
        const x = () => 1
        `,
    },
    {
      name: 'line comment with description line',
      code: `
        // TODO: refactor
        // description
        // https://ticket.com/1,
        const x = () => 1
        `,
    },
    {
      name: 'multiple line comment',
      code: `
        // TODO: refactor
        // https://ticket.com/1,
        const x = () => 1

        // TODO: refactor
        // https://ticket.com/2,
        const x = () => 2

        // TODO: refactor
        // https://ticket.com/3,
        const x = () => 3
        `,
    },
    {
      name: 'block comment',
      code: `
        /*
         * TODO: refactor
         * https://ticket.com/1,
         */
        const x = () => 1
        `,
    },
    {
      name: 'block comment(lowercase)',
      code: `
        /*
         * todo: refactor
         * https://ticket.com/1,
         */
        const x = () => 1
        `,
    },
    {
      name: 'block comment(lowercase: @todo)',
      code: `
        /*
         * @todo refactor
         * https://ticket.com/1,
         */
        const x = () => 1
        `,
    },
    {
      name: 'block comment with description line',
      code: `
        /*
         * TODO: refactor
         * description
         * https://ticket.com/1,
         */
        const x = () => 1
        `,
    },
    {
      name: 'multiple block comment',
      code: `
        /*
         * TODO: refactor
         * https://ticket.com/1,
         */
        const x = () => 1

        /*
         * TODO: refactor
         * https://ticket.com/2,
         */
        const x = () => 2

        /*
         * TODO: refactor
         * https://ticket.com/3,
         */
        const x = () => 3
        `,
    },
    {
      name: 'multiple block / line comment',
      code: `
        /*
         * TODO: refactor
         * https://ticket.com/1,
         */
        const x = () => 1

        // TODO: refactor
        // https://ticket.com/2,
        const x = () => 2

        /*
         * TODO: refactor
         * https://ticket.com/3,
         */
        const x = () => 3
        `,
    },
    {
      name: 'block comment / line TODO comment',
      code: `
        /**
         * NOTE:
         * abc
         */

        // TODO: refactor123
        // https://ticket.com/2,
        const x = () => 2
        `,
    },
  ],
  invalid: [
    {
      name: 'line comment with ticket url',
      code: `
        // TODO: refactor
        const x = () => 1
        `,
      errors: [
        {
          messageId: 'no-next-comment-line',
        },
      ],
    },
    {
      name: 'line comment with ticket url(lowercase)',
      code: `
        // todo: refactor
        const x = () => 1
        `,
      errors: [
        {
          messageId: 'no-next-comment-line',
        },
      ],
    },
    {
      name: 'line comment with ticket url(lowercase: @todo)',
      code: `
        // @todo refactor
        const x = () => 1
        `,
      errors: [
        {
          messageId: 'no-next-comment-line',
        },
      ],
    },
    {
      name: 'multi line comment with ticket url',
      code: `
        // TODO: refactor
        // description
        const x = () => 1
        `,
      errors: [
        {
          messageId: 'no-ticket-url-in-continuous-comment-line',
        },
      ],
    },
    {
      name: 'block comment without ticket url',
      code: `
        /*
         * TODO: refactor
         * description
         */
        const x = () => 1
        `,
      errors: [
        {
          messageId: 'no-ticket-url-in-block-comment',
        },
      ],
    },
    {
      name: 'block comment without ticket url(lowercase)',
      code: `
        /*
         * todo: refactor
         * description
         */
        const x = () => 1
        `,
      errors: [
        {
          messageId: 'no-ticket-url-in-block-comment',
        },
      ],
    },
    {
      name: 'block comment without ticket url(lowercase: @todo)',
      code: `
        /*
         * @todo refactor
         * description
         */
        const x = () => 1
        `,
      errors: [
        {
          messageId: 'no-ticket-url-in-block-comment',
        },
      ],
    },
    {
      name: 'multiple line comment(3 errors)',
      code: `
        // TODO: refactor
        const x = () => 1

        // TODO: refactor
        const x = () => 2

        // TODO: refactor
        const x = () => 3
        `,
      errors: [
        {
          messageId: 'no-next-comment-line',
        },
        {
          messageId: 'no-next-comment-line',
        },
        {
          messageId: 'no-next-comment-line',
        },
      ],
    },
    {
      name: 'multiple line comment(1 error)',
      code: `
        // TODO: refactor
        // https://ticket.com/1,
        const x = () => 1

        // TODO: refactor
        const x = () => 2

        // TODO: refactor
        // https://ticket.com/3,
        const x = () => 3
        `,
      errors: [
        {
          messageId: 'no-next-comment-line',
        },
      ],
    },
    {
      name: 'multiple block comment(3 errors)',
      code: `
        /*
         * TODO: refactor
         */
        const x = () => 1

        /*
         * TODO: refactor
         */
        const x = () => 2

        /*
         * TODO: refactor
         */
        const x = () => 3
        `,
      errors: [
        {
          messageId: 'no-ticket-url-in-block-comment',
        },
        {
          messageId: 'no-ticket-url-in-block-comment',
        },
        {
          messageId: 'no-ticket-url-in-block-comment',
        },
      ],
    },
    {
      name: 'multiple block comment(1 error)',
      code: `
        /*
         * TODO: refactor
         * https://ticket.com/1,
         */
        const x = () => 1

        /*
         * TODO: refactor
         */
        const x = () => 2

        /*
         * TODO: refactor
         * https://ticket.com/3,
         */
        const x = () => 3
        `,
      errors: [
        {
          messageId: 'no-ticket-url-in-block-comment',
        },
      ],
    },
    {
      name: 'multiple block / line comment',
      code: `
        /*
         * TODO: refactor
         */
        const x = () => 1

        // TODO: refactor
        const x = () => 2

        /*
         * TODO: refactor
         */
        const x = () => 3
        `,
      errors: [
        {
          messageId: 'no-ticket-url-in-block-comment',
        },
        {
          messageId: 'no-next-comment-line',
        },
        {
          messageId: 'no-ticket-url-in-block-comment',
        },
      ],
    },
  ],
})
