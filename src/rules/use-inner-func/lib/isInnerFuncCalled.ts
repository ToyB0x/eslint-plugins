import { TSESTree } from '@typescript-eslint/types'

export const isInnerFuncCalled = (
  statements: TSESTree.Statement[],
  matchedOuterFunction: string,
  functionSets: {
    outerFunction: string
    innerFunction: string
  }[],
) =>
  statements.some((n) => {
    if (
      n.type === 'ExpressionStatement' &&
      n.expression.type === 'CallExpression'
    ) {
      const { callee } = n.expression
      return (
        callee.type === 'Identifier' &&
        functionSets.find((f) => f.outerFunction === matchedOuterFunction)
          ?.innerFunction === callee.name
      )
    }
  })
