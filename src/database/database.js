import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {name : 'todo.db', location: 'default'} , 
    () => console.log("DB connected"),
    (err) => console.log("Error Occured ", err));


export const initializeDatabase = () => {
    db.transaction((tx) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            completed INTEGER DEFAULT 0);
            `
        )
    })
}

export const addTask = (title, callback) => {
    db.transaction((tx) => {
        tx.executeSql(
            `INSERT INTO tasks (title) VALUES (?);`,
            [title],
            (_, res) => callback(res),
            (_, err) => console.error('Failed to add Data ', err)
        )
    })
}

export const getTasks = (callback) => {
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM tasks;`,
            [],
            (_, res) => callback(res.rows.raw()),
            (_, err) => console.error('Failed to get all the data', err)
        )
    })
}

export const updateTask = (id, completed, callback) => {
    db.transaction((tx) => {
        tx.executeSql(
            `UPDATE tasks SET completed = ? WHERE id = ?;`,
            [completed, id],
            (_, res) => callback(res),
            (_, err) => console.error("Failed to update task", err)
        )
    })
}


export const deleteTask = (id, callback) => {
    db.transaction((tx) => {
        tx.executeSql(
            `DELETE FROM tasks WHERE id = ?;`,
            [id],
            (_, res) => callback(res),
            (_, err) => console.error('Failed to delete task' ,err)
        )
    })
}


export const editTaskDetails = (id, title) => {
    db.transaction((tx) => {
        tx.executeSql(
            `UPDATE tasks SET title = ? WHERE id = ?`,
            [title, id],
            (_, res) => console.log("Task Updated", res),
            (_, err) => console.error("Failed to update task", err)
        )
    })
}