import { RuleTester } from '@typescript-eslint/rule-tester'
import { rule } from '../src/call-inner-func-in-outer-func'

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
})

ruleTester.run('rule: func-exist', rule, {
  valid: [
    {
      name: 'innerFunction exist in outerFunction',
      code: `
        function outer() {
          inner()
        }
        `,
      options: [
        {
          functionSets: [{ outerFunction: 'outer', innerFunction: 'inner' }],
        },
      ],
    },
    {
      name: 'no outerFunction exist',
      code: `
        function notOuter() {
          anyFunc()
        }
        `,
      options: [
        { functionSets: [{ outerFunction: 'outer', innerFunction: 'inner' }] },
      ],
    },
    {
      name: 'innerFunction exist in outerFunction(arrow func)',
      code: `
        const outer = () => {
          inner()
        }
        `,
      options: [
        { functionSets: [{ outerFunction: 'outer', innerFunction: 'inner' }] },
      ],
    },
    {
      name: 'no outerFunction exist(arrow func)',
      code: `
        const notOuter = () => {
          anyFunc()
        }
        `,
      options: [
        { functionSets: [{ outerFunction: 'outer', innerFunction: 'inner' }] },
      ],
    },
    {
      name: 'innerFunction exist in outerFunction(multi)',
      code: `
        function outer1() {
          inner1()
        }
        function outer2() {
          inner2()
        }
        `,
      options: [
        {
          functionSets: [
            { outerFunction: 'outer1', innerFunction: 'inner1' },
            { outerFunction: 'outer2', innerFunction: 'inner2' },
          ],
        },
      ],
    },
  ],
  invalid: [
    {
      name: 'error when innerFunction not exist',
      code: `
        function outer() {
          notInnerFunc()
        }
        `,
      errors: [
        {
          messageId: 'call-inner-func-in-outer-func',
        },
      ],
      options: [
        { functionSets: [{ outerFunction: 'outer', innerFunction: 'inner' }] },
      ],
    },
    {
      name: 'error when innerFunction not exist(arrow func)',
      code: `
        const outer = () => {
          notInnerFunc()
        }
        `,
      errors: [
        {
          messageId: 'call-inner-func-in-outer-func',
        },
      ],
      options: [
        { functionSets: [{ outerFunction: 'outer', innerFunction: 'inner' }] },
      ],
    },
    {
      name: 'error when innerFunction not exist(multi)',
      code: `
        function outer1() {
          notInnerFunc()
        }
        `,
      errors: [
        {
          messageId: 'call-inner-func-in-outer-func',
        },
      ],
      options: [
        {
          functionSets: [
            { outerFunction: 'outer1', innerFunction: 'inner1' },
            { outerFunction: 'outer2', innerFunction: 'inner2' },
          ],
        },
      ],
    },
  ],
})
