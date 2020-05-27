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
    get hasErrors () {
      return this.errors.length > 0
    },
    log () {
      console.log()
      console.log(this.metas.name)
      console.log(this.metas.description)
      console.log()

      if (this.hasErrors) {
        console.error('ERRORS :')
        this.errors.forEach(error => console.error(`- ${error}`))
      }
    }
  }
)
