<template>
  <div v-if="isOpen" @click="cancel" class="modal">
    <div @click.stop class="confirmation modal_window">
      <p class="confirmation__text">Вы действительно хотите удалить элемент?</p>
      <div class="confirmation__btns">
        <button @click="confirm" class="default-btn default-btn_delete">
          Удалить
        </button>
        <button @click="cancel" class="default-btn default-btn_cancel">
          Отмена
        </button>
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
  emits: {
    confirm: null,
    cancel: null,
  },
  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },

  methods: {
    handleKeydown(e) {
      if (this.isOpen && e.key === "Escape") {
        this.cancel();
        return;
      }
      if (this.isOpen && e.key === "Enter") {
        this.confirm();
        return;
      }
    },

    cancel() {
      this.$emit("cancel");
    },
    confirm() {
      this.$emit("confirm");
    },
  },
};
</script>
