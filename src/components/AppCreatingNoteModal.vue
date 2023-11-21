<template>
  <div v-if="isOpen" class="modal">
    <form class="new-note modal_window">
      <h3 class="new-note__title">Создание новой заметки</h3>
      <input type="text" class="input" placeholder="Введите название заметки" />
      <div class="new-note__input-wrapper">
        <input
          type="text"
          class="input input_task"
          placeholder="Введите название задачи"
        />
        <button class="default-btn">+</button>
      </div>
      <hr class="new-note__separator" />
      <ul class="new-note__task-list">
        <li>Пропылесосить</li>
        <li>Помыть полы</li>
      </ul>
      <hr class="new-note__separator" />
      <button class="default-btn">Создать заметку</button>
      <button class="new-note__close-btn">+</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
