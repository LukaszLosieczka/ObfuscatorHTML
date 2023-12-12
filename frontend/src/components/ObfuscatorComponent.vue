<script setup>
import {obfuscateHTML, Modes} from '../services/obfuscator'
import {openNewTab, copyToClipboard, downloadHtml} from '../services/htmlService'
</script>

<template>
    <form class="mt-5">
        <div class="form-group mb-3">
            <label for="htmlInput">Kod HTML</label>
            <textarea v-model="htmlInput" type="text" class="form-control" id="htmlInput" rows="10" placeholder="Skopiuj swój kod HTML"></textarea>
        </div>
    </form>
    <div class="d-flex flex-column justify-content-center align-items-center gap-3">
        <select class="form-control-sm mx-2" id="selectMode" v-model="selectedMode">
            <option v-for="mode in availableModes" :value="mode" :key="mode">{{ mode }}</option>
        </select>
        <div class="d-flex flex-wrap my-2 gap-3" v-if="selectedMode === Modes.CUSTOM">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="checkbox1" v-model="options.preventDebugger">
                <label class="form-check-label" for="checkbox1">Prevent browser debugger</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="checkbox2" v-model="options.encodeAttributeValues">
                <label class="form-check-label" for="checkbox2">Encode attributes values</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="checkbox3" v-model="options.addHiddenNodes">
                <label class="form-check-label" for="checkbox3">Add hidden nodes</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="checkbox4" v-model="options.changeJSIndenfires">
                <label class="form-check-label" for="checkbox4">Change Javascript indentifires</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="checkbox5" v-model="options.stringMapping">
                <label class="form-check-label" for="checkbox5">String array mapping</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="checkbox6" v-model="options.numberMapping">
                <label class="form-check-label" for="checkbox6">Number array mapping</label>
            </div>
        </div>
            <button @click="obfuscate" class="btn btn-primary" :disabled="htmlInput ===''">Zaciemnij HTML</button>
    </div>
    <label for="htmlOutput">Rezultat</label>
    <textarea v-model="htmlOutput" type="text" class="form-control" id="htmlOutput" rows="10" disabled></textarea>
    <div class="d-flex flex-row justify-content-center align-items-center gap-3">
        <button @click="preview" class="btn btn-primary" :disabled="htmlOutput ===''">Podejrzyj zaciemniony HTML</button>
        <button @click="copy" class="btn btn-secondary" :disabled="htmlOutput ===''">Kopiuj Rezultat</button>
        <button @click="download" class="btn btn-primary" :disabled="htmlOutput ===''">Pobierz Rezultat</button>
        <button @click="clean" class="btn btn-secondary" :disabled="htmlOutput ===''">Wyczyść Rezultat</button>
    </div>
</template>

<script type="text/babel">
export default {
    data(){
        return {
            htmlInput: '',
            htmlOutput: '',
            availableModes: [Modes.BASE64, Modes.HEX, Modes.CUSTOM],
            selectedMode: Modes.CUSTOM,
            options: {preventDebugger: false, encodeAttributeValues: false, addHiddenNodes: false ,changeJSIndenfires: false, stringMapping: false, numberMapping: false}
        };
    },
    methods: {
        obfuscate(){
            this.htmlOutput = obfuscateHTML(this.htmlInput, this.selectedMode, this.options);
        },
        preview(){
            openNewTab(this.htmlOutput);
        },
        copy(){
            copyToClipboard(this.htmlOutput);
        },
        download(){
            downloadHtml(this.htmlOutput);
        },
        clean(){
            this.htmlOutput = '';
        }
    },
};
</script>

<style>
textarea{
    resize:none
}

</style>