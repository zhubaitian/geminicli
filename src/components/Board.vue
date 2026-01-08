<template>
  <div class="board-wrapper p-4 bg-blue-100 min-h-screen">
    <draggable
      v-model="boardStore.board.lists"
      group="lists"
      item-key="id"
      class="draggable-lists"
    >
      <template #item="{ element: list }">
        <List :list="list" />
      </template>

      <template #footer>
        <div class="w-64 bg-gray-200 p-4 rounded-lg flex-shrink-0 add-list-container">
          <input
            type="text"
            placeholder="Add new list"
            class="w-full p-2 rounded-md mb-2"
            v-model="newListName"
            @keyup.enter="addList"
          />
          <button @click="addList" class="w-full bg-blue-500 text-white p-2 rounded-md">
            Add List
          </button>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useBoardStore } from '../store/board'
import draggable from 'vuedraggable'
import List from './List.vue'

const boardStore = useBoardStore()
const newListName = ref('')

function addList() {
  if (newListName.value.trim()) {
    boardStore.addList(newListName.value.trim())
    newListName.value = ''
  }
}
</script>

<style lang="less" scoped>
.board-wrapper {
  background-color: #0079bf; // Trello-like blue background
  padding: 1rem; // Adjust padding slightly
  min-height: 100vh; // Ensure it takes full viewport height
  display: flex;
  flex-grow: 1;
  overflow-x: auto; // Allow horizontal scrolling for lists

  .draggable-lists { // Adding a class to the draggable itself for styling
    display: flex;
    gap: 1rem; // Space between lists
    align-items: flex-start; // Align lists to the top
  }
  
  .add-list-container {
    background-color: rgba(255, 255, 255, 0.2); // Lighter, translucent background
    border-radius: 0.3rem;
    padding: 0.5rem;
    width: 272px; // Standard Trello list width
    flex-shrink: 0; // Prevent shrinking

    input[type="text"] {
      background-color: rgba(255, 255, 255, 0.9); // Almost white for input
      border: none;
      padding: 0.5rem 0.75rem;
      border-radius: 0.3rem;
      margin-bottom: 0.5rem;
      width: 100%;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);

      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px #4c9aff; // Focus glow
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
