<template>
  <div class="month-page">
    <div class="left-column">
      <h3>Add new:</h3>
      <OperationForm />
    </div>

    <div class="right-column">
      <MonthHeader></MonthHeader>

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
              <div />
              <div />
              <div>
                <OperationForm
                  :payload="Object.assign({}, op)"
                  @saved="formSaved"
                  @cancel="formId = null"
                ></OperationForm>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>

    <div class="totals-container">
      <div v-for="(amount, cur) of total" :key="cur" class="total-block">
        <Amount
          :amount="amount"
          :currency-id="Number.parseInt(cur)"
          :color="false"
        >
          <template slot="testslot" slot-scope="a">
            <div class="currency">{{ a.currency }}</div>
            <br />
            {{ a.negativity }}{{ a.whole
            }}<span class="cents">{{ a.cents }}</span>
          </template>
        </Amount>
      </div>
    </div>
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
      total: [],
      hoveredTag: null,
      formId: null,
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
      if (idx !== -1) {
        this.$set(this.operations, idx, resp)
      } else {
        this.operations.push(resp)
      }

      this.formId = null
    },
  },
}
</script>

<style lang="scss">
.month-page {
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  grid-column-gap: 2em;

  .totals-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: start;
    align-content: flex-start;
    margin-top: 6em;

    .total-block {
      background: #aaaaaa2b;
      border-radius: 0.3em;
      display: inline-block;
      line-height: 1.6em;
      margin: 0.3em;
      padding: 0.3em;
      text-align: center;

      .currency {
        font-weight: bold;
        display: inline-block;
        opacity: 0.8;
      }
    }
  }

  .left-column .operation-form {
    width: 32em;
  }

  .right-column {
    width: 40em;
  }
}

.table {
  display: table;
  width: 100%;
  margin-top: 1em;

  .row,
  .form-row {
    display: table-row;

    & > div {
      display: table-cell;
    }

    .operation-form {
      margin: 1em 0;
    }
  }
}
</style>
