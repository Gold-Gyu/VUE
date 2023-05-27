import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [
      {
        title: "할일 1",
        isCompleted: false,
      },
      {
        title: "할일 2",
        isCompleted: false,
      },
    ]
  },
  getters: {
    alltodosCount(state) {
      return state.todos.length
    }
  },
  mutations: {
    CREATE_TODO(state, todoItem){
      state.todos.push(todoItem)

    },
    DELETE_TODO(state, todoItem) {
      // console.log(todoItem)
      const index = state.todos.indexOf(todoItem)
      state.todos.splice(index, 1)
    },
    UPDATE_TODO(state, todoItem) {
      state.todos = state.todos.map((todo) => {
        if (todo === todoItem) { // 내가 클릭한 todo item을 state.todos 배열에서 찾아서,
          todo.isCompleted = !todo.isCompleted // todo items의 isCompleted를 뒤집는다.
        }
        return todo
      })
      // 함수 -> state.todos배열에서 클릭한 todo item을 찾고, 해당 todo.isCompleted를 반대로 뒤집는다. true -> false
    },
    LOAD_TODOS(state) {
      const localStorageTodos = localStorage.getItem('todos')
      const parsedTodos = JSON.parse(localStorageTodos)

      state.todos= parsedTodos
    }

  },
  actions: {
    createTodo(context, todoTitle) {
      const todoItem = {
        title: todoTitle,
        isCompleted : false
      }

      context.commit("CREATE_TODO", todoItem)
      context.dispatch('saveTodosToLocalStorage')
    },
    deleteTodo(context, todoItem) {
      context.commit('DELETE_TODO', todoItem)
      context.dispatch('saveTodosToLocalStorage')
    },
    updateTodo(context, todoItem) {
      context.commit('UPDATE_TODO', todoItem)
      context.dispatch('saveTodosToLocalStorage')

    },
    saveTodosToLocalStorage(context) {
      const jsonTodos = JSON.stringify(context.state.todos)
      // 로컬 스토리지에 넣기 위해서 문자열로 바꺼준다
      localStorage.setItem('todos', jsonTodos)
    },
    loadTodos(context) {
      context.commit("LOAD_TODOS")
    },
  modules: {
  }
  }
})
