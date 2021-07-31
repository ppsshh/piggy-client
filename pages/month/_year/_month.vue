<template>
  <div class="month-page">
    <div class="main-column">
      <MonthHeader></MonthHeader>

      <div class="create-form">
        <div
          v-if="!createForm"
          class="open-form-button"
          @click="openCreateForm"
        >
          Create new record
        </div>
        <OperationForm
          v-else
          ref="newOperationForm"
          @saved="recordCreated"
          @cancel="createForm = false"
        />
      </div>

      <div class="table" @mouseleave="hoveredTag = null">
        <template v-for="day in days">
          <template v-for="(op, index) in orderedOperations[day]">
            <OperationRow
              v-if="formId !== op.id"
              :key="'row' + op.id"
              :op="op"
              :day="index === 0 ? monthShort + ' ' + day.split('-')[2] : ''"
              :highlighted="hoveredTag === op.tag_id"
              :on-hover="hoverTag"
              @open="openForm"
            />
            <div
              v-if="formId === op.id"
              :key="'form' + op.id"
              class="row form-row"
            >
              <div class="record-id">#{{ op.id }}</div>
              <div />
              <div>
                <OperationForm
                  :payload="Object.assign({}, op)"
                  @saved="formSaved"
                  @cancel="formId = null"
                  @delete="recordDeleted"
                ></OperationForm>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>

    <CurrencyMonthlyTotals
      :operations="operations"
      :totals-before="totalsBefore"
    />
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios, store }) {
    const resp = await $axios.get(`/api/month/${params.year}/${params.month}`)
    for (const record of resp.data.operations) {
      record.tag = store.state.globals.tags[record.tag_id]
    }
    return resp.data
  },
  data() {
    return {
      operations: [],
      totalsBefore: [],
      hoveredTag: null,
      formId: null,
      createForm: false,
    }
  },
  computed: {
    days() {
      return Object.keys(this.orderedOperations).sort().reverse()
    },
    monthShort() {
      const date = new Date(
        this.$route.params.year,
        Number.parseInt(this.$route.params.month) - 1
      )
      return date.toLocaleDateString('en-US', { month: 'short' })
    },
    orderedOperations() {
      return this.operations.reduce((acc, op) => {
        if (!acc[op.date]) acc[op.date] = []
        acc[op.date].push(op)
        return acc
      }, {})
    },
  },
  methods: {
    hoverTag(tagId) {
      this.hoveredTag = tagId
    },
    openForm(id) {
      this.formId = id
    },
    formSaved(resp) {
      const idx = this.operations.findIndex((i) => i.id === resp.id)
      resp.tag = this.$store.state.globals.tags[resp.tag_id]

      if (this.openedMonthMatches(resp)) {
        idx !== -1
          ? this.$set(this.operations, idx, resp)
          : this.operations.push(resp)
      } else if (idx !== -1) {
        this.$delete(this.operations, idx)
      }

      this.formId = null
    },
    recordCreated(record) {
      if (this.openedMonthMatches(record)) this.operations.push(record)

      const f = this.$refs.newOperationForm
      f.item.income = undefined
      f.item.expense = undefined
      f.item.tag = null
      // f.item.shop = null
      f.item.description = null
    },
    recordDeleted(recordId) {
      const idx = this.operations.findIndex((i) => i.id === recordId)
      if (idx !== -1) this.$delete(this.operations, idx)

      this.formId = null
    },
    openCreateForm() {
      this.createForm = true
    },
    openedMonthMatches(record) {
      const date = new Date(record.date)
      return (
        (date.getMonth() + 1).toString() === this.$route.params.month &&
        date.getFullYear().toString() === this.$route.params.year
      )
    },
  },
}
</script>

<style lang="scss">
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

.table {
  display: table;
  width: 100%;

  .row,
  .form-row {
    display: table-row;

    & > div {
      display: table-cell;
    }

    .operation-form {
      margin: 1em 0;
    }

    .record-id {
      font-size: 0.75em;
      opacity: 0.5;
      text-align: center;
    }
  }
}
</style>
