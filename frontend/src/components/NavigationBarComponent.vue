<script setup>

</script>

<template>
    <div class="btn-toolbar">
        <div class="btn-group">
            <button class="btn btn-outline-dark btn-lg custom-btn" @click="navigate('obfuscation')" :disabled="this.$route.path === '/obfuscation'">Obfuskacja</button>
            <button class="btn btn-outline-dark btn-lg custom-btn" @click="navigate('obfuscation-detection')" :disabled="this.$route.path=== '/obfuscation-detection'">Detekcja</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        navigate(route) {
            this.$router.push({path: `/${route}`});
        }
    },
};
</script>

<style>
.custom-btn:disabled {
    background-color: darkgray;
    font-weight: bold;
}
</style>