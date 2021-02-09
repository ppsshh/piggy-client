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
    <input type="text" name="tag" />
    <div>@</div>
    <input type="text" name="shop" />
    <div>Desc:</div>
    <textarea></textarea>
  </div>
</template>

<script>
export default {}
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
