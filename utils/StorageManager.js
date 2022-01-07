import * as SQLite from 'expo-sqlite'

const transactionPromise = function (transactionCode) {
  return new Promise((resolve, reject) => {
    this.transaction(
      transactionCode,
      (e) => reject(e),
      () => resolve(this.result),
    )
  })
}

export default class StorageManager {
  constructor() {
    this.db = SQLite.openDatabase('MaledettaTreEstDB')
    this.db.transactionPromise = transactionPromise
  }

  createUserTable() {
    console.log('creating user table...')
    this.db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS user' +
          '(id TEXT PRIMARY KEY, username TEXT, picture TEXT, pversion INTEGER)',
      )
    })
  }

  deleteUserTable() {
    console.log('deleting user table...')
    this.db.transaction((tx) => {
      tx.executeSql('DROP TABLE user')
    })
  }

  async insertUserAsync(user) {
    const transactionCode = (tx) => {
      let query =
        'INSERT OR REPLACE INTO USER (id, username, picture, pversion) VALUES(?, ?, ?, ?)'
      tx.executeSql(
        query,
        [user.id, user.username, user.picture, user.pversion],
        (tx, queryResult) => {
          if (queryResult.rowsAffected > 0) {
            console.log('Data inserted successfully')
          }
        },
        (tx, error) => {
          throw error
        },
      )
    }
    return await this.db.transactionPromise(transactionCode)
  }

  async isUserInDbAsync(id) {
    console.log('checking if user is in db... ')
    const db = this.db
    const transactionCode = (tx) => {
      let query = 'SELECT * FROM user WHERE id = ?'
      tx.executeSql(query, [id], (tx, queryResult) => {
        if (queryResult.rows.length > 0) {
          db.result = true
        } else {
          db.result = false
        }
      }),
        (tx, error) => {
          throw error
        }
    }
    return await this.db.transactionPromise(transactionCode)
  }

  async getUserPictureAsync(id) {
    console.log('getting user picture...')
    const db = this.db
    const transactionCode = (tx) => {
      let query = 'SELECT picture FROM user WHERE id = ?'
      tx.executeSql(query, [id], (tx, queryResult) => {
        if (queryResult.rows.length > 0) {
          db.result = queryResult.rows._array[0].picture
        }
      }),
        (tx, error) => {
          throw error
        }
    }
    return await this.db.transactionPromise(transactionCode)
  }

  async getPictureVersionAsync(id) {
    console.log('getting picture version...')
    const db = this.db
    const transactionCode = (tx) => {
      let query = 'SELECT pversion FROM user WHERE id = ?'
      tx.executeSql(query, [id], (tx, queryResult) => {
        if (queryResult.rows.length > 0) {
          db.result = queryResult.rows._array[0].pversion
        }
      }),
        (tx, error) => {
          throw error
        }
    }
    return await this.db.transactionPromise(transactionCode)
  }
}
