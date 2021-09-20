<template>
    <div class="my-8">
        <ValidationObserver ref="form" v-slot="{ reset }">
            <form @submit.prevent="onSubmit" @reset.prevent="reset">
                <InputForm labelTitle="title" />
                <TextareaForm />
                <SelectForm />
                <CheckboxForm />
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

export default {
    components: {
        ValidationObserver,
    },

    data: () => ({
        firstName: '',
        lastName: '',
        email: '',
    }),

    methods: {
        onSubmit() {
            this.$refs.form.validate().then((success) => {
                if (!success) {
                    return;
                }

                alert('Form has been submitted!');

                // Resetting Values
                this.firstName = this.lastName = this.email = '';

                // Wait until the models are updated in the UI
                this.$nextTick(() => {
                    this.$refs.form.reset();
                });
            });
        },
    },
};
</script>

<style></style>
SelectForm
