<template>
  <header>
    <h1>Заметка 1</h1>
    <img src="../assets/img/back-arrow.svg" alt="back" class="back-arrow" />
  </header>
  <main>
    <ul class="task-list">
      <li class="task-list__task task-list__task_center">
        <input class="task-list__checkbox" type="checkbox" />
        <span>Задача 1</span>
        <img
          class="trash-bin task-list__trash-bin"
          src="../assets/img/trash-bin.svg"
          alt="trash-bin"
        />
      </li>
      <li class="task-list__task task-list__task_center">
        <input class="task-list__checkbox" type="checkbox" />
        <span>Задача 2</span>
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
export default {
  name: "AppCurrentNote",
};
</script>
