<template>
  <div class="col-4 p-2">
    <div class="card p-5" style="width: 25rem;" id="blogCard">
      <button type="button" id="deleteButton" class="btn btn-danger d-flex align-self-end pointer" v-if="state.user.isAuthenticated" @click="deleteBlog(blog._id)">
        <i class="fas fa-ban"></i>
      </button>
      <h3 class="text-center p-3">
        {{ blog.title }}
      </h3>
      <p id="author">
        <!-- <b> By: </b> <i> {{ blog.creator.name }} </i> -->
      </p>
      <router-link :to="{name: 'BlogDetailsPage', params: {id: blog._id}}">
        <button type="button" id="readButton" class="btn btn-success " @click="setActiveBlog(blog._id)">
          Read <i class="far fa-play-circle"></i>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { blogsService } from '../services/BlogsService'
import { AppState } from '../AppState'
import { useRouter } from 'vue-router'
import { computed, reactive } from 'vue'
export default {
  name: 'Blog',
  props: {
    blog: Object
  },
  setup(props) {
    const router = useRouter()
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      async setActiveBlog() {
        await blogsService.setActiveBlog(props.blog._id)
        router.push({ name: 'BlogDetailsPage' })
        console.log(AppState.activeBlog)
      },
      async deleteBlog() {
        blogsService.deleteBlog(props.blog._id)
      }
    }
  },
  components: {}
}
</script>

<style>
#blogCard{
  border-top-left-radius: 50px;
  border-bottom-right-radius: 50px;
  background-image: url('https://wallpaperaccess.com/full/2578748.jpg');
  border-color: rgb(158, 137, 250);
  border-width: 5px;
}
#deleteButton{
  border-radius: 50px;
}
#readButton{
    border-top-left-radius: 50px;
  border-bottom-right-radius: 50px;
  border-width: 3px;
  border-color: green;
}
#author{
  font-size: smaller;
}
</style>
