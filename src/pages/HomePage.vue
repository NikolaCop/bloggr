<template>
  <div class="container=fluid" id="bodyBg">
    <div class="row p-3">
      <form class="form-inline" @submit.prevent="createBlog">
        <div class="form-group">
          <input
            type="text"
            name="title"
            id="title"
            class="form-control"
            placeholder="Title..."
            aria-describedby="helpId"
            v-model="state.newBlog.title"
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            name="body"
            id="body"
            class="form-control"
            placeholder="Body..."
            aria-describedby="helpId"
            v-model="state.newBlog.body"
          />
        </div>
        <button type="submit" class="btn btn-primary" @click="createBlog()">
          Create Blog
        </button>
      </form>
    </div>
    <div class="row p-3">
      <blog v-for="blogData in state.blogs" :key="blogData._id" :blog="blogData" />
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'
import blog from '../components/Blog'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const state = reactive({
      blogs: computed(() => AppState.blogs),
      newBlog: {}
    })
    onMounted(() => {
      blogsService.getBlogs()
    })
    return {
      state,
      async createBlog() {
        const blogId = await blogsService.createBlog(state.newBlog)
        router.push({ name: 'BlogDetailsPage', params: { id: blogId } })
        state.newBlog = {}
      }
    }
  },
  components: {
    blog
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
  #bodyBg{
  background-image: url('https://media0.giphy.com/media/9JxkPTP3alOykb8PmQ/giphy.gif');
  background-size: cover;
}
}
</style>
