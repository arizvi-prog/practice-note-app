const noteOutput = document.querySelector('.note-output')

async function getNotes() {
    const res = await fetch('/api/notes');
    const notes = await res.json();

    for (const notesObj of notes) {
        noteOutput.insertAdjacentHTML('beforeend', `
            <div class="note">
                <h3>${notesObj.text}</h3>
                <a href="/note?note_id=${notesObj.id}">View Note</a>
            </div>
            `);
    }
}

function init() {
    getNotes();
}

init();