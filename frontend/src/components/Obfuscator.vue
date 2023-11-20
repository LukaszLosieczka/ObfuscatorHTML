<script setup>
import {obfuscateHTML, Modes} from '../services/obfuscator'
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
            <div class="d-flex justify-content-center">
                <select class="form-control-sm mx-2" id="selectMode" v-model="selectedMode">
                    <option v-for="mode in availableModes" :value="mode">{{ mode }}</option>
                </select>
                 <button @click="obfuscate" class="btn btn-primary">Zaciemnij HTML</button>
            </div>
            <label for="htmlOutput">Rezultat</label>
            <textarea v-model="htmlOutput" type="text" class="form-control" id="htmlOutput" rows="10" disabled></textarea>
            <div class="text-center">
                <button @click="preview" class="btn btn-primary">Podejrzyj zaciemniony HTML</button>
            </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            htmlInput: '',
            htmlOutput: '',
            availableModes: [Modes.BASE64, Modes.HEX, Modes.CUSTOM],
            selectedMode: Modes.BASE64
        };
    },
    methods: {
        obfuscate(){
            this.htmlOutput = obfuscateHTML(this.htmlInput, this.selectedMode);
        },
        preview(){
            const newWindow = window.open('', '_blank');
            newWindow.document.open();
            newWindow.document.write(this.htmlOutput);
            newWindow.document.close();
            if (newWindow) {
                newWindow.focus();
            } else {
                alert('The new window was blocked by a popup blocker or not allowed.');
            }
        }
    },
};
</script>

<style>
textarea{
    resize:none
}

</style>