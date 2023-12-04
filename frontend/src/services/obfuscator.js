export const Modes = {
    BASE64: "base64",
    HEX: "hexadecimal",
    CUSTOM: "custom"
}

export function obfuscateHTML(htmlString, mode, options){
    if(mode === Modes.BASE64){
        return obfuscateWithBase64(htmlString);
    }
    else if(mode === Modes.HEX){
        return obfuscateWithHexCharacters(htmlString);
    }
    else if(mode === Modes.CUSTOM){
        return obfuscateWithCustomMethod(htmlString, options); 
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



function obfuscateWithCustomMethod(htmlString, options){
    const parserDOM = new DOMParser();
    const htmlTags = ['div','span','p','h1','h2','h3','h4','h5','h6', 'newHtmlTag', 'xyz', 'zyx'];

    const html = parserDOM.parseFromString(htmlString, 'text/html');

    function randomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
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

    function textToNumeric(text){
        let numericText = '';
        for (let i = 0; i < text.length; i++) {
          numericText += '&#' + text.charCodeAt(i) + ';';
        }
        return numericText;
    }

    const indetifierMap = {};


    function obfuscateJS(code){
        const stringTable = [];
        // eslint-disable-next-line no-undef
        let transformedCode = Babel.transform(code, {
            plugins: [
              function customPlugin() {
                return {
                  visitor: {
                    Identifier(path) {
                      if (path.node.name !== 'undefined' && options.changeJSIndenfires) {
                        if (indetifierMap[path.node.name]) {
                            path.node.name = indetifierMap[path.node.name];
                        }
                      }
                    },
                    FunctionDeclaration(path) {
                      if (path.node.id && path.node.id.name && options.changeJSIndenfires) {
                        if (!indetifierMap[path.node.id.name]) {
                            const newName = randomString(50);
                            indetifierMap[path.node.id.name] = newName;
                            path.node.id.name = newName;
                          } else {
                            path.node.id.name = indetifierMap[path.node.id.name];
                          }
                      }
                    },
                    VariableDeclarator(path) {
                        if (path.node.id && path.node.id.name && options.changeJSIndenfires) {
                          if (!indetifierMap[path.node.id.name]) {
                            const newName = randomString(50);
                            indetifierMap[path.node.id.name] = newName;
                            path.node.id.name = newName;
                          } else {
                            path.node.id.name = indetifierMap[path.node.id.name];
                          }
                        }
                    },
                    StringLiteral(path) {
                        if(options.stringMapping){
                            const stringValue = path.node.value;
                            let index = stringTable.indexOf(stringValue);
                            if (index === -1) {
                            stringTable.push(stringValue);
                            index = stringTable.length-1;
                            }
                            path.replaceWith({type: 'Identifier' , name: `stringTable[${index}]`});
                        }
                    },
                  },
                };
              },
            ],
          }).code;
          if(options.stringMapping){
            let values = "";
            stringTable.forEach(item => values += `"${item}",`);
            transformedCode = `const stringTable=[${values}];` + transformedCode;
          }
          return transformedCode;
    }

    function traverseHtml(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            if(node.parentNode.tagName === 'SCRIPT'){
                const obfuscatedCode = obfuscateJS(node.textContent);
                node.textContent = obfuscatedCode.replace(/\n/g, '');
            } else{
                node.textContent = textToNumeric(node.textContent);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE && options.encodeAttributeValues){
            for (let i = 0; i < node.attributes.length; i++) {
                const attr = node.attributes[i];
                node.setAttribute(attr.name, textToNumeric(attr.value));
            }
        }

        if (node.childNodes && node.childNodes.length > 0) {
          node.childNodes.forEach(childNode => traverseHtml(childNode));
        }
    }

    function addPreventingDebugger(rootNode){
        const script = document.createElement('script');
        script.textContent = 'document.onkeydown = function(e) {if(event.keyCode == 123) {return false;}if(e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)){return false;}if(e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)){return false;}if(e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)){return false;}if(e.ctrlKey && e.keyCode == "U".charCodeAt(0)){return false;} }; document.addEventListener("contextmenu", function(event){event.preventDefault();});';
        rootNode.head.appendChild(script);
    }

    if(options.addHiddenNodes) addHiddenNodes(html, 400);
    if(options.preventDebugger) addPreventingDebugger(html);
    traverseHtml(html);

    const serializer = new XMLSerializer();

    let modifiedHtmlString = serializer.serializeToString(html);
    modifiedHtmlString = modifiedHtmlString.replace(/&amp;/g, '&');

    return modifiedHtmlString;
}