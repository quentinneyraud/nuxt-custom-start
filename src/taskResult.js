/* eslint-disable no-console */
module.exports = _ => Object.assign({},
  {
    metas: {
      name: '',
      description: '',
      id: ''
    },
    errors: [],
    addError (errorMessage) {
      this.errors.push(errorMessage)
    },
    addMetas ({ name, description, id }) {
      this.metas.name = name
      this.metas.description = description
      this.metas.id = id
    },
    hasErrors () {
      return this.errors.length > 0
    }
  }
)
