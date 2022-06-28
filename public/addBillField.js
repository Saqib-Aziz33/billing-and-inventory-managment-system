const MoreBtn = document.getElementById('add-more')
const fieldContainer = document.getElementById('fields-container')

MoreBtn.addEventListener('click', () => {
    const el = document.createElement('div')
    el.classList.add('my-3')
    el.innerHTML = `
        <input list="items" type="text" name="item[id]" placeholder="item id">
        <input type="number" name="item[quantity]" value="1" placeholder="quantity">
    `
    fieldContainer.appendChild(el)
})