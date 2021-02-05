import data from './data'
import './styles/main.scss'

const { rowTitle, hours, days, persons } = data
const locationPath = location.pathname.split('/')[1]

if (!localStorage.getItem('data')) {
    localStorage.setItem('data', '[]')
}

const createTable = () => {
    const table = document.querySelector('.table')
    const thead = document.createElement('thead')
    const tr = document.createElement('tr')
    const tbody = document.createElement('tbody')

    thead.classList.add('thead-light')

    for (let i = 0; i < rowTitle.length; i++) {
        const th = document.createElement('th')
        th.textContent = rowTitle[i]
        tr.append(th)
    }
    hours.forEach((h, i) => {
        const tr = document.createElement('tr')
        tr.dataset.hour = h
        tbody.append(tr)

        rowTitle.forEach((row, index) => {
            const td = document.createElement('td')

            if (index % 6 == 0) {
                td.textContent = `${h}:00`
            }
            else {
                td.dataset.day = days[index - 1]
            }
            tr.append(td)
        })
    })

    thead.appendChild(tr)
    table.append(thead, tbody)
}

const removeMeeting = (e) => {
    const modal = document.querySelector('.modal-container')
    e.preventDefault()
    let storage = JSON.parse(localStorage.getItem('data'))
    const day = e.target.parentNode.dataset.day;
    const hour = e.target.parentNode.parentNode.dataset.hour
    const parentElem = e.target.parentNode

    let updatedStorage = storage.filter((s) => {
        return s.day != day || s.time != hour
    })

    localStorage.setItem("data", JSON.stringify(updatedStorage))
    parentElem.classList.remove('active')
    parentElem.innerText = null
    e.target.innerText = null
    modal.classList.remove('open')
}

const showModal = (e, eventName) => {
    const modal = document.querySelector('.modal-container')
    const closeButton = document.getElementById('closeButton')
    const approveButton = document.getElementById('approveButton')
    const modalText = document.querySelector('.custom-modal .modal-text')

    closeButton.onclick = () => {
        modal.classList.remove('open')
    }

    approveButton.onclick = () => {
        removeMeeting(e)
    }

    modalText.innerText = `Are you shure you want to delete \n "${eventName}" event?`
    modal.classList.add('open')
}

const createButtonNewEvent = () => {
    const navContainer = document.querySelector('.navigation')
    const button = document.getElementById('createEvent')
    button.addEventListener('click', () => {
        location.href = `/${locationPath}/create-event`;
    })
    navContainer.append(button)
}


const hilightCell = (highlightData) => {
    const allCells = document.querySelectorAll("table td")
    let storage = highlightData

    allCells.forEach((cell, index) => {
        if (index % 6 != 0) {
            cell.classList.remove('active')
            cell.textContent = ''
        }
        storage.forEach((store) => {

            if ((store.time === cell.parentNode.dataset.hour) && (store.day === cell.dataset.day)) {

                cell.classList.add('active')
                cell.textContent = store.eventName

                const closeIcon = document.createElement('span')
                closeIcon.addEventListener('click', (e) => showModal(e, store.eventName))
                closeIcon.innerText = 'x'
                closeIcon.title = 'Delete meeting'
                closeIcon.classList.add('remove-meeting')
                cell.append(closeIcon)
            }
        })
    })
}

const createFilterOption = () => {
    const select = document.getElementById('userFilter')
    const defaultOption = document.createElement('option')

    select.addEventListener('change', filterByUser)
    defaultOption.selected = true
    defaultOption.innerHTML = "All members"
    select.append(defaultOption)

    persons.forEach((data) => {
        const option = document.createElement('option')
        option.value = data
        option.innerHTML = data
        select.append(option)
    })
}

const filterByUser = (e) => {
    let storage = JSON.parse(localStorage.getItem('data'))

    if (e.target.selectedIndex == 0) {
        hilightCell(storage)
        return
    }

    let personData = storage.filter((s) => {
        return s.participant.includes(e.target.value)
    })
    hilightCell(personData)
}

const createWrapper = () => {
    createButtonNewEvent()
    createTable()
    hilightCell(JSON.parse(localStorage.getItem('data')))
    createFilterOption()
}

document.querySelector('.modal-container').addEventListener('click', (e) => {
    if (e.target == document.querySelector('.modal-container')) {
        document.querySelector('.modal-container').classList.remove('open')
    }
})

window.onload = createWrapper();

