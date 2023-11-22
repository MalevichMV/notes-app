<template>
  <div v-if="isOpen" @click="cancel" class="modal">
    <form @click.stop class="new-note modal_window">
      <button @click="cancel" class="new-note__close-btn">+</button>
      <h3 class="new-note__title">Создание новой заметки</h3>
      <input
        v-model="noteName"
        type="text"
        class="input"
        placeholder="Введите название заметки"
      />
      <div class="new-note__input-wrapper">
        <input
          v-model="taskName"
          type="text"
          class="input input_task"
          placeholder="Введите название задачи"
        />
        <button @click.prevent="addTask" class="default-btn">+</button>
      </div>
      <hr class="new-note__separator" />
      <ul class="new-note__task-list">
        <li class="new-note__task" v-for="(item, i) in tasks" :key="i">
          <img
            @click="deleteTask(i)"
            class="trash-bin trash-bin_for-task"
            src="../../assets/img/trash-bin.svg"
            alt="trash-bin"
          />
          <span>{{ item }}</span>
        </li>
      </ul>
      <hr v-if="tasks.length > 0" class="new-note__separator" />
      <button
        @click.prevent="creating"
        :disabled="btnDisabled"
        class="default-btn"
      >
        Создать заметку
      </button>
    </form>
  </div>
</template>

<script>
import "./appCreatingNoteModal.scss";

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: {
    creating: (payload) => {
      if (
        typeof payload.title === "string" &&
        payload.title.length > 0 &&
        payload.tasks.length > 0
      ) {
        return true;
      } else {
        console.warn("Некорректные данные для события creating!");
        return false;
      }
    },
    cancel: null,
  },
  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },
  data() {
    return {
      noteName: "",
      taskName: "",

      tasks: [],
    };
  },
  computed: {
    btnDisabled() {
      return this.tasks.length === 0 || this.noteName === "";
    },
  },
  methods: {
    handleKeydown(e) {
      if (this.isOpen && e.key === "Escape") {
        this.cancel();
      }
    },
    clearData() {
      this.noteName = "";
      this.taskName = "";
      this.tasks.length = 0;
    },
    cancel() {
      this.$emit("cancel");
      this.clearData();
    },
    creating() {
      if (this.btnDisabled) return;
      const transformedData = {
        title: this.noteName,
        tasks: this.tasks.map((task) => ({
          title: task,
          completed: false,
        })),
      };
      this.$emit("creating", transformedData);
      this.clearData();
    },
    addTask() {
      if (!this.taskName) return;
      this.tasks.push(this.taskName);
      this.taskName = "";
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
  },
};
</script>
