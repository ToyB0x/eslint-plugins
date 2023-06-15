import { TSESTree } from '@typescript-eslint/types'
import { RuleContext } from '@typescript-eslint/utils/dist/ts-eslint'

export const checkBlockComments = (
  comments: TSESTree.Comment[],
  context: RuleContext<'no-ticket-url-in-block-comment', never[]>
) => {
  comments.forEach((comment) => {
    if (comment.type !== 'Block') return

    // check if comment has "TODO:" and not has "https://"
    if (
      comment.value.toLowerCase().includes('todo:') &&
      !comment.value.includes('https://')
    ) {
      context.report({
        loc: comment.loc,
        messageId: 'no-ticket-url-in-block-comment',
      })
    }
  })
}
