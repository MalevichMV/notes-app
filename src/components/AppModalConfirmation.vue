<template>
  <div v-if="isOpen" class="modal">
    <div class="confirmation modal_window">
      <p class="confirmation__text">Вы действительно хотите удалить элемент?</p>
      <div class="confirmation__btns">
        <button class="default-btn default-btn_delete">Удалть</button>
        <button class="default-btn default-btn_cancel">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppModalConfirmation",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
