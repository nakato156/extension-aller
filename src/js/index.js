let copiedTexts = [];

document.addEventListener('copy', async (e) => {
    const selection = document.getSelection();
    const text = selection.toString()
    copiedTexts.push(text);
    browser.storage.local.get('copied').then((result)=>{
        if(result.copied) copiedTexts.push(...result.copied)
        browser.storage.local.set({ 'copied': [...new Set(copiedTexts)] });
    })
});
  