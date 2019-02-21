<template>
    <md-card :class="col + ' ' + 'list'">
      <md-card-header>
        <div class="md-title">{{ status }}</div>
      </md-card-header>

      <draggable v-model="task2" :options="{ group:'id' }" @start="drag=true" @end="drag=false"  @change="handleChange">
        <div v-for="task in task2" :key="task.id">
          <task-card :task="task"/>
        </div>
      </draggable>

    </md-card>
</template>

<script>
import taskCard from '@/components/card.vue'
import draggable from 'vuedraggable'
import db from '@/script/firebase.js'

export default {
    name: 'list',
    props: ['status', 'tasks', 'col', 'num'],
    data () {
      return {
       task2: []
      }
    },
    watch: {
      tasks (val) {
        this.task2 = val
      }
    },
    components: {
        taskCard,
        draggable
    },
    methods: {
      handleChange(){
        if(arguments[0].added){
            db.collection("tasks").doc(arguments[0].added.element.id).update({
                "status": this.num
            })
            .then(() => {
            });
        }
      }
    }
}
</script>

<style>

</style>
