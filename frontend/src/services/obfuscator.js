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
    const delimiter = "&#x";
    const hexArray = charArray.map(charCode => `${delimiter}${charCode.toString(16)}`);
    const obfuscatedHTML = hexArray.join('');
    return `<script>var input='${obfuscatedHTML}'.split("${delimiter}");var output='';
    for(var i=1; i<input.length;i++){output += String.fromCharCode(parseInt(input[i],16));}
    document.write(output);</script>`;
}