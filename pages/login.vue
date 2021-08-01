<template>
  <div class="middle-content login-form">
    <form>
      <input v-model="username" type="text" placeholder="Username" />
      <br />
      <input v-model="password" type="password" placeholder="Password" />
      <br />
      <input type="submit" value="Login" @click.prevent="submit" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    submit() {
      this.$session.login({
        username: this.username,
        password: this.password,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.middle-content {
  text-align: center;
  padding-top: 3em;

  input {
    margin: 1em;
  }
  input[type='submit'] {
    background: #ff5978;
    color: white;
  }
}
</style>
