import data from './data'

import './styles/main.scss'

let values = []
let isClose = true
let { hours, persons, days } = data
const dayDropDownElem = document.getElementById("day")
const timeDropDownElem = document.getElementById("time")
const eventField = document.getElementById('text')

const createmultiSelectDropdown = () => {
  const container = document.getElementById('multiDropDown')
  const input = document.createElement('input')

  input.className = 'custom-input input-text'
  input.name = 'participant'
  input.autocomplete = "off"
  input.readOnly = true
  input.placeholder = 'Participant'
  container.append(input)
  input.onclick = generateList
}

const generateList = () => {
  const container = document.getElementById('multiDropDown')
  if (isClose == false) {
    const wrapper = document.getElementById('dropdown')
    wrapper.style.display = 'block'
    return
  }

  const listWrapper = document.createElement('div')

  listWrapper.className = 'list'
  listWrapper.classList.toggle('open')
  listWrapper.id = 'dropdown'
  container.append(listWrapper)
  persons.forEach((person) => {
    const record = document.createElement('div')
    record.textContent = person
    listWrapper.append(record)
  })

  listWrapper.onclick = multipleSelect
}

const multipleSelect = (e) => {
  const input = document.querySelector('.custom-input')
  let targetElement = e.target || e.srcElement;

  targetElement.classList.toggle('selected')
  if (values.includes(targetElement.innerText)) {
    let filteredArr = values.filter(v => { return v !== targetElement.innerText })
    values = filteredArr
  }
  else {
    values.push(targetElement.innerText)
  }

  input.value = values
}

document.addEventListener('click', (e) => {
  let targetElement = e.target;
  const input = document.querySelector('.custom-input')
  const container = document.getElementById('dropdown')

  if (targetElement == input) {
    isClose = false
    return
  }

  if (targetElement.parentNode.id != "dropdown" && isClose == false) {
    container.style.display = 'none'
  }
});

document.getElementById('text').addEventListener('keyup',(e)=>{
  const errorText = document.querySelector('.input-error-text')
  if(e.target.classList.contains('input-error')){
    e.target.classList.remove('input-error')
    errorText.remove()
    return
  }
})

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(e.target);

  prepareData(...formData)
})

document.getElementById('cancel').addEventListener('click', ()=>{
  location.href = "/";
})

const createOptions = (field, loopData) => {
  loopData.forEach((data, index) => {
    const option = document.createElement('option')
    option.value = data
    option.selected = index == 0 ? data : null
    option.innerHTML = data

    field.append(option)
  })
}

const prepareData = (...values) => {
  const transformToObject = Object.fromEntries(values)
  if (!/\S/.test(transformToObject.eventName)) {
    showInputError()
    return
  }
  
  data.saveData(transformToObject, showError)
}

const showInputError = () => {
  const error = document.createElement('span')
  error.innerText = "Field is required"

  if(eventField.classList.contains('input-error'))
  {
    return
  }

  error.classList.add('input-error-text')
  eventField.classList.add('input-error')
  eventField.after(error)
}

const showError = () => {
  const errorForm = document.getElementById('error')
  const closeIcon = document.createElement('span')
  
  if (errorForm.classList.contains('show')) {
    return
  }

  closeIcon.innerHTML = '&times;'
  closeIcon.classList.add('close-error')
  closeIcon.onclick = ()=>{
    errorForm.classList.remove('show')
    p.innerText = ""
  }

  let p = document.createElement('p')
  p.innerText = `Error: Failed to create an event. Time slot is already booked`

  errorForm.classList.add('show')

  setTimeout(() => {
    errorForm.classList.remove('show')
    p.innerText = ""
  }, 10000);

  errorForm.append(p,closeIcon)
}

const init = () => {
  createmultiSelectDropdown()
  createOptions(timeDropDownElem, hours)
  createOptions(dayDropDownElem, days)
}

window.onload = init()

