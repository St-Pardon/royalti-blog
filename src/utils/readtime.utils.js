/**
 * Gets the time it would take to read the blog post
 * @param {*} body - body of the articule to read
 * @returns {Number} time it would take to read the articule
 */
export const readTime = (body) => {
  const numOfWord = body.split(' ').length;

  if (numOfWord < 200) return 2;

  const duration = numOfWords / 200;

  return Math.round(duration) === 0 ? 1 : Math.round(duration);
};
