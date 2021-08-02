<template>
  <div>
    <div class="navigation-menu">
      <NuxtLink to="/">📅</NuxtLink>
      <NuxtLink to="/year">🎍</NuxtLink>
      <a>💰</a>
      <a>🌗</a>
      <a @click="$session.logout">👤</a>
    </div>
    <Nuxt />
  </div>
</template>

<style lang="scss" scoped>
.navigation-menu {
  position: absolute;
  right: 0.8em;
  margin-top: 0.25em;

  a {
    width: 2em;
    display: inline-block;
    text-align: center;
    padding: 0.3em 0.4em 0.4em 0.4em;
    border: 1px dashed #7777;
    border-radius: 0.3em;
    text-decoration: none;
    color: #555;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background: #7774;
    }
  }
}
</style>
