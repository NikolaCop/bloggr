<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col d-flex-justify-content-center p-3">
        <span class="badge badge-light" id="blogCard">'
          <button type="button" id="deleteButton" class="btn btn-primary d-flex align-self-end pointer" v-if="state.user.isAuthenticated" @click="editBlog(blog._id)">
            <i class="fas fa-edit"></i>
          </button>
          <h1 class="p-3" id="content">
            <b> {{ state.blog.title }} </b>
          </h1>
          <div v-if="state.blog.creator.picture">
            <img :src="state.blog.creator.picture" id="image" class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt="">
            <p class="p-4"><b>By:</b> <i>{{ state.blog.creator.name }}</i> </p>
          </div>
          <h3 id="content" class="mt-4">
            {{ state.blog.body }}
          </h3>
        </span>
      </div>
    </div>

    <div class="row p-3 justify-content-center">
      <form class="form-inline" @submit.prevent="createComment">
        <div class="form-group" v-if="state.user.isAuthenticated">
          <input
            type="text"
            name="body"
            id="body"
            class="form-control"
            placeholder="Write a Comment..."
            aria-describedby="helpId"
            v-model="state.newComment.body"
          />
        </div>
        <button type="submit" class="btn btn-primary" @click="createComment()" v-if="state.user.isAuthenticated">
          Create Comment
        </button>
      </form>
    </div>
    <div class="row justify-content-center">
      <comment v-for="commentData in state.comments" :key="commentData._id" :comment="commentData" />
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'
import { useRoute, useRouter } from 'vue-router'
import comment from '../components/Comment'

export default {
  name: 'BlogDetails',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      blog: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.comments),
      newComment: {},
      user: computed(() => AppState.user)
    })
    onMounted(() => {
      blogsService.getBlogs(route.params._id)
      blogsService.getComments(route.params.id)
    })
    return {
      route,
      state,
      async createComment() {
        const commentId = await blogsService.createComment(state.newComment)
        router.push({ name: 'BlogDetailsPage', params: { id: commentId } })
        state.newComment = {}
      }
    }
  },
  components: {
    comment
  }
}
</script>

<style>
.container-fluid{
  background-image: url('https://i.stack.imgur.com/yJedC.jpg');
}
#blogCard{
width: 1350px;
height: 500px;
border-radius: 50px;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQEAAADECAMAAACoYGR8AAAAWlBMVEX////G5vzH5/z2+/7U7Pzi8v3o9f79vNn+0+b+7fX/7/XosdjF6v7ew+TG6PzQ2PL5///zt9n50eb36vTts9jlx+Tb3fPQ7/7h9v/ty+Xn4vPp+f/9uNf+0OTqtr0lAAACMklEQVR4nO3dy3LaQBAFUCCJcALG4DwMJPn/34xwJburrZTSPbdK3szGddzqGTcCNpuY/Xg9fclrHXkX+Lz0b7FkCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJNT1BsU46H7fb0/HKKiyvLhEtTDeToAwQIECBAoGk3jKeE4+G0cyKqqYEcfYAAAQIEmgQ+pJz34/X6Na6tLZuPKW/fxh/ff8S1tWWiMpyImvpADgECBAg07QVxauA1o6oayNEHCBAgQKBJIE4NzvvzY0JynnlYsUimJyRvJiRORC19IIcAAQIEmgQ+pVwv43W7x7W1ZTOk/LyM1+0e19aWicpougtyCBAgQIBA03/Hu5R/T9XGxZVlwqWpBnL0AQIECBBoEohTg+tlGK63+zDzsGKRmJBMVEbTXZBDgAABAgSa/juOUwMTkqoayNEHCBAgQIBA024YTwlORFU1kKMPECBAgACBpt0wvhvZO6+raiBHHyBAgACBpr0g7pHHw2l7fH7Zzbw1L5IJl6YayNEHCBAgQIBA024YTwk+vb+qBnL0AQIECBAg0LQbxidLPEVTVQM5+gABAgQIEGgSiKeE42H3OBHNfDZZJhMuTkRNd0EOAQIECDTtBfF1FE/VVtVAjj5AgAABAgSaBOLU4O+ExGtGc/4l/rc03QU5BAgQIECgaTeMcxPPFVfVQI4+QIAAAQJNAvEz/X3D4+P7CwbfX9ByF+T8Gq/f1QJSlD8V/lro9abKxgAAAABJRU5ErkJggg==');
  background-size: cover;
  border-color: rgb(0, 0, 0);
  border-width: 5px;
}
#content{
  font-family: 'Coming Soon', cursive;
}
</style>
