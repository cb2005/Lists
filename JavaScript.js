adding = false

//localStorage.removeItem('listnum')
var listnum = 1
if (localStorage.getItem('listnum') != null) {
  listnum = localStorage.getItem('listnum')
}

//localStorage.removeItem('itemnum')
var itemnum = 1
if (localStorage.getItem('itemnum') != null) {
  itemnum = localStorage.getItem('itemnum')
}

//localStorage.removeItem('list-of-lists')
if (localStorage.getItem('list-of-lists') != null) {
  document.querySelector('.list-of-lists').innerHTML = localStorage.getItem('list-of-lists')
}

var currentlistnum = 0

function initial_add() {
  if (adding === false) {
    adding = true
    html = document.querySelector('.list-of-lists').innerHTML
    document.querySelector('.list-of-lists').innerHTML = `
    <div id="list${listnum}">
      <div class="list">
        <input placeholder="List Name" class="list-name-input">

        <button class="final-add-button" onclick="
          final_add(${listnum})
        ">Add</button>
      </div>
    </div>
    `
    document.querySelector('.list-of-lists').innerHTML += html
  }
}

function final_add() {
  input = document.querySelector('.list-name-input').value
  document.getElementById(`list${listnum}`).innerHTML = `
  <div class="list">
    <button class="list-name-button" onclick="
    currentlistnum = '${listnum}'
    main = document.querySelector('.main-page')
    main.innerHTML = localStorage.getItem('list${listnum}')
    ">${input}</button>

    <button class="delete-list-button" onclick="
    delete_list(${listnum})
    ">Delete</button>
  </div>
  `
  localStorage.setItem(`list-of-lists`, document.querySelector('.list-of-lists').innerHTML)

  document.querySelector('.main-page').innerHTML = `
  <div class="list-title">${input}<div>
  
  <div class="enter-grid">
    <input placeholder="Item Name" class="item-name-input">

    <button class="add-item-button" onclick="
    add_item(${listnum})
    ">Add</button>
  </div>

  <div class="list-of-items"></div>
  `
  localStorage.setItem(`list${listnum}`, document.querySelector('.main-page').innerHTML)
  currentlistnum = listnum
  listnum += 1
  localStorage.setItem('listnum', `${listnum}`)
  adding = false
}

function add_item(listnum) {
  input = document.querySelector('.item-name-input').value
  document.querySelector('.item-name-input').value = ''
  html = document.querySelector('.list-of-items').innerHTML
  document.querySelector('.list-of-items').innerHTML = `
  <div id="item${itemnum}" class="item">
    <div class="item-name">${input}</div>

    <button class="delete-item-button"  onclick="
    delete_item(${itemnum}, ${listnum})
    ">Delete</div>
  </div>
  `
  document.querySelector('.list-of-items').innerHTML += html
  localStorage.setItem(`list${listnum}`, document.querySelector('.main-page').innerHTML)
  itemnum += 1
  localStorage.setItem('itemnum', `${itemnum}`)
}

function delete_item (itemnum ,listnum) {
  trash = document.getElementById(`item${itemnum}`)
  trash.remove(trash)
  localStorage.setItem(`list${listnum}`, document.querySelector('.main-page').innerHTML)
}

function delete_list(listnum) {
  trash = document.getElementById(`list${listnum}`)
  trash.remove(trash)
  if (currentlistnum == listnum) {
    document.querySelector('.main-page').innerHTML = ''
  }
  localStorage.setItem(`list-of-lists`, document.querySelector('.list-of-lists').innerHTML)
}