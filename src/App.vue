<template>
  <header>
    <h1>Мои заметки</h1>
  </header>
  <main>
    <app-modal-confirmation :is-open="false"></app-modal-confirmation>
    <app-creating-note-modal :is-open="false"></app-creating-note-modal>
    <button class="default-btn default-btn_create">
      Создать новую заметку
    </button>
    <div class="note">
      <h2 class="note__title">Заметка 1</h2>
      <ul class="task-list">
        <li class="task-list__task">
          <input class="task-list__checkbox" type="checkbox" />
          <span>Задача 1</span>
        </li>
        <li class="task-list__task">
          <input class="task-list__checkbox" type="checkbox" />
          <span>Задача 2</span>
        </li>
        <li class="task-list__task task-list__task_etc">...</li>
      </ul>
      <img class="trash-bin" src="./assets/img/trash-bin.svg" alt="trash-bin" />
    </div>
    <div class="note">
      <h2 class="note__title">Заметка 2</h2>
      <ul class="task-list">
        <li class="task-list__task">
          <input class="task-list__checkbox" type="checkbox" />
          <span>Задача 1</span>
        </li>
        <li class="task-list__task">
          <input class="task-list__checkbox" type="checkbox" />
          <span>Задача 2</span>
        </li>
        <li class="task-list__task task-list__task_etc">...</li>
      </ul>
      <img class="trash-bin" src="./assets/img/trash-bin.svg" alt="trash-bin" />
    </div>
  </main>
</template>

<script>
import AppModalConfirmation from "./components/AppModalConfirmation.vue";
import AppCreatingNoteModal from "./components/AppCreatingNoteModal.vue";

export default {
  name: "App",
  components: { AppModalConfirmation, AppCreatingNoteModal },
};
</script>
