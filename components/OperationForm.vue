<template>
  <div class="operation-form">
    <div>Date:</div>
    <input type="text" name="date" />
    <div></div>
    <div></div>
    <div>Income:</div>
    <input type="text" name="income_amount" />
    <div>Expense:</div>
    <input type="text" name="expense_amount" />
    <div>Tag:</div>
    <multiselect v-model="selectedTag" :options="tags">
      <div slot="singleLabel" slot-scope="{ option }">{{ option.title }}</div>
      <div slot="option" slot-scope="{ option }">{{ option.title }}</div>
    </multiselect>
    <div>@</div>
    <input type="text" name="shop" />
    <div>Desc:</div>
    <textarea></textarea>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components: { Multiselect },
  data() {
    return {
      selectedTag: null,
    }
  },
  computed: {
    tags() {
      return Object.values(this.$store.state.globals.tags)
    },
  },
}
</script>

<style lang="scss" scoped>
.operation-form {
  display: grid;
  grid-template-columns: auto 1fr auto 1fr;
  grid-gap: 0.4em;

  textarea {
    grid-column: span 3;
  }
}
</style>
