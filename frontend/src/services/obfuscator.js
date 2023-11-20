export const Modes = {
    BASE64: "base64",
    HEX: "hexadecimal",
    CUSTOM: "custom"
}

export function obfuscateHTML(htmlString, mode){
    if(mode === Modes.BASE64){
        return obfuscateWithBase64(htmlString);
    }
    else if(mode === Modes.HEX){
        return obfuscateWithHexCharacters(htmlString);
    }
    else if(mode === Modes.CUSTOM){
        return obfuscateWithCustomMethod(htmlString); 
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

function obfuscateWithCustomMethod(htmlString){
    const parser = new DOMParser();
    const htmlTags = ['div','span','p','h1','h2','h3','h4','h5','h6'];

    const html = parser.parseFromString(htmlString, 'text/html');

    function textToNumeric(text){
        let numericText = '';
        for (let i = 0; i < text.length; i++) {
          numericText += '&#' + text.charCodeAt(i) + ';';
        }
        return numericText;
    }

    function convertToNumeric(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            if(node.parentNode.tagName === 'SCRIPT'){
                node.textContent = node.textContent.replace(/\s|\n/g, '');
            } else{
                node.textContent = textToNumeric(node.textContent);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE){
            for (let i = 0; i < node.attributes.length; i++) {
                const attr = node.attributes[i];
                node.setAttribute(attr.name, textToNumeric(attr.value));
            }
        }

        if (node.childNodes && node.childNodes.length > 0) {
          node.childNodes.forEach(childNode => convertToNumeric(childNode));
        }
    }

    function randomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    function addHiddenNodes(rootNode, n){
        const nodes = Array.from(rootNode.querySelectorAll('*'))
            .filter(node => {return node.nodeName !== 'TITLE' && node.nodeName !== 'SCRIPT'});
        for(let i=0; i < n; i++){
            const node = document.createElement(htmlTags[Math.floor(Math.random() * htmlTags.length)]);
            node.style.position = 'absolute';
            node.style.backgroundColor = 'transparent';
            node.style.visibility = 'hidden';
            node.style.display = 'none';
            node.textContent = randomString(Math.floor(Math.random() * 100));
            const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
            randomNode.appendChild(node);
        }
    }
    
    addHiddenNodes(html, 1000);
    convertToNumeric(html);

    const serializer = new XMLSerializer();

    let modifiedHtmlString = serializer.serializeToString(html);
    modifiedHtmlString = modifiedHtmlString.replace(/&amp;/g, '&');

    return modifiedHtmlString;
}