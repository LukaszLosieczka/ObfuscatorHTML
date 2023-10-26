export const Modes = {
    BASE64: "base64",
    HEX: "hexadecimal"
}

export function obfuscateHTML(htmlString, mode){
    if(mode === Modes.BASE64){
        return obfuscateWithBase64(htmlString);
    }
    else if(mode === Modes.HEX){
        return obfuscateWithHexCharacters(htmlString);
    }
}

function obfuscateWithBase64(htmlString){
    const encodedHTML = window.btoa(htmlString);
    return `<script>document.write(window.atob("${encodedHTML}"));</script>`;
}

function obfuscateWithHexCharacters(htmlString){
    const charArray = Array.from(htmlString).map(char => char.charCodeAt(0));
    const hexArray = charArray.map(charCode => `&#x${charCode.toString(16)};`);
    const obfuscatedHTML = hexArray.join('');
    return `<script>document.write('${obfuscatedHTML}');</script>`;
}