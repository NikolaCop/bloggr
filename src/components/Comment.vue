<template>
  <div class="container-fluid">
    <div class="row p-3">
      <span class="badge badge-light" id="commentCard">'
        <button type="button" id="deleteButton" class="btn btn-primary d-flex align-self-end pointer" v-if="state.user.isAuthenticated" @click="editBlog(blog._id)">
          <i class="fas fa-edit"></i>
        </button>
        <button type="button" id="deleteButton" class="btn btn-danger d-flex align-self-end pointer" v-if="state.user.isAuthenticated" @click="deleteComment(comment._id)">
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

export default {
  name: 'Comment',
  props: {
    comment: { type: Object, required: true }
  },
  setup() {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state
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
  background-image: url('https://lh3.googleusercontent.com/proxy/FjCInkEk3LoKPDFAoSIDTDWsMo5CZUozQnYuBXOsNnmGiC-dLFGPLYoKCkXzl0kzBCXTHd-2MgI9uhWteBLJZIGfE_qxLcmvzlt3YRNz7OfpjzPW1yDYGx4MPDEVVuSFvDWvCuB9');
  border-color: rgb(34, 34, 34);
  border-width: 10px;
  background-size: cover;

}

</style>
