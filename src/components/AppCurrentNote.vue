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
    <app-modal-confirmation
      :is-open="isConfirmationModalOpen"
      @confirm="deleteSelectedTask"
      @cancel="closeConfirmationModal"
    ></app-modal-confirmation>
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
          @click="openConfirmationModal(i)"
          class="trash-bin task-list__trash-bin"
          src="../assets/img/trash-bin.svg"
          alt="trash-bin"
        />
      </li>
    </ul>
  </main>
</template>

<script>
import AppModalConfirmation from "./AppModalConfirmation.vue";

import {
  getNoteById,
  updateTaskStatus,
  deleteTask,
} from "../services/IndexedDBService.js";

export default {
  components: {
    AppModalConfirmation,
  },
  data() {
    return {
      isConfirmationModalOpen: false,
      confirmationIndex: null,

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
    deleteSelectedTask() {
      deleteTask(this.$route.params.id, this.confirmationIndex)
        .then(() => {
          this.note.tasks.splice(this.confirmationIndex, 1);
          this.closeConfirmationModal();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    openConfirmationModal(confirmationIndex) {
      this.isConfirmationModalOpen = true;
      this.confirmationIndex = confirmationIndex;
    },
    closeConfirmationModal() {
      this.isConfirmationModalOpen = false;
      this.confirmationIndex = null;
    },
  },
};
</script>
