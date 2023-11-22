<template>
  <header>
    <h1>Мои заметки</h1>
  </header>
  <main>
    <app-modal-confirmation
      :is-open="isConfirmationModalOpen"
      @confirm="deleteNote"
      @cancel="closeConfirmationModal"
    ></app-modal-confirmation>
    <app-creating-note-modal
      :is-open="isCreatingModalOpen"
      @creating="addCurrentNote"
      @cancel="isCreatingModalOpen = false"
    ></app-creating-note-modal>
    <button
      @click="isCreatingModalOpen = true"
      class="default-btn default-btn_create"
    >
      Создать новую заметку
    </button>
    <p v-if="notes.length === 0" class="no-notes-message">Заметок пока нет!</p>
    <div
      v-for="note in notes"
      :key="note.id"
      @click="$router.push({ name: 'CurrnetNote', params: { id: note.id } })"
      class="note"
    >
      <h2 class="note__title">{{ note.title }}</h2>
      <ul class="task-list">
        <li
          v-for="(task, i) in note.tasks.slice(0, 2)"
          :key="i"
          class="task-list__task"
        >
          <input
            :checked="task.completed"
            disabled
            class="task-list__checkbox"
            type="checkbox"
          />
          <span>{{ task.title }}</span>
        </li>
        <li
          v-if="note.tasks.length > 2"
          class="task-list__task task-list__task_etc"
        >
          ...
        </li>
      </ul>
      <img
        @click.stop="openConfirmationModal(note.id)"
        class="trash-bin"
        src="../../assets/img/trash-bin.svg"
        alt="trash-bin"
      />
    </div>
  </main>
</template>

<script>
import AppModalConfirmation from "../../components/AppModalConfirmation/AppModalConfirmation.vue";
import AppCreatingNoteModal from "../../components/AppCreatingNoteModal/AppCreatingNoteModal.vue";
import "./app.scss";

import {
  getAllNotes,
  deleteNoteById,
  addNote,
} from "../../services/IndexedDBService.js";

export default {
  components: {
    AppModalConfirmation,
    AppCreatingNoteModal,
  },
  data() {
    return {
      isConfirmationModalOpen: false,
      confirmationId: null,

      isCreatingModalOpen: false,
      notes: [],
    };
  },
  created() {
    getAllNotes()
      .then((result) => {
        this.notes = result;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    shortenedTasks(tasksArray) {
      if (tasksArray.length <= 2) return tasksArray;

      return tasksArray.slice(0, 2);
    },
    addCurrentNote(note) {
      addNote(note)
        .then((id) => {
          this.isCreatingModalOpen = false;
          note.id = id;
          this.notes.push(note);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    deleteNote() {
      deleteNoteById(this.confirmationId)
        .then(() => {
          const indexToRemove = this.notes.findIndex(
            (obj) => obj.id === this.confirmationId
          );
          if (indexToRemove !== -1) {
            this.notes.splice(indexToRemove, 1);
          }
          this.closeConfirmationModal();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    openConfirmationModal(confirmationId) {
      this.isConfirmationModalOpen = true;
      this.confirmationId = confirmationId;
    },
    closeConfirmationModal() {
      this.isConfirmationModalOpen = false;
      this.confirmationId = null;
    },
  },
};
</script>
