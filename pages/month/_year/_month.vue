<template>
  <div class="month-page">
    <div class="main-column">
      <MonthHeader></MonthHeader>

      <div class="create-form">
        <div
          v-show="!createForm"
          class="open-form-button click-transform"
          @click="openCreateForm"
        >
          Create new operation
        </div>
        <OperationForm
          v-show="createForm"
          ref="newOperationForm"
          @saved="operationCreated"
          @cancel="createForm = false"
        />
      </div>

      <OperationsTable />
    </div>

    <div>
      <MonthlyTotalCurrencies />
      <MonthlyTotalTags />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, store }) {
    await store.dispatch('operations/load', {
      url: `/api/month/${params.year}/${params.month}`,
      year: params.year,
      month: params.month,
    })
  },
  data() {
    return {
      totalsBefore: [],
      createForm: false,
    }
  },
  methods: {
    operationCreated(operation) {
      this.$store.commit('operations/ADD_OPERATION', operation)

      const f = this.$refs.newOperationForm
      f.item.income = undefined
      f.item.expense = undefined
      f.item.tag = null
      // f.item.shop = null
      f.item.description = null
    },
    openCreateForm() {
      this.createForm = true
    },
  },
}
</script>

<style lang="scss" scoped>
.month-page {
  display: grid;
  grid-template-columns: 1fr auto 20em 1fr;
  grid-column-gap: 2em;

  .main-column {
    grid-column: 2;
    width: 40em;
  }

  .create-form {
    margin: 1em 0;

    .open-form-button {
      width: 100%;
      color: #777d;
      background: #7772;
      text-align: center;
      font-weight: bold;
      opacity: 0.5;
      cursor: pointer;
      border-radius: 0.3em;
      padding: 0.5em 0;
      text-transform: uppercase;
      text-shadow: 1px 1px 0 white;

      &:hover {
        opacity: 1;
      }
    }

    .operation-form {
      margin: 0 3em;
    }
  }
}
</style>
