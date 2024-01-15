export function deobfuscateHTML(htmlString){
    const match = htmlString.match(/window\.atob\("(.+)"\)/);
    return match;
}