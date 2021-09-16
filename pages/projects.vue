<template>
  <div class="todos flex flex-col w-full mt-10">
    <div class="todos__header flex flex-row justify-between items-center mb-5">
      <h2 class="text-2xl font-medium">{{ $t('projects') }}</h2>
      <div>
        <span>{{ $t('thisWeek') }}</span>
        <i class="fas fa-chevron-down text-sm"></i>
      </div>
    </div>

    <div class="todos__main grid grid-cols-3 gap-6 mb-6">
      <div class="todo-container todo__item">
        <div class="flex justify-between items-center my-2">
          <h3 class="my-1 font-medium">To do</h3>
          <span class="bg-green-300 px-1.5 rounded-lg">2</span>
        </div>

        <button class="btn todo__item--add">
          <i class="fas fa-plus"></i>
        </button>

        <div class="todo todo__item--main" draggable="true">
          <div class="todo-header todo__item-header">
            <h4 class="font-semibold">
              <span class="notify-status bg-green-500"></span>
              Desigin
            </h4>
            <i class="fas fa-paperclip text-gray-400"></i>
          </div>

          <div class="todo__item-content my-3">
            <p>
              We need 2 different concepts for a software page in our program.
            </p>
            <p class="my-2">
              I've attached 2 concepts that will give you an idea to reproduce
              but with a new look and feel. We'd like to keep the colors similar
              but you can add different colors.
            </p>
          </div>

          <div class="todo__item-relationship">
            <span class="person-icon todo__item-person">TN</span>
            <span class="person-icon todo__item-person">VE</span>
          </div>
        </div>

        <div class="todo todo__item--main" draggable="true">
          <div class="todo-header todo__item-header">
            <h4 class="font-semibold">
              <span class="notify-status bg-notify"></span>
              Development
            </h4>
            <i class="fas fa-paperclip text-gray-400"></i>
          </div>

          <div class="todo__item-content my-3">
            <p class="my-2">
              Secured web platform that will integrate and pull data from
              several other web apps to which I subscribe and have the api
              access to.
            </p>
          </div>

          <div class="todo__item-relationship">
            <span class="person-icon todo__item-person">JE</span>
          </div>
        </div>
      </div>

      <div class="todo-container todo__item">
        <div class="flex justify-between items-center my-2">
          <h3 class="my-1 font-medium">In process</h3>
          <span class="bg-green-300 px-1.5 rounded-lg">2</span>
        </div>

        <button class="btn todo__item--add">
          <i class="fas fa-plus"></i>
        </button>

        <div class="todo todo__item--main" draggable="true">
          <div class="todo-header todo__item-header">
            <h4 class="font-semibold">
              <span class="notify-status bg-notify"></span>
              Development
            </h4>
            <i class="fas fa-paperclip text-gray-400"></i>
          </div>

          <div class="todo__item-content my-3">
            <p class="my-2">
              Dynamic links to work with our iOS and Android apps.
            </p>
          </div>

          <div class="todo__item-relationship">
            <span class="person-icon todo__item-person">SW</span>
            <span class="person-icon todo__item-person">GJ</span>
          </div>
        </div>

        <div class="todo todo__item--main" draggable="true">
          <div class="todo-header todo__item-header">
            <h4 class="font-semibold">
              <span class="notify-status bg-blue-600"></span>
              Logo redisign
            </h4>

            <i class="fas fa-paperclip text-gray-400"></i>
          </div>

          <div class="todo__item-content my-3">
            <p class="my-2">
              An existing redesign. The logo includes shading from light red to
              red, and I want to keep the exact shape, but make it one solid
              color.
            </p>
          </div>

          <div class="todo__item-relationship">
            <span class="person-icon todo__item-person">AV</span>
            <span class="person-icon todo__item-person">TN</span>
            <span class="person-icon todo__item-person">CD</span>
          </div>
        </div>
      </div>

      <div class="todo-container todo__item">
        <div class="flex justify-between items-center my-2">
          <h3 class="my-1 font-medium">Completed</h3>
          <span class="bg-green-300 px-1.5 rounded-lg">0</span>
        </div>

        <button class="btn todo__item--add">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const containers = document.querySelectorAll('.todo-container')
    const draggables = document.querySelectorAll('.todo__item--main')

    draggables.forEach((draggable) => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
      })

      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
      })

      draggable.addEventListener('dragenter', (e) => {
        console.log('dragenter', e.target.className)
        if (e.target.className === 'todo__item--main') {
          containers.classList.add('bg-green-500')
        }
      })
      draggable.addEventListener('dragleave', (e) => {
        console.log('dragleave', e.target.className)
        if (e.target.className === 'todo__item--main') {
          containers.classList.remove('bg-green-500')
        }
      })
    })
    const getDragAfterElement = (container, y) => {
      const draggableElements = [
        ...container.querySelectorAll('.todo__item--main:not(.dragging)'),
      ]

      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect()
          const offset = y - box.top - box.height / 2
          if (offset < 0 && offset > closest.offset) {
            return { offset, element: child }
          } else {
            return closest
          }
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element
    }

    containers.forEach((container) => {
      container.addEventListener('dragover', (e) => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging')
        if (afterElement == null) {
          container.appendChild(draggable)
        } else {
          container.insertBefore(draggable, afterElement)
        }
      })
    })
  },
}
</script>

<style lang="scss" scoped>
.todo__item {
  background-color: #e0e8e7;
}
.todo__item--add {
  // background-color: #bccac1;
  // text-align: center;
  i {
    color: #6aa7b3;
  }
}
.todo__item-relationship {
  position: relative;
  left: 0;
}
</style>
