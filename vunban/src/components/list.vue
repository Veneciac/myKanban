<template>
    <md-card :class="col + ' ' + 'list'">
      <md-card-header>
        <div class="md-title">{{ status }}</div>
      </md-card-header>

      <md-card-content>
          <task-card v-for="task in tasks" :task="task" :key="task.id"/>
      </md-card-content>

    </md-card>
</template>

<script>
import taskCard from '@/components/card.vue'
export default {
    name: 'list',
    props: ['status', 'tasks', 'col'],
    components: {
        taskCard
    }
}
</script>

<style>

</style>
