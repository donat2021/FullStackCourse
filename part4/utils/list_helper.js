const dummy = (blogs) => {
    return 1
  }
const totalLikes=(blogs)=>
{
    let sum=0
    for(i=0;i<blogs.length;i++)
    {
        sum+=blogs[i].likes
    }
    return sum
}
const favoriteBlog=(blogs)=>
{
    let maximum=0
    let title=""
    for(i=0;i<blogs.length;i++)
    {
        if(blogs[i].likes>maximum)
       title=blogs[i].title
    }
    return title
}
const mostBlogs=(blogs)=>
{
    const usedAuthor = []
        let usedCounter=0
        let counter = 0
        let finalCounter=0
        for (i = 0; i < blogs.length; i++)
        {
            if (!usedAuthor.includes(blogs[i].author)) 
            {
                counter=0
                for (j = 0; j < blogs.length; j++)
                {
                    if(blogs[j].author==blogs[i].author)
                    {
                        counter++
                    }
                }
                usedAuthor[usedCounter]=blogs[i].author
                usedCounter++
                if(counter>finalCounter)
                {
                    finalCounter=counter
                }
            }
        }
        return finalCounter
}
const mostLikes=(blogs)=>
{
    const usedAuthor = []
        let usedCounter=0
        let sum = 0
        let finalSum=0
        for (i = 0; i < blogs.length; i++)
        {
            if (!usedAuthor.includes(blogs[i].author)) 
            {
                sum=0
                for (j = 0; j < blogs.length; j++)
                {
                    if(blogs[j].author==blogs[i].author)
                    {
                        sum+=blogs[j].likes
                    }
                }
                usedAuthor[usedCounter]=blogs[i].author
                usedCounter++
                if(sum>finalSum)
                {
                    finalSum=sum
                }
            }
        }
        return finalSum
}
  module.exports = {
    dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes
  }