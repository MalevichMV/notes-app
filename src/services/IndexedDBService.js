const dbName = "notesDatabase";

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, 1);

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Создаем объектное хранилище с именем "notes" и ключом "id"
      const notesStore = db.createObjectStore("notes", {
        keyPath: "id",
        autoIncrement: true,
      });

      notesStore.createIndex("title", "title", { unique: false });
    };
  });
}

export const addNote = async (note) => {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["notes"], "readwrite");
    const notesStore = transaction.objectStore("notes");

    const request = notesStore.add(note);

    request.onsuccess = () => {
      // в request.result находится id созданой записи
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const getAllNotes = async () => {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["notes"], "readonly");
    const notesStore = transaction.objectStore("notes");

    const request = notesStore.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const deleteNoteById = async (noteId) => {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["notes"], "readwrite");
    const notesStore = transaction.objectStore("notes");

    const request = notesStore.delete(noteId);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};
