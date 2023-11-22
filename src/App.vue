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
      @creating="addNote"
      @cancel="isCreatingModalOpen = false"
    ></app-creating-note-modal>
    <button
      @click="isCreatingModalOpen = true"
      class="default-btn default-btn_create"
    >
      Создать новую заметку
    </button>
    <p v-if="notes.length === 0" class="no-notes-message">Заметок пока нет!</p>
    <div v-for="(note, i) in notes" :key="i" class="note">
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
        @click="openConfirmationModal(i)"
        class="trash-bin"
        src="./assets/img/trash-bin.svg"
        alt="trash-bin"
      />
    </div>
  </main>
</template>

<script>
import AppModalConfirmation from "./components/AppModalConfirmation.vue";
import AppCreatingNoteModal from "./components/AppCreatingNoteModal.vue";

export default {
  name: "App",
  components: {
    AppModalConfirmation,
    AppCreatingNoteModal,
  },
  data() {
    return {
      isConfirmationModalOpen: false,
      confirmationIndex: null,

      isCreatingModalOpen: false,
      notes: [
        {
          title: "Прибрать дом",
          tasks: [
            {
              title: "Пропылесосить",
              completed: true,
            },
            {
              title: "Помыть полы",
              completed: false,
            },
            {
              title: "Вытереть пыль",
              completed: true,
            },
          ],
        },
        {
          title: "Планы на день",
          tasks: [
            {
              title: "Погулять с собакой",
              completed: false,
            },
            {
              title: "Приготовить поесть",
              completed: true,
            },
          ],
        },
      ],
    };
  },
  methods: {
    shortenedTasks(tasksArray) {
      if (tasksArray.length <= 2) return tasksArray;

      return tasksArray.slice(0, 2);
    },
    addNote(note) {
      this.isCreatingModalOpen = false;
      this.notes.push(note);
    },
    deleteNote() {
      this.notes.splice(this.confirmationIndex, 1);
      this.closeConfirmationModal();
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
