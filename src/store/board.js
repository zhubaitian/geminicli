import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const getInitialBoard = () => {
  const savedBoard = localStorage.getItem('board')
  if (savedBoard) {
    return JSON.parse(savedBoard)
  }
  return {
    lists: [
      {
        id: 1,
        title: 'To Do',
        cards: [
          { id: 1, title: 'Task 1' },
          { id: 2, title: 'Task 2' },
        ],
      },
      {
        id: 2,
        title: 'In Progress',
        cards: [
          { id: 3, title: 'Task 3' },
        ],
      },
      {
        id: 3,
        title: 'Done',
        cards: [
          { id: 4, title: 'Task 4' },
          { id: 5, title: 'Task 5' },
          { id: 6, title: 'Task 6' },
        ],
      },
    ],
  }
}

export const useBoardStore = defineStore('board', () => {
  const board = ref(getInitialBoard())

  // Generate unique IDs for lists and cards
  let nextListId = Math.max(0, ...board.value.lists.map(list => list.id)) + 1
  let nextCardId = Math.max(0, ...board.value.lists.flatMap(list => list.cards.map(card => card.id))) + 1

  watch(
    board,
    (newBoard) => {
      localStorage.setItem('board', JSON.stringify(newBoard))
    },
    { deep: true }
  )

  function addList(title) {
    board.value.lists.push({
      id: nextListId++,
      title,
      cards: [],
    })
  }

  function addCard(listId, title) {
    const list = board.value.lists.find(list => list.id === listId)
    if (list) {
      list.cards.push({
        id: nextCardId++,
        title,
      })
    }
  }

  return { board, addList, addCard }
})
