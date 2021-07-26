<template>
  <div class="operation-form">
    <label>Date</label>
    <input v-model="item.date" type="text" />

    <label>Income</label>
    <input v-model="item.income" type="text" />

    <label>Expense</label>
    <input v-model="item.expense" type="text" />

    <label>Tag</label>
    <multiselect v-model="item.tag" :options="tags" :custom-label="tagLabel">
    </multiselect>

    <label>Seller</label>
    <multiselect
      v-model="item.shop"
      :options="shops"
      :clear-on-select="false"
      :internal-search="false"
      :preserve-search="true"
      @search-change="searchShopName"
    >
    </multiselect>

    <label>Desc</label>
    <textarea v-model="item.description"></textarea>

    <div class="right-column">
      <input type="submit" value="Submit" @click="submit" />
      <div class="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components: { Multiselect },
  props: {
    payload: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      item: {
        tag: null,
        shop: null,
      },
      shops: [],
      error: null,
    }
  },
  computed: {
    tags() {
      return Object.values(this.$store.state.globals.tags).sort((a, b) =>
        a.title > b.title ? 1 : -1
      )
    },
  },
  beforeMount() {
    for (const key of Object.keys(this.payload)) {
      this.item[key] = this.payload[key]
    }

    if (!this.item.date) {
      const d = new Date()
      const year = d.getFullYear()
      const month = (d.getMonth() + 1).toString().padStart(2, '0')
      const day = d.getDate().toString().padStart(2, '0')
      this.item.date = `${year}-${month}-${day}`
    }
  },
  methods: {
    async searchShopName(query) {
      const resp = await this.$axios.post('/api/autocomplete/shop', { query })
      this.shops = resp.data
      this.shops.unshift(query || this.item.shop || '')
    },
    tagLabel({ title }) {
      return title
    },
    async submit() {
      try {
        this.error = null
        await this.$axios.post('/api/records', this.item)
      } catch (e) {
        this.error = e.response.data
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.operation-form {
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: auto 30vw;
  grid-gap: 1em;
  width: 40%;

  .right-column {
    grid-column: 2;

    .error {
      color: #c00;
    }
  }

  label {
    font-size: 1em;
    line-height: 1.5em;
    padding: 8px 8px 8px 0;
  }

  input[type='text'],
  input[type='submit'],
  textarea {
    color: #35495e;
    font-size: 1em;
    line-height: 1.5em;

    border: 1px solid #e8e8e8;
    border-radius: 5px;
    padding: 8px;
  }
  textarea {
    resize: vertical;
  }

  input[type='submit'] {
    border: none;
    width: 100%;
    color: white;
    background: #308fc8;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
    &:active {
      margin-top: 0.1em;
      margin-bottom: -0.1em;
      opacity: 1;
    }
  }
}
</style>
