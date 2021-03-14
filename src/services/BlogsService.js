import { AppState } from '../AppState'
import { api } from './AxiosService'

class BlogsService {
  async getBlogs() {
    try {
      const res = await api.get('blogs')
      AppState.blogs = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getComments(id) {
    try {
      const res = await api.get('blogs/' + id + '/comments')
      AppState.comments = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async setActiveBlog(_id) {
    try {
      const res = await api.get('blogs/' + _id)
      AppState.activeBlog = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async createBlog(rawBlog) {
    try {
      const res = await api.post('blogs/', rawBlog)
      AppState.blogs.push(res.data)
      return res.data._id
    } catch (error) {
      console.error(error)
    }
  }

  async deleteBlog(_id) {
    await api.delete('blogs/' + _id)
    this.getBlogs()
  }
}

export const blogsService = new BlogsService()
