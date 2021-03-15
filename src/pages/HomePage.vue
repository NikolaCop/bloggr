<template>
  <div class="container=fluid" id="bodyBg">
    <div class="row p-3 justify-content-center">
      <form class="form-inline" @submit.prevent="createBlog">
        <div class="form-group" v-if="state.user.isAuthenticated">
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
        <div class="form-group" v-if="state.user.isAuthenticated">
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
        <button type="submit" id="plus" class="btn btn-info" @click="createBlog()" v-if="state.user.isAuthenticated">
          <i class="fas fa-plus"></i>
        </button>
      </form>
    </div>
    <div class="row p-5">
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
      newBlog: {},
      user: computed(() => AppState.user)
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
#title{
  border-radius: 50px;
  border-width: 3px;
  border-color: rgb(75, 74, 74);
  font-family: 'Coming Soon', cursive;
}
#plus{
  border-radius: 50px;
border-width: 3px;
border-color:rgb(3, 95, 87);
}
#body{
  border-radius: 50px;
  border-width: 3px;
  border-color: rgb(75, 74, 74);
  font-family: 'Coming Soon', cursive;
}

.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
  #bodyBg{
  background-image: url('https://i.stack.imgur.com/yJedC.jpg');
  background-size: cover;
}
}
</style>
