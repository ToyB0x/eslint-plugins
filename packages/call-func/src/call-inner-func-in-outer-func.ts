import { ESLintUtils } from '@typescript-eslint/utils'
import { isInnerFuncCalled, isInnerFuncEqualToOuterVariable } from './lib'

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
    `https://github.com/ToyB0x/eslint-plugins/blob/main/packages/call-func/README.md`,
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
        const matchedOuterVariable = functionSets.find(
          (f) =>
            node.declarations[0].id.type === 'Identifier' &&
            f.outerFunction === node.declarations[0].id.name,
        )?.outerFunction
        if (!matchedOuterVariable) return // not target function

        // matchedVariable is Function
        if (node.declarations[0].init?.type === 'CallExpression') {
          const { init } = node.declarations[0]
          if (
            isInnerFuncEqualToOuterVariable(
              init,
              matchedOuterVariable,
              functionSets,
            )
          )
            return
        }

        // matchedVariable is Arrow Function
        if (node.declarations[0].init?.type === 'ArrowFunctionExpression') {
          const { init } = node.declarations[0]
          if (init.body.type !== 'BlockStatement') return

          if (
            isInnerFuncCalled(
              init.body.body,
              matchedOuterVariable,
              functionSets,
            )
          )
            return
        }

        context.report({
          node,
          loc: node.loc,
          messageId: 'call-inner-func-in-outer-func',
          data: {
            outerFunc: matchedOuterVariable,
            innerFunc: functionSets.find(
              (f) => f.outerFunction === matchedOuterVariable,
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
