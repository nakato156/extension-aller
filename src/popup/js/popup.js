const svgCopy = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cursor-pointer mr-2 w-5 h-5">
<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
</svg>`

class ClipBoard {
    constructor(){
        this.items = []
        
        browser.storage.local.get("copied").then((result) => {
            this.items.push(...result.copied)
        });        
    }

    render(contenedor) {
        const ul = document.createElement('ul')
        ul.setAttribute('class', "w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white")
        for(const item of this.items.reverse().slice(0, 10))
            ul.innerHTML += `<div class="flex justify-center items-center">
            <li class="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">${item}</li>
            ${svgCopy}
            </div>`
        
        contenedor.innerHTML = ul.outerHTML
    }

    vaciar(){
        this.items = []
    }
};

const getNotes = () => {
    let notas = localStorage.getItem('notas')
    return !notas ? [] : JSON.parse(notas)
}

const saveNotes = (object) => {
    let notas = getNotes()
    notas.push(object)
    localStorage.setItem('notas', JSON.stringify(notas))
}

const myClipboard = new ClipBoard()

const clipboardTab = document.getElementById('clipboard')
const notesTab = document.getElementById('notas')
const contentTabs = document.getElementById('contentTabs')

clipboardTab.addEventListener('click', () => {
    myClipboard.render(contentTabs)
})

notesTab.addEventListener('click', (e) => {

})