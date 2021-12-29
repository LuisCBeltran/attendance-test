// Student Class

class Student {
    constructor (id, lastName, name) {
        this.id = id
        this.lastName = lastName
        this.name = name
    }
}

// UI Class: Handles UI tasks

class UI {

    // Fetch data from localStorage and calls addStudentToList
    static displayStudents () {

        const StoredStudents = Store.getSavedStudents()

        StoredStudents.forEach((student) => UI.addStudentToList(student))

    }

    static addStudentToList (student) {

        const list = document.querySelector('#studentsList')

        const row = document.createElement('tr')

        // Fetch values from each property in the student object
        let values = Object.values(student)

        let tds = []

        // Pushes <td> within the tds array with the values from the student object
        values.forEach(function (value) {
            if (value.length < 24) {
                tds.push(`<td>${value}</td>`)
            }
        })

        list.appendChild(row)

        // Sums all the <td>'s and inserts them within the row
        let reducer = (a, b) => a + b

        let reducedTds = tds.reduce(reducer)

        row.innerHTML = reducedTds

    } 

    // Clear fields from Last Name and Name inputs
    static clearFields () {
        document.querySelector('#inputName').value = ''
        document.querySelector('#inputLastName').value = ''
    }

    // ADD DATE SECTION

    static displayDateTitle () {

        // Fetch dates from localStorage
        const storedDates = Store.getSavedDates()

        // If there is no data in dates, returns Last Name and Name. Else, it prints dates.
        if (storedDates === null) {

            const initialData = ['Last Name', 'Name']
            Store.saveArrayOfDates(initialData)
            const newStoredDates = Store.getSavedDates()
            UI.printDates(newStoredDates)

        } else {

            const dates = Store.getSavedDates()
            UI.printDates(dates)

        }
        
    }

    static printDates (dates) {

        // Selects the row of the head of the table
        const row = document.querySelector('#dateRow')
        row.innerHTML = ''

        let ths = []
        
        // Gives HTML format to each date
        dates.forEach((date) => {
            ths.push(`<th>${date}</th>`)
        })

        // Change the format. From array to string, so it can be inserted as HTML
        let reducer = (a, b) => a + b
        let reducedThs = ths.reduce(reducer)
        row.innerHTML = reducedThs
    }
}

// Store Class: Handles storage

class Store {

    // Fetch students from localStorage
    static getSavedStudents() {

        let studentsJSON = localStorage.getItem('students')

        if (studentsJSON !== null) {
            return JSON.parse(studentsJSON)
        } else {
            return []
        }
    }

    // Stores student on array
    static saveStudent(student) {
        let storedStudents = Store.getSavedStudents()
        let storedDates = Store.getSavedDates()
        if (storedDates.length > 2)
        storedStudents.push(student)

        // Compare function to sort students alphabetically
        const compare = function (a, b) {
            let lastNameA = a.lastName.toLowerCase()
            let lastNameB = b.lastName.toLowerCase()
            if (lastNameA < lastNameB) {
                return -1
            }
            if (lastNameA > lastNameB) {
                return 1
            }
            return 0
        }

        let sortedStoredStudents = storedStudents.sort(compare)

        Store.saveArray(sortedStoredStudents)

        let studentsList = document.querySelector('#studentsList')
        studentsList.innerHTML = ''

        UI.displayStudents()

    }

    // Stores principal array of students on localStorage
    static saveArray(array) {
        localStorage.setItem('students', JSON.stringify(array))
    }

    // Fetch dates from localStorage
    static getSavedDates () {

        let datesJSON = localStorage.getItem('dates')
        return JSON.parse(datesJSON)

    }

    // Adds a date to the localStorage
    static saveDate (date) {
        const storedDates = Store.getSavedDates()
        storedDates.push(date)
        Store.saveArrayOfDates(storedDates)

        // Adds date to each student as a key and a value
        let savedStudents = Store.getSavedStudents()
        savedStudents.forEach(function (student) {
            student[date] = 'P'
        })
        Store.saveArray(savedStudents)
    }

    // Stores array of dates on localStorage
    static saveArrayOfDates(array) {
        localStorage.setItem('dates', JSON.stringify(array))
    }
}

// Event: Displays students

document.addEventListener('DOMContentLoaded', UI.displayStudents)

// Event: Display dates

document.addEventListener('DOMContentLoaded', UI.displayDateTitle)

// Event: Add a student

const addStudentForm = document.querySelector('#addStudentForm')

addStudentForm.addEventListener('submit', (e) => {

    // Prevent default submit
    e.preventDefault()

    // Get form values and id
    const id = uuidv4()
    const lastName = document.querySelector('#inputLastName').value
    const name = document.querySelector('#inputName').value

    // Instantiate student

    const student = new Student(id, lastName, name)

    // Add student to UI
    UI.addStudentToList(student)

    // Clear fields
    UI.clearFields()

    // Save student to localStorage
    Store.saveStudent(student)

})

// Event: Remove a student

// Event: Add date

const addDateForm = document.querySelector('#addDateForm')

addDateForm.addEventListener('submit', (e) => {

    // Prevent default submit
    e.preventDefault()

    // Get value (date)
    const date = document.querySelector('#inputDate').value

    // Store date to localStorage
    Store.saveDate(date)

    // Add date to title within the table
    UI.displayDateTitle()

})

// Event: Remove a date