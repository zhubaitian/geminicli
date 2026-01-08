<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'
import Card from './Card.vue'
import { useBoardStore } from '../store/board'

const boardStore = useBoardStore()
const newCardTitle = ref('')

const props = defineProps({
  list: {
    type: Object,
    required: true
  }
})

function addCard() {
  if (newCardTitle.value.trim()) {
    boardStore.addCard(props.list.id, newCardTitle.value.trim())
    newCardTitle.value = ''
  }
}
</script>

<template>
  <div class="p-4 rounded-lg w-64 flex-shrink-0 list-container">
    <h2 v-if="props.list && props.list.title" class="text-lg font-bold mb-4">{{ props.list.title }}</h2>
    <draggable
      v-model="props.list.cards"
      group="cards"
      item-key="id"
      class="space-y-4 min-h-[5rem] draggable-cards"
    >
      <template #item="{ element: card }">
        <Card :card="card" />
      </template>
    </draggable>

    <div class="mt-4 add-card-container">
      <input
        type="text"
        placeholder="Add new card"
        class="w-full p-2 rounded-md mb-2"
        v-model="newCardTitle"
        @keyup.enter="addCard"
      />
      <button @click="addCard" class="w-full bg-green-500 text-white p-2 rounded-md">
        Add Card
      </button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.list-container {
  background-color: #ebecf0; // Light gray for list background
  border-radius: 0.3rem;
  padding: 0.5rem;
  width: 272px; // Standard Trello list width
  flex-shrink: 0; // Prevent shrinking
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25); // Subtle shadow
  height: fit-content; // Adjust height to content

  h2 {
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem 0.25rem;
    color: #172b4d; // Dark text color
    border-bottom: none; // Remove previous border
    margin-bottom: 0.5rem;
  }

  .draggable-cards { // Adding a class to the draggable for cards
    min-height: 1rem; // Ensure some height even if empty
    padding-bottom: 0.5rem;
  }

  .add-card-container {
    margin-top: 0.5rem;
    input[type="text"] {
      background-color: #fff;
      border: 1px solid #dfe1e6; // Light border
      padding: 0.5rem 0.75rem;
      border-radius: 0.3rem;
      margin-bottom: 0.5rem;
      width: 100%;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);

      &:focus {
        outline: none;
        border-color: #4c9aff; // Focus glow
        box-shadow: 0 0 0 2px #4c9aff;
      }
    }

    button {
      background-color: #5aac44; // Green for add button
      color: white;
      border: none;
      padding: 0.6rem 1rem;
      border-radius: 0.3rem;
      cursor: pointer;
      width: 100%;
      font-weight: bold;

      &:hover {
        background-color: darken(#5aac44, 5%);
      }
    }
  }
}
</style>

