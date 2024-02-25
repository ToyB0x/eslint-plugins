const findStrings = ['todo:', '@todo']

export const isContainTodoString = (string: string) => {
  const lowerCaseString = string.toLowerCase()
  return findStrings.some((findString) => lowerCaseString.includes(findString))
}
