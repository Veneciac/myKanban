<template>
    <md-toolbar class="md-transparent nav" md-elevation="0">
      <h3 class="md-title" style="flex: 1">Vunban</h3>
      <md-button @click.prevent="show">New Task</md-button>
    </md-toolbar>
</template>

<script>
export default {
  name: 'myNav',
  methods: {
      show () {
          this.$emit('show-form')
      }
  }
}
</script>

<style>

</style>
