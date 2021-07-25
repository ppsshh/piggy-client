<template>
  <div class="operation-form">
    <div>Date</div>
    <input type="text" name="date" />
    <div>Income</div>
    <input type="text" name="income_amount" />
    <div>Expense</div>
    <input type="text" name="expense_amount" />
    <div>Tag</div>
    <multiselect
      v-model="selectedTag"
      :options="tags"
      :custom-label="tagLabel"
      select-label=""
      deselect-label=""
    >
    </multiselect>
    <div>Seller</div>
    <multiselect
      v-model="selectedShop"
      :options="shops"
      select-label=""
      deselect-label=""
      :internal-search="false"
      @search-change="searchShopName"
    >
    </multiselect>
    <div>Desc</div>
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
      selectedShop: null,
      shops: [],
    }
  },
  computed: {
    tags() {
      return Object.values(this.$store.state.globals.tags)
    },
  },
  methods: {
    async searchShopName(query) {
      const resp = await this.$axios.post('/api/autocomplete/shop', { query })
      this.shops = resp.data
    },
    tagLabel({ title }) {
      return title
    },
  },
}
</script>

<style lang="scss" scoped>
.operation-form {
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: auto 1fr;
  grid-gap: 1em;
}
</style>
