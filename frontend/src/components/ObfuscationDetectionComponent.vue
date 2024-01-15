<script setup>
import {deobfuscateHTML} from '../services/deobfuscator'
import {openNewTab, copyToClipboard, downloadHtml} from '../services/htmlService'
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
    <label for="htmlOutput">Rezultat deobfuskacji</label>
    <textarea v-model="htmlOutput" type="text" class="form-control" id="htmlOutput" rows="10" disabled></textarea>
    <div class="d-flex flex-row justify-content-center align-items-center gap-3">
        <button @click="preview" class="btn btn-primary" :disabled="htmlOutput ===''">Podejrzyj zdeobfuskowany HTML</button>
        <button @click="copy" class="btn btn-secondary" :disabled="htmlOutput ===''">Kopiuj Rezultat</button>
        <button @click="download" class="btn btn-primary" :disabled="htmlOutput ===''">Pobierz Rezultat</button>
    </div>
</template>

<script type="text/babel">
export default {
    data(){
        return {
            htmlInput: '',
            htmlOutput: '',
            result: '',
        };
    },
    methods: {
        detectObfuscation(){
            this.htmlOutput = deobfuscateHTML(this.htmlInput);
        },
        reset(){
            this.htmlInput = '';
            this.htmlOutput = '';
        },
        copy(){
            copyToClipboard(this.htmlOutput);
        },
        preview(){
            openNewTab(this.htmlOutput);
        },
        download(){
            downloadHtml(this.htmlOutput);
        }
    },
};
</script>