<template>
    <div>
        <h1 class="text-2xl font-medium">Calender</h1>
        <vc-date-picker
            :value="null"
            :attributes="attrs"
            color="green"
            is-indigo
            is-range
            is-expanded
            :rows="2"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            attrs: [
                {
                    key: 'today',
                    highlight: true,
                    dates: new Date(),
                },
            ],
        };
    },
};
</script>

<style></style>
