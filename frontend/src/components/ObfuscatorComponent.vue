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
                        <label class="form-check-label" for="checkbox2">Add hidden nodes</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="checkbox4" v-model="options.changeJSIndenfires">
                        <label class="form-check-label" for="checkbox2">Change Javascript indentifires</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="checkbox5" v-model="options.stringMapping">
                        <label class="form-check-label" for="checkbox2">String array mapping</label>
                    </div>
                </div>
                 <button @click="obfuscate" class="btn btn-primary" :disabled="htmlInput ===''">Zaciemnij HTML</button>
            </div>
            <label for="htmlOutput">Rezultat</label>
            <textarea v-model="htmlOutput" type="text" class="form-control" id="htmlOutput" rows="10" disabled></textarea>
            <div class="text-center">
                <button @click="preview" class="btn btn-primary" :disabled="htmlOutput ===''">Podejrzyj zaciemniony HTML</button>
            </div>
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
            options: {preventDebugger: false, encodeAttributeValues: false, addHiddenNodes: false ,changeJSIndenfires: false, stringMapping: false}
        };
    },
    methods: {
        obfuscate(){
            this.htmlOutput = obfuscateHTML(this.htmlInput, this.selectedMode, this.options);
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