import {numericToText} from "./utils.js"

export function deobfuscateHTML(htmlString){
    htmlString = htmlString.replace(/(\r\n|\n|\r)/gm, '');
    var uncodedHTML = '';
    const base64Match = htmlString.match(/window\.atob\("(.+)"\)/);
    const hexMatch = htmlString.match(/<script>(.+)String\.fromCharCode\((.+?)\)(.+)document\.write\((.+)\)(.+)<\/script>/m);
    if(base64Match){
        uncodedHTML = window.atob(base64Match[1])
    }
    else if(hexMatch){
        let scriptToDecode = hexMatch[0].match(/<script>(.+)<\/script>/)[1];
        const finalValue = scriptToDecode.match(/document\.write\((.+)\)/)[1];
        scriptToDecode = scriptToDecode.replace(/document\.write\((.+)\)/, `return ${finalValue}`);
        uncodedHTML = eval(`function decode(){${scriptToDecode}} decode();`);
    }
    else{
        uncodedHTML = htmlString;
    }
    const parserDOM = new DOMParser();
    const html = parserDOM.parseFromString(uncodedHTML, 'text/html');

    removeHiddenNodes(html);
    traverseHtml(html);

    const serializer = new XMLSerializer();

    return serializer.serializeToString(html);
}


function removeHiddenNodes(html){
    const hiddenNodes = html.querySelectorAll('[style*="display: none;"], [style*="visibility: hidden;"]');
    hiddenNodes.forEach(node => {
      node.parentNode.removeChild(node);
    });   
}

function traverseHtml(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        if(node.parentNode.tagName === 'SCRIPT'){
            const deobfuscatedCode = deobfuscateJS(node.textContent);
            node.textContent = deobfuscatedCode;//.replace(/;/g, ';\n').replace(/{/g, '{\n').replace(/}/, '}\n');
        } else{
            node.textContent = numericToText(node.textContent);
        }
    } else if (node.nodeType === Node.ELEMENT_NODE){
        for (let i = 0; i < node.attributes.length; i++) {
            const attr = node.attributes[i];
            node.setAttribute(attr.name, numericToText(attr.value));
        }
    }

    if (node.childNodes && node.childNodes.length > 0) {
      node.childNodes.forEach(childNode => traverseHtml(childNode));
    }
}

function deobfuscateJS(code){
    const indetifierMap = {};
    const arraysMap = {};
    let numberOfVariables = 0;
    let numberOfFunctions = 0;
    // eslint-disable-next-line no-undef
    let transformedCode = Babel.transform(code, {
        plugins: [
          function customPlugin() {
            return {
              visitor: {
                Identifier(path) {
                  if (path.node.name !== 'undefined') {
                    if (indetifierMap[path.node.name] && path.parentPath.node.property !== path.node) {
                        path.node.name = indetifierMap[path.node.name];
                    }
                  }
                },
                FunctionDeclaration(path) {
                  if (path.node.id && path.node.id.name && path.node.id.name.length >= 20) {
                    if (!indetifierMap[path.node.id.name]) {
                        indetifierMap[path.node.id.name] = `function${numberOfFunctions}`;
                        numberOfFunctions++;
                        for(const param of path.node.params){
                          if(!indetifierMap[param.name]){
                            indetifierMap[param.name] = `variable${numberOfVariables}`;
                            numberOfVariables++;
                          }
                          param.name = indetifierMap[param.name];
                        }
                    }
                    path.node.id.name = indetifierMap[path.node.id.name];
                  }
                },
                VariableDeclarator(path) {
                    if (path.node.id && path.node.id.name && path.node.id.name.length >= 20) {
                      if (!indetifierMap[path.node.id.name]) {
                        indetifierMap[path.node.id.name] = `variable${numberOfVariables}`;
                        numberOfVariables++;
                      }
                      if(path.node.init.type === 'ArrayExpression'){
                        const arrayElements = path.node.init.elements.map(element => element.value);
                        arraysMap[path.node.id.name] = arrayElements;
                        path.remove();
                      }else{
                        path.node.id.name = indetifierMap[path.node.id.name];
                      }
                    }
                },
                MemberExpression(path) {
                    if (
                      path.node.object.type === 'Identifier' &&
                      path.node.property.type === 'NumericLiteral'
                    ) {
                      const index = path.node.property.value;
                      var value = arraysMap[path.node.object.name][index]
                      if(typeof value === 'string'){value = `'${value}'`}
                      path.replaceWith({type: 'Identifier', name: `${value}`});
                    }
                  },
              },
            };
          },
        ],
      }).code;

      return transformedCode;
}