import { TSESTree } from '@typescript-eslint/types'
import { RuleContext } from '@typescript-eslint/utils/dist/ts-eslint'

export const checkLineComment = (
  comments: TSESTree.Comment[],
  context: RuleContext<
    'no-next-comment-line' | 'no-ticket-url-in-continuous-comment-line',
    never[]
  >
) => {
  comments.forEach((comment) => {
    if (comment.type !== 'Line') return
    if (!comment.value.toLowerCase().includes('todo:')) return

    // check if comment has "TODO:" and not has next comment line (possibly contains ticket url)
    if (!hasNextCommentLine(comment, comments)) {
      context.report({
        loc: comment.loc,
        messageId: 'no-next-comment-line',
      })
      return
    }

    // check if comment has "TODO:" and has "https://" in continuous comment lines
    const continuousCommentLines = getContinuousCommentLines(comment, comments)
    if (!continuousCommentLines.some((c) => c.value.includes('https://'))) {
      context.report({
        loc: comment.loc,
        messageId: 'no-ticket-url-in-continuous-comment-line',
      })
    }
  })
}

const hasNextCommentLine = (
  targetComment: TSESTree.Comment,
  comments: TSESTree.Comment[]
) => {
  // target コメントのlocを利用
  return comments.find(
    (comment) => comment.loc.start.line === targetComment.loc.start.line + 1
  )
}

const getContinuousCommentLines = (
  targetComment: TSESTree.Comment,
  comments: TSESTree.Comment[]
): TSESTree.Comment[] => {
  const continuousLines: TSESTree.Comment[] = []

  let currentCheckingComment = targetComment
  for (const comment of comments) {
    if (!hasNextCommentLine(currentCheckingComment, comments)) break

    continuousLines.push(comment)
    currentCheckingComment = comment
  }

  return continuousLines
}
