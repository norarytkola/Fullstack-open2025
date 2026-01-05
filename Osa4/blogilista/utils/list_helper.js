const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    let sum = 0
    for (const b of blogs) {
        sum += b.likes
    }
    return sum
}

const favouriteBlog = (blogs) => {
    return(blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)) 

}

const mostBlogs = (blogs) => {
  const counts = {}

  for (const blog of blogs) {
    counts[blog.author] = (counts[blog.author] || 0) + 1
  }

  let topAuthor = null
  let maxBlogs = 0

  for (const author in counts) {
    if (counts[author] > maxBlogs) {
      maxBlogs = counts[author]
      topAuthor = author
    }
  }

  return {
    author: topAuthor,
    blogs: maxBlogs
  }
}

const mostLikes = (blogs) => {
  const likesCount = {}

  for (const blog of blogs) {
    likesCount[blog.author] = (likesCount[blog.author] || 0) + blog.likes
  }

  let topAuthor = null
  let maxLikes = 0

  for (const author in likesCount) {
    if (likesCount[author] > maxLikes) {
      maxLikes = likesCount[author]
      topAuthor = author
    }
  }

  return {
    author: topAuthor,
    likes: maxLikes
  }
}


module.exports = {
  dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}