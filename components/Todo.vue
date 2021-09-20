<template>
    <div class="todo-container todo__item">
        <div class="flex justify-between items-center my-2">
            <h3 class="todo-container-title my-1 font-medium">{{ title }}</h3>
            <span class="bg-green-300 px-1.5 rounded-lg">2</span>
        </div>

        <button class="btn todo__item--add">
            <i class="fas fa-plus"></i>
        </button>
        <div v-for="todo in listTodo" :key="todo.id" class="todo todo__item--main" draggable="true">
            <div class="todo-header todo__item-header">
                <h4 class="font-semibold">
                    <span class="notify-status bg-green-500"></span>
                    {{ todo.title }}
                </h4>
                <i class="fas fa-paperclip text-gray-400"></i>
            </div>

            <div class="todo__item-content my-3">
                <p v-for="text in todo.content" :key="text" class="my-2">
                    {{ text }}
                </p>
            </div>

            <div class="todo__item-relationship">
                <span
                    v-for="member in todo.team"
                    :key="member"
                    class="person-icon todo__item-person"
                    >{{ member.name | truncateName }}</span
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    filters: {
        truncateString: (string, length) => {
            return string.length < length ? string : `${string.slice(0, length - 0)}`;
        },
        truncateName: (string) => {
            const splitString = string.split(' ');
            return splitString.map((string) => string[0]).join('');
        },
    },

    props: {
        title: {
            type: String,
            default: 'To do',
            required: true,
        },
        listTodo: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            state: '',
        };
    },

    mounted() {
        const containers = document.querySelectorAll('.todo-container');
        const draggables = document.querySelectorAll('.todo__item--main');

        const getParent = (element, selector) => {
            while (element.parentElement) {
                if (element.parentElement.matches(selector)) {
                    return element.parentElement;
                }
                element = element.parentElement;
            }
        };

        draggables.forEach((draggable) => {
            draggable.addEventListener('dragstart', () => {
                draggable.classList.add('dragging');
            });

            draggable.addEventListener('dragend', (e) => {
                draggable.classList.remove('dragging');
                const containerDragging = getParent(e.target, '.todo-container');
                const titleDragging =
                    containerDragging.querySelector('.todo-container-title').outerText;
                this.state = titleDragging;
            });
        });
        const getDragAfterElement = (container, y) => {
            const draggableElements = [
                ...container.querySelectorAll('.todo__item--main:not(.dragging)'),
            ];

            return draggableElements.reduce(
                (closest, child) => {
                    const box = child.getBoundingClientRect();
                    const offset = y - box.top - box.height / 2;
                    if (offset < 0 && offset > closest.offset) {
                        return { offset, element: child };
                    } else {
                        return closest;
                    }
                },
                { offset: Number.NEGATIVE_INFINITY }
            ).element;
        };

        containers.forEach((container) => {
            container.addEventListener('dragover', (e) => {
                e.preventDefault();
                const afterElement = getDragAfterElement(container, e.clientY);
                const draggable = document.querySelector('.dragging');
                if (afterElement == null) {
                    container.appendChild(draggable);
                } else {
                    container.insertBefore(draggable, afterElement);
                }
            });
        });
    },
};
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
