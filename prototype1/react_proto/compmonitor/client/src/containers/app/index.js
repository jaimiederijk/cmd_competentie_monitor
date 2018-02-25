import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Forms from '../forms'
import EditForm from '../editform'

const App = () => (
  <div>
    <header>
      <h1>CMD monitor</h1>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
      <Link to="/forms">Forms</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/forms" component={Forms} />
      <Route path="/editform/:id" component={EditForm} />
      <Route exact path="/about-us" component={About} />
    </main>
  </div>
)

export default App
