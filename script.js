// Main array to connect with localStorage

let studentArray = []

// Student Class

class Student {
    constructor (id, name, lastName) {
        this.id = id
        this.name = name
        this.lastName = lastName
    }
}

// Day Class

class day {
    constructor (id, day, month) {
        this.id = id
        this.day = day
        this.month = month
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

    static clearFields () {
        document.querySelector('#inputName').value = ''
        document.querySelector('#inputLastName').value = ''
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

    // Stores student on principal array
    static saveStudent(student) {

        studentArray.push(student)
        Store.saveArray(studentArray)
        
    }

    // Stores principal array on localStorage
    static saveArray(array) {
        localStorage.setItem('students', JSON.stringify(array))
    }
}

// Event: Displays students

document.addEventListener('DOMContentLoaded', UI.displayStudents)

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

// Event: Add day

// Event: Remove a day

// Event: Remove a student