<script setup>
defineProps({
  card: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="card-item">
    {{ card.title }}
  </div>
</template>

<style lang="less" scoped>
.card-item {
  background-color: #fff; // White background
  border-radius: 0.3rem;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem; // Space between cards
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25); // Subtle shadow
  cursor: grab;
  color: #172b4d; // Dark text color
  word-wrap: break-word; // Ensure long words break

  &:hover {
    background-color: #f4f5f7; // Slightly darker on hover
    box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25), 0 4px 6px rgba(9, 30, 66, 0.08); // Enhanced shadow on hover
    transform: none; // Remove previous transform from debugging
  }

  // Active state for dragging (vuedraggable provides this)
  &.ghost {
    background-color: #dfe1e6;
    border: 1px dashed #97a0af;
    color: transparent;
    box-shadow: none;
  }
}
</style>
