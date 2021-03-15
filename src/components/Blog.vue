<template>
  <div class="col-4 p-2">
    <div class="card p-4" style="width: 25rem;" id="blogCard" v-if="blog.creator.email">
      <button type="button" id="deleteButton" class="btn btn-danger d-flex align-self-end pointer" v-if="blog.creator.email == state.user.email" @click="deleteBlog(blog._id)">
        <i class="fas fa-ban"></i>
      </button>
      <h3 class="text-center p-3" id="content">
        <b>  {{ blog.title }} </b>
      </h3>
      <p id="author">
        <!-- <b> By: </b> <i> {{ blog.creator.name }} </i> -->
      </p>
      <router-link :to="{name: 'BlogDetailsPage', params: {id: blog._id}}">
        <button type="button" id="readButton" class="btn btn-success p-3" @click="setActiveBlog(blog._id)">
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
    blog: { type: Object, required: true }
  },
  setup(props) {
    const router = useRouter()
    const state = reactive({
      blogs: computed(() => AppState.blogs),
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
  background-image: url('https://lh3.googleusercontent.com/proxy/Rf_COsOjMfuOEUpbp_YQZQFhaIWO9dV2hYn2E7_zueL8-FMYseyzuAwdn4rOWUlYReLclX7LkXagb7BYSWb7Hi6CgephIKSBHgavfkVx8UyExN33oIuqza9_ptwOnGCkYB7pADA2');
  border-color: rgb(39, 39, 39);
  border-width: 5px;
}
#deleteButton{
  border-radius: 50px;
  border-width: 3px;
  border-color: rgb(65, 65, 65);
}
#readButton{
    border-top-left-radius: 50px;
  border-bottom-right-radius: 50px;
  border-width: 3px;
  border-color: green;
  font-family: 'Coming Soon', cursive;
}
#author{
  font-size: smaller;
}
#content{
font-family: 'Coming Soon', cursive;
}
</style>
