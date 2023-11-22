<template>
  <header>
    <h1>{{ note.title }}</h1>
    <img
      @click="$router.push({ name: 'StartingPage' })"
      src="../assets/img/back-arrow.svg"
      alt="back"
      class="back-arrow"
    />
  </header>
  <main>
    <ul class="task-list">
      <li
        v-for="(item, i) in note.tasks"
        :key="i"
        class="task-list__task task-list__task_center"
      >
        <input
          :checked="item.completed"
          @click.prevent="changeStatusOfTask(i)"
          class="task-list__checkbox"
          type="checkbox"
        />
        <span>{{ item.title }}</span>
        <img
          class="trash-bin task-list__trash-bin"
          src="../assets/img/trash-bin.svg"
          alt="trash-bin"
        />
      </li>
    </ul>
  </main>
</template>

<script>
import { getNoteById, updateTaskStatus } from "../services/IndexedDBService.js";

export default {
  data() {
    return {
      note: {},
    };
  },
  created() {
    getNoteById(this.$route.params.id)
      .then((result) => {
        this.note = result;
      })
      .catch((error) => {
        console.error(error);
        this.$router.push({ name: "NotFound" });
      });
  },
  methods: {
    changeStatusOfTask(index) {
      updateTaskStatus(
        this.$route.params.id,
        index,
        !this.note.tasks[index].completed
      )
        .then(() => {
          this.note.tasks[index].completed = !this.note.tasks[index].completed;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
