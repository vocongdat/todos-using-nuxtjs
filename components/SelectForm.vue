<template>
    <ValidationProvider
        v-slot="{ classes, errors }"
        rules="oneOf:created,process,completed|required"
        name="state"
    >
        <label for="state" class="block text-xl font-medium text-gray-700">{{ labelTitle }}</label>
        <div class="mt-1">
            <select id="state" :value="value" name="state" :class="classes" @change="updateValue">
                <option value="none" selected>Please Select</option>
                <option value="created">Todo</option>
                <option value="process">In Process</option>
                <option value="completed">Completed</option>
            </select>
            <span class="text-red-500">{{ errors[0] | capitalize }}</span>
        </div>
    </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
    components: {
        ValidationProvider,
    },

    props: {
        labelTitle: {
            type: String,
            default: 'Type',
        },
        value: {
            type: String,
            default: 'none',
        },
    },
    methods: {
        updateValue(event) {
            this.$emit('input', event.target.value);
        },
    },
};
</script>

<style></style>
