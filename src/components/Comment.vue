<template>
  <div class="container-fluid">
    <div class="row p-3">
      <span class="badge badge-light" id="commentCard">'
        <img class="p-3" id="image" :src="comment.creator.picture" alt="">
        <il>{{ comment.creator.name }}</il>
        <br>
        <h4 class="p-4">{{ comment.body }}</h4>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Comment',
  props: {
    comment: { type: Object, required: true }
  },
  setup() {
    return {

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
  background-color: aliceblue;
  border-color: rgb(34, 34, 34);
  border-width: 10px;

}

</style>
