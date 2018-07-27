<template>
  <div class="card">
    <div @click="toggle" class="card-header">
        <a class="accordion-toggle">
          <slot name="title"></slot>
        </a>
    </div>
    <div v-if="isOpen" class="card-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Accordion',
    props: { shouldBeOpen: {type: Boolean, default: false} },
    data () {
      return {
        isOpen: this.shouldBeOpen
      }
    },
    watch: {
      shouldBeOpen (newVal) {
        this.isOpen = newVal
      }
    },
    methods: {
      toggle () {
        this.isOpen = !this.isOpen
      }
    }
  }
</script>
<style scoped>
.card-header {
  cursor: pointer;
}
</style>