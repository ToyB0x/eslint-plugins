import { ESLintUtils } from '@typescript-eslint/utils'
import { checkBlockComments, checkLineComment } from './lib'

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/ToyB0x/eslint-plugin-todo-comment/docs/rules/${name}`,
)

export const rule = createRule({
  create(context) {
    const sourceCode = context.getSourceCode()
    const comments = sourceCode.getAllComments()

    checkBlockComments(comments, context)
    checkLineComment(comments, context)

    return {}
  },
  name: 'add-ticket-url',
  meta: {
    docs: {
      description: 'TODO comment must have ticket url.',
      recommended: 'recommended',
    },
    messages: {
      'no-ticket-url-in-block-comment': 'Add ticket url in block comment.',
      'no-ticket-url-in-continuous-comment-line':
        'Add ticket url in continuous comment lines',
      'no-next-comment-line': 'Add next line with ticket url',
    },
    type: 'suggestion',
    schema: [],
  },
  defaultOptions: [],
})
