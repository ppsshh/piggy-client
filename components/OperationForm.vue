<template>
  <div class="operation-form">
    <div class="date">
      <input v-model="item.date" type="text" />
    </div>

    <div class="income-amount">
      <input
        v-model="item.income"
        type="text"
        :placeholder="'Income ' + $session.defaultCurrency.title"
        @keyup.enter="inputEval"
        @keyup.esc="inputRestoreValue"
      />
    </div>

    <div class="expense-amount">
      <input
        v-model="item.expense"
        type="text"
        :placeholder="'Expense ' + $session.defaultCurrency.title"
        @keyup.enter="inputEval"
        @keyup.esc="inputRestoreValue"
      />
    </div>

    <multiselect
      v-model="item.tag"
      class="wide"
      :options="tags"
      :custom-label="tagLabel"
      placeholder="Tag"
      @select="selectTag"
    >
    </multiselect>

    <multiselect
      v-model="item.shop"
      class="wide"
      :options="shops"
      :clear-on-select="false"
      :internal-search="false"
      placeholder="Seller"
      :preserve-search="true"
      @search-change="searchShopName"
    >
    </multiselect>

    <textarea
      v-model="item.description"
      class="wide"
      placeholder="Description"
    ></textarea>

    <div v-if="error" class="wide error">{{ error }}</div>

    <input v-if="item.id" type="button" value="Delete" @click="deleteItem" />
    <input
      class="middle-column"
      type="button"
      value="Cancel"
      @click="$emit('cancel')"
    />
    <input class="right-column" type="submit" value="Submit" @click="submit" />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components: { Multiselect },
  props: {
    payload: {
      type: Object,
      default: null,
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
    submitPayload() {
      return [
        'id',
        'date',
        'income',
        'expense',
        'tag_id',
        'shop',
        'description',
      ].reduce((acc, key) => {
        acc[key] = this.item[key]
        return acc
      }, {})
    },
  },
  beforeMount() {
    if (this.payload) {
      const p = this.payload
      this.item = p

      this.item.income = this.combineAmount(
        p.income_amount,
        p.income_currency_id
      )
      this.item.expense = this.combineAmount(
        p.expense_amount,
        p.expense_currency_id
      )
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
    selectTag(tag, id) {
      this.item.tag_id = tag.id
    },
    tagLabel({ title }) {
      return title
    },
    async submit() {
      try {
        this.error = null
        const resp = await this.$axios.post('/api/records', this.submitPayload)
        resp.data.tag = this.$store.state.globals.tags[resp.data.tag_id]
        this.$emit('saved', resp.data)
      } catch (e) {
        this.error = e.response.data
      }
    },
    async deleteItem() {
      const answer = confirm(
        [
          'Deleting',
          `+${this.item.income} / -${this.item.expense}`,
          this.item.shop,
          'Are you sure?',
        ].join('\n')
      )
      if (!answer) return false

      try {
        this.error = null
        await this.$axios.delete(`/api/record/${this.item.id}`)
        this.$emit('delete', this.item.id)
      } catch (e) {
        this.error = e.response.data
      }
    },
    combineAmount(amount, currId) {
      if (!amount) return ''

      const curr = this.$store.state.globals.currencies[currId]

      return `${amount / Math.pow(10, curr.round)} ${curr.title}`
    },
    inputEval(e) {
      try {
        // eslint-disable-next-line no-eval
        const result = eval(e.target.value)
        if (result !== undefined) {
          e.target.backup = e.target.backup || []
          e.target.backup.push(e.target.value)
          e.target.value = result
        }
      } catch {}
    },
    inputRestoreValue(e) {
      if (e.target.backup && e.target.backup.length > 0)
        e.target.value = e.target.backup.pop()
    },
  },
}
</script>

<style lang="scss" scoped>
.operation-form {
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 1em;
  grid-row-gap: 0.6em;

  .wide {
    grid-column: 1 / span 3;
  }

  .middle-column {
    grid-column: 2;
  }
  .right-column {
    grid-column: 3;
  }

  .error {
    color: #ff5978;
    text-align: justify;
  }

  label {
    font-size: 1em;
    line-height: 2.3em;
    text-align: right;
  }

  .date input,
  .income-amount input,
  .expense-amount input {
    width: 100%;
    box-sizing: border-box;
  }

  .income-amount,
  .expense-amount {
    position: relative;

    &::before {
      display: block;
      position: absolute;
      top: 0.4em;
      left: 0.6em;
    }
    input {
      padding-left: 2.2em;
    }
    input:focus {
      outline: none;
    }
  }
  .income-amount {
    &::before {
      content: '🡳';
      color: green;
    }

    input:focus {
      border: 1px solid #0a0;
      box-shadow: 0 0 1px 1px #0a0;
    }
  }
  .expense-amount {
    &::before {
      content: '🡱';
      color: red;
      top: 0.3em;
    }

    input:focus {
      border: 1px solid red;
      box-shadow: 0 0 1px 1px red;
    }
  }

  textarea {
    resize: vertical;
    font-family: inherit;
    height: 6em;
  }

  input[type='button'],
  input[type='submit'] {
    width: 100%;
    color: white;
  }
  input[type='button'] {
    background: #7773;
    color: #444;
  }
  input[type='submit'] {
    background: #ff5978;
  }
}
</style>

<style lang="scss">
.operation-form {
  .multiselect {
    font-size: 0.85em;

    .multiselect__tags,
    .multiselect__single,
    .multiselect__placeholder,
    .multiselect__input {
      color: #35495e;
      font-size: 1em;
      margin: 0;
      padding: 0;
      min-height: unset;
      line-height: normal;
    }
    .multiselect__placeholder {
      opacity: 0.6;
    }
    .multiselect__tags {
      padding: 0.5em 2.5em 0.5em 0.5em;
    }
    .multiselect__select {
      width: 2.5em;
      height: 2.5em;
    }
    .multiselect__input {
      border: none;
    }
  }
}
</style>
