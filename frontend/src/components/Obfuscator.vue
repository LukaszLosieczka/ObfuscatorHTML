<script setup>

</script>

<template>
    <div class="container">
            <h1 class="text-center mt-5">Obfuskator i detektor obfuskacji kodu źródłowego programów w HTML</h1>
            <form class="mt-5">
                <div class="form-group mb-3">
                    <label for="htmlInput">Kod HTML</label>
                    <textarea v-model="htmlInput" type="text" class="form-control" id="htmlInput" rows="10" placeholder="Skopiuj swój kod HTML"></textarea>
                </div>
            </form>
            <div class="text-center">
                <button @click="obfuscate" class="btn btn-primary">Zaciemnij HTML</button>
            </div>
            <label for="htmlOutput">Rezultat</label>
            <textarea v-model="htmlOutput" type="text" class="form-control" id="htmlOutput" rows="10" disabled></textarea>
        </div>
</template>

<script>
export default {
    data(){
        return {
            htmlInput: '',
            htmlOutput: '',
        };
    },
    methods: {
        obfuscate(){
            this.htmlOutput = "Rezultat"
        }
    },
};
</script>

<style>
textarea{
    resize:none
}

</style>