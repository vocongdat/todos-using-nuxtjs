<template>
    <ValidationProvider v-slot="{ classes, errors }" immediate rules="minmax:8,20|required">
        <label :for="labelTitle" class="block text-xl font-medium text-gray-700" :class="classes">{{
            labelTitle | capitalize
        }}</label>
        <div class="mt-1">
            <input
                :id="labelTitle"
                v-model="value"
                :name="labelTitle"
                type="text"
                :placeholder="placeholderText"
                class="control"
                :class="classes"
            />
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
        labelTitle: {
            type: String,
            default: 'Title',
        },
        placeholderText: {
            type: String,
            default: 'Enter text...',
        },
    },

    data() {
        return {
            value: '',
        };
    },
};
</script>

<style lang="scss" scoped></style>
