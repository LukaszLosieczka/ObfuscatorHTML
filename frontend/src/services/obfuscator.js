export const Modes = {
    BASE64: "base64",
}

export function obfuscateHTML(htmlString, mode){
    if(mode === Modes.BASE64){
        return obfuscateWithBase64(htmlString);
    }
    else if(mode === Modes.NODEPACKAGE){
        return obfuscateWithNodePackage(htmlString);
    }
}

function obfuscateWithBase64(htmlString){
    const encodedHTML = btoa(htmlString);
    return `<script>document.write(atob("${encodedHTML}"));</script>`;
}
