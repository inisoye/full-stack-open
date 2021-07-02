const dummy = (blogs) => {
  // do anything with parameter to remove error
  blogs.map((eachblog) => {
    eachblog, null
  })
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((acc, curr) => acc + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  const fullFavoriteBlog = blogs.reduce((prev, curr) => {
    return prev.likes > curr.likes ? prev : curr
  }, 0)

  // return zero if bloglist is empty
  return blogs.length === 0
    ? 0
    : {
        title: fullFavoriteBlog.title,
        author: fullFavoriteBlog.author,
        likes: fullFavoriteBlog.likes,
      }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return 0

  const authorFrequencies = blogs.reduce((acc, curr) => {
    // create an object of all authors and their blog frequencies
    acc[curr.author] = (acc[curr.author] || 0) + 1
    return acc
  }, {})

  // find the author with the highest frequency by placing each object entry into an array
  const maxFrequency = Object.entries(authorFrequencies).reduce((prev, curr) =>
    prev[1] > curr[1] ? prev : curr
  )

  // return zero if bloglist is empty
  return {
    author: maxFrequency[0],
    blogs: maxFrequency[1],
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return 0

  const authorLikes = blogs.reduce((acc, curr) => {
    // create an object of all authors and their individual total blog Likes
    acc[curr.author] = (acc[curr.author] || 0) + curr.likes
    return acc
  }, {})

  // find the author with the highest likes by placing each object entry into an array
  const maxLikes = Object.entries(authorLikes).reduce((prev, curr) =>
    prev[1] > curr[1] ? prev : curr
  )

  // return zero if bloglist is empty
  return {
    author: maxLikes[0],
    likes: maxLikes[1],
  }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
