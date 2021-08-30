import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
        <ToastContainer />
      </div>
    </BrowserRouter>
  )
}

export default App;
