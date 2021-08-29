import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from './pages/home/Home'
import { Checkout } from './pages/checkout/Checkout'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/checkout" component={Checkout} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
