import { ReactNode, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import productsJSON from '../../data/products.json'
import { Product } from '../../components/product/Product'

type Products = ReactNode[]

export function Home() {

    const orderOptions = ['nome', 'preço', 'score']

    const [products, setProducts] = useState([] as Products)
    const [orderIndex, setOrderIndex] = useState(0)

    useEffect(() => {

        function getOrderRule() {
            switch(orderIndex) {
                case 0:
                    return 'name'
                case 1:
                    return 'price'
                case 2:
                    return 'score'
                default:
                    return 'name'
            }
        }

        const orderRule = getOrderRule()

        productsJSON.sort((a, b) => {
            if (a[orderRule] > b[orderRule]) {
                return 1
            } else if (a[orderRule] < b[orderRule]) {
                return -1
            } else {
                return 0
            }
        })

        const productsJSX = productsJSON.map(product => <Product {...product} key={product.id} />)
        setProducts(productsJSX)
    }, [orderIndex])

    function handleSort() {
        orderIndex < 2 ? setOrderIndex(orderIndex + 1) : setOrderIndex(0)
    }

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
                <button onClick={handleSort}>
                    <img src="/assets/arrow-down-icon.svg" alt="Ordenar" />
                    <span>Ordenar por {orderOptions[orderIndex]}</span>
                </button>
            </div>
            <section className="products">
                {products}
            </section>
        </div>
    )
}