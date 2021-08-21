<template>
  <div class="table">
    <template v-for="day in days">
      <template v-for="(op, index) in orderedOperations[day]">
        <OperationRow
          v-if="formId !== op.id"
          :key="'row' + op.id"
          :op="op"
          :show-date="index === 0"
          @open="openForm"
        />
        <div v-if="formId === op.id" :key="'form' + op.id" class="row form-row">
          <div class="record-id">#{{ op.id }}</div>
          <div />
          <div>
            <OperationForm
              :payload="Object.assign({}, op)"
              @saved="formSaved"
              @cancel="formId = null"
              @delete="operationDeleted"
            ></OperationForm>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formId: null,
    }
  },
  computed: {
    days() {
      return Object.keys(this.orderedOperations).sort().reverse()
    },
    orderedOperations() {
      return this.$store.state.operations.list.reduce((acc, op) => {
        if (!acc[op.date]) acc[op.date] = []
        acc[op.date].push(op)
        return acc
      }, {})
    },
  },
  methods: {
    openForm(id) {
      this.formId = id
    },
    formSaved(resp) {
      this.$store.commit('operations/ADD_OPERATION', resp)
      this.formId = null
    },
    operationDeleted(operationId) {
      this.$store.commit('operations/DELETE_OPERATION', operationId)

      this.formId = null
    },
  },
}
</script>

<style lang="scss" scoped>
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
