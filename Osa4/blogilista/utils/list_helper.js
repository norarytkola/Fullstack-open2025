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

module.exports = {
  dummy, totalLikes, favouriteBlog
}