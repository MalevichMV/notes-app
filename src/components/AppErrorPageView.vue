<template>
  <header>
    <h1>Страница не найдена!</h1>
    <img
      @click="$router.push({ name: 'StartingPage' })"
      src="../assets/img/back-arrow.svg"
      alt="back"
      class="back-arrow"
    />
  </header>
</template>

<script></script>
