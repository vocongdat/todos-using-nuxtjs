<template>
    <ValidationProvider v-slot="{ classes, errors }" rules="max:120|required">
        <label for="content" class="block text-xl font-medium text-gray-700" :class="classes"
            >Content</label
        >
        <div class="mt-1">
            <textarea
                id="content"
                v-model="value"
                name="content"
                cols="30"
                rows="10"
                placeholder="Enter todo..."
                :class="classes"
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

    data() {
        return {
            value: '',
        };
    },
};
</script>

<style></style>
