export function randomString(length) {
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

export function textToNumeric(text){
    let numericText = '';
    for (let i = 0; i < text.length; i++) {
      numericText += '&#' + text.charCodeAt(i) + ';';
    }
    return numericText;
}