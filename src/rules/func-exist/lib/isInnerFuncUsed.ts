import { TSESTree } from '@typescript-eslint/types'

export const isInnerFuncUsed = (
  statements: TSESTree.Statement[],
  innerFunctions: string[],
) =>
  statements.some((n) => {
    if (
      n.type === 'ExpressionStatement' &&
      n.expression.type === 'CallExpression'
    ) {
      const { callee } = n.expression
      return (
        callee.type === 'Identifier' && innerFunctions.includes(callee.name)
      )
    }
  })
