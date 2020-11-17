import React, { Component } from 'react'

class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: ""
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    alert('hey, ' + this.state.username)
  }

  handleChange(e) {
    e.preventDefault()
    let s = {}
    s[e.target.name] = e.target.value
    this.setState(s)
  }

  render() {
    return (
      <div className={'LoginForm'}>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type={'text'} name={'username'} id={'username'} placeholder={'Username'} onChange={this.handleChange.bind(this)} value={this.state.username} />
          <input type={'password'} name={'password'} id={'password'} placeholder={'Password'} onChange={this.handleChange.bind(this)} value={this.state.password} />
          <button type={'Submit'}>Log In</button>
        </form>
      </div>
    )
  }
}

export default LoginForm
