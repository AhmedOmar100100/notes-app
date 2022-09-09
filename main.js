let noteHeading = document.getElementById('note-heading'),
    noteDetails = document.getElementById('note-details'),
    addNoteBtn = document.getElementById('add-note-btn'),
    allNotesContainer = document.getElementById('all-notes-container'),
    searchInp = document.getElementById('searchInp'),
    allNotes,
    mood = "create";
let tmpVar;

if (JSON.parse(localStorage.getItem('notes')) === null) {
    allNotes = []
} else {
    allNotes = JSON.parse(localStorage.getItem('notes'))
    display()
}




addNoteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let note = {
        'heading': noteHeading.value,
        'details': noteDetails.value
    }
    if (mood == "create") {
        addNoteBtn.innerHTML = "create"
        allNotes.push(note);
        localStorage.setItem('notes', JSON.stringify(allNotes));
        noteHeading.value = "";
        noteDetails.value = "";
    } else {

        allNotes[tmpVar] = note;
        localStorage.setItem('notes', JSON.stringify(allNotes));

        mood = "create"
        addNoteBtn.innerHTML = "create"

    }

    display();

})

function display() {
    let allNotesText = ``;
    for (let [index, note] of allNotes.entries()) {
        allNotesText += `
            <div class="col-md-4">
                <div class="card mb-2">
                    <div class="card-body">
                        <h5 class="card-title">${note.heading}</h5>
                        <p class="card-text">${note.details}</p>
                    </div>
                    <button onclick="deleteItem(${index})">delete</button>
                    <button onclick="updateItem(${index})">Update</button>

                </div>
            </div>        
        `;
    }
    allNotesContainer.innerHTML = allNotesText

};


function search(searched) {
    let temp = ``;
    for (const [index, singleNote] of allNotes.entries()) {
        if (singleNote.heading.includes(searched)) {
            temp += `
            <div class="col-md-4">
            <div class="card mb-2">
                <div class="card-body">
                    <h5 class="card-title">${singleNote.heading}</h5>
                    <p class="card-text">${singleNote.details}</p>
                </div>
                <button onclick="deleteItem(${index})">delete</button>
                <button onclick="updateItem(${index})">Update</button>
            </div>
        </div>`
        }

        allNotesContainer.innerHTML = temp
    }

}


function deleteItem(index) {
    allNotes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(allNotes));
    display()


}

function updateItem(index) {
    tmpVar = index;
    noteHeading.value = allNotes[index].heading
    noteDetails.value = allNotes[index].details
    addNoteBtn.innerHTML = "update"
    mood = "update"

}