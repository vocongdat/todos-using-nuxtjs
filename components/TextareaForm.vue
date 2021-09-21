<template>
    <ValidationProvider v-slot="{ classes, errors }" rules="max:120|required">
        <label for="content" class="block text-xl font-medium text-gray-700" :class="classes"
            >Content</label
        >
        <div class="mt-1">
            <textarea
                id="content"
                :value="value"
                name="content"
                cols="30"
                rows="10"
                placeholder="Enter todo..."
                :class="classes"
                @input="updateValue"
            ></textarea>
        </div>
        <span class="text-red-500">{{ errors[0] | capitalize }}</span>
    </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
    components: {
        ValidationProvider,
    },

    props: {
        value: {
            type: String,
            default: '',
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
