<template>
  <div class="home">
    <my-nav @show-form="modal = true"/>

    <!-- FORM -->
    <md-dialog :md-active.sync="modal" class="my-form">
      <md-dialog-title class="form-text">Preferences</md-dialog-title>
      <md-content>
        <form @submit.prevent="addTask">
          <md-field>
            <label style="color: black">Title</label>
            <md-input v-model="title" ></md-input>
          </md-field>

          <md-field>
            <label>Description</label>
            <md-input v-model="description" ></md-input>
          </md-field>

          <md-field>
            <label>Point</label>
            <md-input v-model="point"></md-input>
          </md-field>

          <md-field>
            <label>Assigned to</label>
            <md-input v-model="assigned"></md-input>
          </md-field>

          <md-dialog-actions>
            <md-button class="md-primary form-text" @click="modal = false">close</md-button>
            <md-button class="md-primary form-text" type="submit">Add</md-button>
          </md-dialog-actions>
        </form>
      </md-content>
    </md-dialog>

    <div class="list-category card-expansion">
      <list :col="'backlog'" :tasks="backLog" :status="'Back-Log'"/>
      <list :col="'todo'" :tasks="todo" :status="'Todo'"/>
      <list :col="'doing'" :tasks="doing" :status="'Doing'"/>
      <list :col="'done'" :tasks="done" :status="'Done'"/>
    </div>
  </div>
</template>

<script>
import db from '@/script/firebase.js'
import myNav from '@/components/nav.vue'
import list from '@/components/list.vue'
import alertify from 'alertifyjs'

export default {
  name: 'home',
  components: {
    myNav,
    list
  },
  data () {
    return {
      modal: false,
      title: '',
      description: '',
      point: '',
      assigned: '',
      backLog: [],
      todo: [],
      doing: [],
      done: [],
    }
  },
  methods: {
     addTask () {
       if (!this.title || !this.description || !this.point || !this.assigned || isNaN(this.point)) {
         alertify.error(`Input  is not valid`)
       } else {
         this.modal = false
         db.collection("tasks").add({
           title: this.title,
           description: this.description,
           point: this.point,
           assigned: this.assigned,
           status: 1
         })
         .then((docRef) => {
           this.title = ''
           this.description = ''
           this.points = 0
           this.assigned = ''
         })
         .catch((error) => {
           console.error("Error adding document: ", error);
         });
       }
    },
    fetch () {
       db.collection("tasks")
        .onSnapshot((querySnapshot) => {
          this.backLog = []
          this.todo = []
          this.doing = []
          this.done = []
          querySnapshot.forEach((doc) => {

            if (doc.data().status == 1) {
              this.backLog.unshift({id: doc.id, ...doc.data()})
            } else if (doc.data().status == 2) {
              this.todo.unshift({id: doc.id, ...doc.data()})
            } else if (doc.data().status == 3) {
              this.doing.unshift({id: doc.id, ...doc.data()})
            } else if (doc.data().status == 4) {
              this.done.unshift({id: doc.id, ...doc.data()})
            }
          })
        })
    }
  },
  created () {
    this.fetch()
  }
}
</script>
