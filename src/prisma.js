import {Prisma} from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
})

const createPostForUser = async (authorId, data) => {
  const userExists = await prisma.exists.User({id: authorId})

  if (!userExists) throw new Error('User not found')

  const post = await prisma.mutation.createPost(
    {
      data: {
        ...data,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    },
    '{id author {id name email posts {id title published}}}',
  )

  return post.author
}

const updatePostForUser = async (postId, data) => {
  const postExists = await prisma.exists.Post({id: postId})

  if (!postExists) throw new Error('Post not found')

  const post = await prisma.mutation.updatePost(
    {
      where: {
        id: postId,
      },
      data,
    },
    '{id author {id name email posts { id title published }}}',
  )

  return post.author
}

// updatePostForUser('ckmglwk1i00uf0a78rk9064fi', {published: true})
//   .then((data) => console.log(JSON.stringify(data, undefined, 2)))
//   .catch((error) => console.error(error))

// createPostForUser('ckmgd5fqw00o2097823i6a74q', {
//   title: 'Great books to read',
//   body: '1984',
//   published: false,
// })
//   .then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
//   })
//   .catch((error) => console.error(error))

// prisma.query.users(null, '{id name email posts { id title }}').then((data) => {
//   console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.query.comments(null, '{ id text author { name } post { id title } }').then((data) => {
//   console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.mutation

// prisma.mutation
//   .updatePost(
//     {
//       where: {
//         id: 'ckmglb9ge00fy0a78hjm3aa2j',
//       },
//       data: {
//         published: false,
//       },
//     },
//     '{ id title published}',
//   )
//   .then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
//     return prisma.query.posts(null, '{ id title body published author { name }}')
//   })
//   .then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
//   })

// prisma.subscription
// prisma.exists
