<template>
    <div class="my-8">
        <ValidationObserver ref="form" v-slot="{ handleSubmit, reset }">
            <form @submit.prevent="handleSubmit(onSubmit)" @reset.prevent="reset">
                <InputForm v-model="todo.title" labelTitle="title" />
                <TextareaForm v-model="todo.content" />
                <SelectForm v-model="todo.status" />
                <CheckboxForm v-model="todo.team" :listOption="listMember" />
                <div class="flex flex-row my-3 gap-3">
                    <button class="btn bg-green-400" type="submit">Add Todo</button>
                    <button class="btn bg-red-400" type="reset">Reset</button>
                </div>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import profiles from '~/apollo/queries/profiles';
import createTodo from '~/apollo/mutation/createTodo';

export default {
    components: {
        ValidationObserver,
    },

    data() {
        return {
            todo: {
                title: '',
                content: '',
                team: [],
                status: 'none',
                projectId: '6143f615d28fa9d72566cb25',
            },
            listMember: [],
        };
    },

    methods: {
        onSubmit() {
            this.$refs.form.validate().then((success) => {
                if (!success) {
                    return;
                }

                alert('Form has been submitted!');

                this.$apollo
                    .mutate({
                        mutation: createTodo,
                        variables: {
                            ...this.todo,
                            content: this.todo.content.split(/\r?\n/),
                        },
                    })
                    .then((data) => {
                        // Result
                        console.log(data);
                    })
                    .catch((error) => {
                        // Error
                        console.error(error);
                    });

                // Resetting Values
                this.todo = {
                    title: '',
                    content: '',
                    process: 'none',
                    team: [],
                };

                // Wait until the models are updated in the UI
                this.$nextTick(() => {
                    this.$refs.form.reset();
                });
            });
        },
    },
    apollo: {
        profiles: {
            prefetch: true,
            query: profiles,

            result({ data: { profiles }, loading, networkStatus }) {
                this.listMember = profiles;
            },
        },
    },
};
</script>

<style></style>
SelectForm
