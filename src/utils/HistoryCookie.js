import Cookies from 'js-cookie'

const HISTORY_COOKIE_NAME = 'refsheet.admin.history'

const HistoryCookie = {
  getUsers() {
    return this.get('users')
  },

  addUser(id) {
    this.add('users', id)
  },

  getCharacters() {
    return this.get('characters')
  },

  addCharacter(id) {
    this.add('characters', id)
  },

  add(key, id) {
    const list = [id, ...this.get(key)]

    // Filter out duplicate values
    const filtered = list.filter((id, i) => list.indexOf(id) === i)

    // Copy in existing data
    let cookieData = { ...this.getData() }

    // Limit to 100 users
    cookieData[key] = filtered.slice(0, 100)

    Cookies.set(HISTORY_COOKIE_NAME, JSON.stringify(cookieData))
  },

  getData() {
    const cookieData = Cookies.get(HISTORY_COOKIE_NAME)
    let data = {}

    try {
      data = JSON.parse(cookieData) || {}
    } catch (e) {
      console.warn('Error parsing cookie data:', cookieData, e)
    }

    return data
  },

  get(key) {
    return this.getData()[key] || []
  },
}

export default HistoryCookie
