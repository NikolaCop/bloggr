import { AppState } from '../AppState'
import { sandboxApi } from './AxiosService'

class BlogsService {
  async getBlogs() {
    try {
      const res = await sandboxApi.get('blogs')
      AppState.blogs = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getComments(id) {
    try {
      const res = await sandboxApi.get('blogs/' + id + '/comments')
      AppState.comments = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async setActiveBlog(_id) {
    try {
      const res = await sandboxApi.get('blogs/' + _id)
      AppState.activeBlog = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async createBlog(rawBlog) {
    try {
      const res = await sandboxApi.post('blogs/', rawBlog)
      AppState.blogs.push(res.data)
      return res.data._id
    } catch (error) {
      console.error(error)
    }
  }

  async createComment(rawComment) {
    try {
      const res = await sandboxApi.post('comments/', rawComment)
      AppState.comments.push(res.data)
      return res.data._id
    } catch (error) {
      console.error(error)
    }
  }

  async deleteComment(_id) {
    await sandboxApi.delete('comments/' + _id)
    this.getComments()
  }

  async deleteBlog(_id) {
    await sandboxApi.delete('blogs/' + _id)
    this.getBlogs()
  }

  async editBlog(_id) {
    const blog = AppState.blogs.find(b => b._id === _id)
    try {
      await sandboxApi.put('blogs/' + _id, blog)
    } catch (error) {

    }
  }

  async editComment(_id) {
    const comment = AppState.comments.find(c => c._id === _id)
    try {
      await sandboxApi.put('comments/' + _id, comment)
    } catch (error) {

    }
  }
}

export const blogsService = new BlogsService()
