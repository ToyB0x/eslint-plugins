import { ESLintUtils } from '@typescript-eslint/utils'
import { isInnerFuncCalled } from './lib'

type MessageIds = 'call-inner-func-in-outer-func'

type Options = [
  {
    functionSets: {
      outerFunction: string
      innerFunction: string
    }[]
  },
]

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/ToyB0x/eslint-plugins/packages/call-func/README.md`,
)

export const rule = createRule<Options, MessageIds>({
  create(context) {
    const [options] = context.options
    const functionSets = options.functionSets || []

    return {
      FunctionDeclaration(node) {
        if (node.id === null) return // arrow function

        const functionName = node.id.name
        const matchedOuterFunction = functionSets.find(
          (f) => f.outerFunction === functionName,
        )?.outerFunction
        if (!matchedOuterFunction) return // not target function

        // 対象のOuter関数名である場合、指定された内部関数が呼ばれているかチェック
        if (
          isInnerFuncCalled(node.body.body, matchedOuterFunction, functionSets)
        )
          return

        context.report({
          node,
          loc: node.loc,
          messageId: 'call-inner-func-in-outer-func',
          data: {
            outerFunc: matchedOuterFunction,
            innerFunc: functionSets.find(
              (f) => f.outerFunction === matchedOuterFunction,
            )?.innerFunction,
          },
        })
      },
      // check arrow func
      VariableDeclaration(node) {
        const matchedOuterFunction = functionSets.find(
          (f) => f.outerFunction === (node.declarations[0].id as any).name,
        )?.outerFunction
        if (!matchedOuterFunction) return // not target function

        if (node.declarations[0].init?.type !== 'ArrowFunctionExpression')
          return

        const { init } = node.declarations[0]
        if (init.body.type !== 'BlockStatement') return

        if (
          isInnerFuncCalled(init.body.body, matchedOuterFunction, functionSets)
        )
          return

        context.report({
          node,
          loc: node.loc,
          messageId: 'call-inner-func-in-outer-func',
          data: {
            outerFunc: matchedOuterFunction,
            innerFunc: functionSets.find(
              (f) => f.outerFunction === matchedOuterFunction,
            )?.innerFunction,
          },
        })
      },
    }
  },
  name: 'call-inner-func-in-outer-func',
  meta: {
    docs: {
      description: 'Inner Function must be called inside Outer Function',
      recommended: 'recommended',
    },
    messages: {
      'call-inner-func-in-outer-func': 'Call inner function in outer function.',
    },
    type: 'problem',
    schema: [
      {
        type: 'object',
        properties: {
          functionSets: {
            type: 'array',
            items: [
              {
                type: 'object',
                properties: {
                  outerFunction: {
                    type: 'string',
                  },
                  innerFunction: {
                    type: 'string',
                  },
                },
                required: ['outerFunction', 'innerFunction'],
              },
            ],
          },
        },
      },
    ],
  },
  defaultOptions: [{ functionSets: [] }],
})
