const fs = require('fs').promises;

async function getNotes() {
    const rawData = await fs.readFile('./db/notes.json', 'utf8');

    return JSON.parse(rawData)
}

async function saveNotes(updatedNotesArray) {
    await fs.writeFile('./db/notes.json', JSON.stringify(updatedNotesArray, null, 2));

    console.log('notes json file updated!');
}

module.exports = {
    getNotes: getNotes,  // property : value / value references the async function above
    saveNotes: saveNotes
}