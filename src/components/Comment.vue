<template>
  <div class="container-fluid">
    <div class="row p-3">
      <span class="badge badge-light" id="commentCard" v-if="comment.creator">
        <button type="button" id="deleteButton" class="btn btn-danger d-flex align-self-end pointer" v-if="comment.creator.email == state.user.email" @click="deleteComment">
          <i class="fas fa-ban"></i>
        </button>
        <img class="p-3" id="image" :src="comment.creator.picture" alt="">
        <il>{{ comment.creator.name }}</il>
        <br>
        <h4 class="p-4">{{ comment.body }}</h4>
      </span>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'

export default {
  name: 'Comment',
  props: {
    comment: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      blog: computed(() => AppState.activeBlog)
    })
    return {
      state,
      async deleteComment() {
        await blogsService.deleteComment(props.comment._id)
        blogsService.getComments(state.blog._id)
      }
    }
  },
  components: {}
}
</script>

<style>
#image{
  height: 100px;
  width: 100px;
  border-radius: 50px;
}
#commentCard{
  width: 800px;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  background-image: url('https://lh3.googleusercontent.com/proxy/Rf_COsOjMfuOEUpbp_YQZQFhaIWO9dV2hYn2E7_zueL8-FMYseyzuAwdn4rOWUlYReLclX7LkXagb7BYSWb7Hi6CgephIKSBHgavfkVx8UyExN33oIuqza9_ptwOnGCkYB7pADA2');
  border-color: rgb(34, 34, 34);
  border-width: 10px;
  background-size: cover;

}

</style>
