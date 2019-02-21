<template>
    <md-card md-with-hover class="task-card">
      <md-ripple>
        <md-card-header>
          <div class="md-title text-black" >{{ task.title }}</div>
          <hr>
          <div class="md-subhead">{{ task.point }}</div>
        </md-card-header>

        <md-card-content class="text-black">
            {{ task.description }}
            <br>
            assigned to: {{ task.assigned}}
        </md-card-content>

        <md-card-actions>
          <md-button class="text-black" v-if="task.status > 1" @click.prevent="before">{{ beforeBtn }}</md-button>
          <md-button class="text-black" @click.prevent="deleteTask">Delete</md-button>
          <md-button class="text-black" v-if="task.status < 4" @click.prevent="next">{{ nextBtn }}</md-button>
        </md-card-actions>
      </md-ripple>
    </md-card>
</template>

<script>
import db from '@/script/firebase.js'
import alertify from 'alertifyjs'

export default {
    name: 'taskCard',
    props: ['task'],
    data () {
        return {
            nextBtn: '',
            beforeBtn: ''
        }
    },
    methods: {
        next () {
             db.collection('tasks').doc(this.task.id).set({
                title: this.task.title,
                description: this.task.description,
                point: this.task.point,
                assigned: this.task.assigned,
                status: this.task.status + 1
            })
            .then(function() {
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        },
        before () {
            db.collection('tasks').doc(this.task.id).set({
                title: this.task.title,
                description: this.task.description,
                point: this.task.point,
                assigned: this.task.assigned,
                status: this.task.status - 1
            })
            .then(function() {
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        },
        deleteTask () {
              db.collection("tasks").doc(this.task.id).delete()
                .then(function() {
                    alertify.message('Success delete task')
                })
                .catch(function(error) {
                    alertify.error("Error removing document: ", error);
                });
        }
    },
    created () {
        if (this.task.status == 1) {
            this.nextBtn = 'todo'
        } else if (this.task.status == 2) {
            this.nextBtn = 'doing'
            this.beforeBtn = 'back log'
        } else if (this.task.status == 3) {
            this.nextBtn = 'done'
            this.beforeBtn = 'todo'
        } else {
            this.beforeBtn = 'doing'
        }
    }
}
</script>

<style>

</style>
