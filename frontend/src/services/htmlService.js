export function openNewTab(htmlString){
    const newWindow = window.open('', '_blank');
    newWindow.document.open();
    newWindow.document.write(htmlString);
    newWindow.document.close();
    if (newWindow) {
        newWindow.focus();
    } else {
        alert('The new window was blocked by a popup blocker or not allowed.');
    }
}

export function copyToClipboard(htmlString){
    navigator.clipboard.writeText(htmlString)
    .then(() => {
        alert("Copied result successfully!");
    })
    .catch(err => {
        console.error('Error copying to clipboard:', err);
      });
}

export function downloadHtml(htmlString){
    const a = document.createElement('a');
    const file = new Blob([htmlString], { type: 'text/html' });
  
    a.href = URL.createObjectURL(file);
    a.download = 'output.html';
    a.click();
  
    URL.revokeObjectURL(a.href);
}