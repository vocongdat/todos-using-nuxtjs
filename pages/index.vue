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
      <div class="todo__item rounded-lg px-3">
        <div class="flex justify-between items-center my-2">
          <h3 class="my-1 font-medium">To do</h3>
          <span class="bg-green-300 px-1.5 rounded-lg">2</span>
        </div>

        <div class="todo__item--add">
          <i class="fas fa-plus"></i>
        </div>

        <div
          class="todo__item--main flex flex-col bg-white rounded-lg my-3 p-3"
        >
          <div
            class="
              todo__item-header
              flex flex-row
              justify-between
              items-center
              py-2
            "
          >
            <h4 class="font-semibold">Desigin</h4>
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
            <span
              class="
                todo__item-person
                inline-block
                w-9
                h-9
                text-center
                rounded-full
              "
              >TN</span
            >
            <span
              class="
                todo__item-person
                bg-indigo-600
                inline-block
                w-9
                h-9
                text-center
                rounded-full
              "
              >VE</span
            >
          </div>
        </div>
        <div
          class="todo__item--main flex flex-col bg-white rounded-lg my-3 p-3"
        >
          <div
            class="
              todo__item-header
              flex flex-row
              justify-between
              items-center
              py-2
            "
          >
            <h4 class="font-semibold">Development</h4>
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
            <span
              class="
                todo__item-person
                inline-block
                w-9
                h-9
                text-center
                rounded-full
              "
              >JE</span
            >
          </div>
        </div>
      </div>

      <div class="todo__item rounded-lg px-3">
        <div class="flex justify-between items-center my-2">
          <h3 class="my-1 font-medium">In process</h3>
          <span class="bg-green-300 px-1.5 rounded-lg">2</span>
        </div>

        <div class="todo__item--add">
          <i class="fas fa-plus"></i>
        </div>

        <div
          class="todo__item--main flex flex-col bg-white rounded-lg my-3 p-3"
        >
          <div
            class="
              todo__item-header
              flex flex-row
              justify-between
              items-center
              py-2
            "
          >
            <h4 class="font-semibold">Development</h4>
            <i class="fas fa-paperclip text-gray-400"></i>
          </div>

          <div class="todo__item-content my-3">
            <p class="my-2">
              Dynamic links to work with our iOS and Android apps.
            </p>
          </div>

          <div class="todo__item-relationship">
            <span
              class="
                todo__item-person
                inline-block
                w-9
                h-9
                text-center
                rounded-full
              "
              >SW</span
            >
            <span
              class="
                todo__item-person
                bg-indigo-600
                inline-block
                w-9
                h-9
                text-center
                rounded-full
              "
              >GJ</span
            >
          </div>
        </div>
        <div
          class="todo__item--main flex flex-col bg-white rounded-lg my-3 p-3"
        >
          <div
            class="
              todo__item-header
              flex flex-row
              justify-between
              items-center
              py-2
            "
          >
            <h4 class="font-semibold">Logo redisign</h4>
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
            <span
              class="
                todo__item-person
                inline-block
                w-9
                h-9
                text-center
                rounded-full
              "
              >AV</span
            >
            <span
              class="
                todo__item-person
                bg-indigo-600
                inline-block
                w-9
                h-9
                text-center
                rounded-full
              "
              >TN</span
            >
          </div>
        </div>
      </div>

      <div class="todo__item rounded-lg px-3">
        <div class="flex justify-between items-center my-2">
          <h3 class="my-1 font-medium">Completed</h3>
          <span class="bg-green-300 px-1.5 rounded-lg">0</span>
        </div>

        <div class="todo__item--add">
          <i class="fas fa-plus"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.todo__item {
  background-color: #e0e8e7;
}
.todo__item--add {
  background-color: #bccac1;
  text-align: center;
  border-radius: 8px;
  padding: 4px 0;
  i {
    color: #6aa7b3;
  }
}
.todo__item-relationship {
  .todo__item-person {
    line-height: 36px;
    background-color: #f04c0f;
  }
  &:nth-child(2) {
    background-color: darkgoldenrod;
  }
}
</style>
