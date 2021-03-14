<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col d-flex-justify-content-center p-3">
        <span class="badge badge-light" id="blogCard">'
          <h1 class="p-3">
            {{ state.blog.title }}
          </h1>
          <img :src="state.blog.creator.picture" id="image" class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt="">
          <p class="p-3"><b>By:</b> <i>{{ state.blog.creator.name }}</i> </p>
          <h3>
            {{ state.blog.body }}
          </h3>
        </span>
      </div>
    </div>
    <div class="row">
      <comment v-for="commentData in state.comments" :key="commentData._id" :comment="commentData" />
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'
import { useRoute } from 'vue-router'
import comment from '../components/Comment'
export default {
  name: 'BlogDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      blog: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.comments)
    })
    onMounted(() => {
      blogsService.getBlogs(route.params.id)
      blogsService.getComments(route.params.id)
    })
    return {
      route,
      state
    }
  },
  components: {
    comment
  }
}
</script>

<style>
#blogCard{
width: 1350px;
height: 500px;
border-radius: 50px;
  background-image: url('https://wallpaperaccess.com/full/2578748.jpg');
  background-size: cover;
  border-color: rgb(158, 137, 250);
  border-width: 5px;
}
</style>
