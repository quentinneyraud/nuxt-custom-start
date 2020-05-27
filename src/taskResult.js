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
    log () {
      console.log(this.metas.name)
      console.log(this.metas.description)

      this.errors.forEach(error => console.error(error))
    }
  }
)
