import React from 'react';
import { Product } from './components/product/Product';
import './styles/App.scss';

function App() {
  return (
    <div className="App">
      <Product
        id={312}
        name={"Super Mario Odyssey"}
        price={197.88}
        score={100}
        image={"super-mario-odyssey.png"} />
    </div>
  );
}

export default App;
