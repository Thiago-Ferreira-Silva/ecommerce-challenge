import { ReactNode, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import productsJSON from '../../data/products.json'
import { Product } from '../../components/product/Product'

type Products = ReactNode[]

export function Home() {

    const [products, setProducts] = useState([] as Products)

    useEffect(() => {
        const productsJSX = productsJSON.map(product => <Product {...product} key={product.id} />)
        setProducts(productsJSX)
    }, [])

    return (
        <div className="home-container">
            <header>
                <h1 className="name">
                    Loja de games
                </h1>
                <div className="search">
                    <input type="text" placeholder="Buscar jogo" />
                </div>
                <div className="link-to-cart">
                    <Link to='/checkout'>
                        <img src="/assets/cart-icon.svg" alt="Carrinho" />
                    </Link>
                </div>
            </header>
            <div className="order-by">
                <button>
                    <img src="/assets/arrow-down-icon.svg" alt="Ordenar" />
                    <span>Ordenar por {}</span>
                </button>
            </div>
            <section className="products">
                {products}
            </section>
        </div>
    )
}