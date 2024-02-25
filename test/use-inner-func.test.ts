import { RuleTester } from '@typescript-eslint/rule-tester'
import { rule } from '../src/rules/use-inner-func'

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
      options: [{ outerFunctions: ['outer'], innerFunctions: ['inner'] }],
    },
    {
      name: 'no outerFunction exist',
      code: `
        function notOuter() {
          anyFunc()
        }
        `,
      options: [{ outerFunctions: ['outer'], innerFunctions: ['inner'] }],
    },
    {
      name: 'innerFunction exist in outerFunction(arrow func)',
      code: `
        const outer = () => {
          inner()
        }
        `,
      options: [{ outerFunctions: ['outer'], innerFunctions: ['inner'] }],
    },
    {
      name: 'no outerFunction exist(arrow func)',
      code: `
        const notOuter = () => {
          anyFunc()
        }
        `,
      options: [{ outerFunctions: ['outer'], innerFunctions: ['inner'] }],
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
          messageId: 'use-inner-func-in-outer-func',
        },
      ],
      options: [{ outerFunctions: ['outer'], innerFunctions: ['inner'] }],
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
          messageId: 'use-inner-func-in-outer-func',
        },
      ],
      options: [{ outerFunctions: ['outer'], innerFunctions: ['inner'] }],
    },
  ],
})
