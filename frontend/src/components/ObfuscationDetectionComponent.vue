<script setup>
</script>

<template>
    <form>
        <div class="form-group mb-3">
            <label for="htmlInput">Kod HTML</label>
            <textarea v-model="htmlInput" type="text" class="form-control" id="htmlInput" rows="10" placeholder="Skopiuj swój kod HTML"></textarea>
        </div>
    </form>
    <div class="d-flex flex-column justify-content-center align-items-center gap-3">
        <button @click="detectObfuscation" class="btn btn-primary" :disabled="htmlInput ===''">Sprawdź</button>
        <button @click="reset" class="btn btn-secondary" :disabled="htmlInput ===''">Resetuj</button>
    </div>
    <h3 class="mt-5">Rezultat: {{this.result}}</h3>
</template>

<script type="text/babel">
export default {
    data(){
        return {
            htmlInput: '',
            result: '',
        };
    },
    methods: {
        detectObfuscation(){
            this.result = 'Wykryto obfuskację!';
        },
        reset(){
            this.htmlInput = '';
            this.result = '';
        }
    },
};
</script>