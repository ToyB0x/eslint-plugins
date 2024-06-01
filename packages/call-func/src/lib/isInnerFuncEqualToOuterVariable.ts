import { TSESTree } from '@typescript-eslint/types'

export const isInnerFuncEqualToOuterVariable = (
  init: TSESTree.CallExpression,
  matchedOuterVariable: string,
  functionSets: {
    outerFunction: string
    innerFunction: string
  }[],
) =>
  init.callee.type === 'Identifier' &&
  init.callee.name ===
    functionSets.find((f) => f.outerFunction === matchedOuterVariable)
      ?.innerFunction
