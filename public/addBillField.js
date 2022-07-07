const MoreBtn = document.getElementById('add-more')
const fieldContainer = document.getElementById('fields-container')

MoreBtn.addEventListener('click', () => {
    const el = document.createElement('div')
    el.classList.add('d-flex', 'my-3')
    el.innerHTML = `
        <input class="form-control" list="items" type="text" name="item[id]" placeholder="item id">
        <input class="form-control" type="number" name="item[quantity]" value="1" min="0" placeholder="quantity">
    `
    fieldContainer.appendChild(el)
})