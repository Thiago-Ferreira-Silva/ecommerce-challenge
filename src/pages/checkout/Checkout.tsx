import '../../styles/pages/Checkout.scss'
import { ReactNode, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartItem } from "../../components/cartItem/CartItem";
import { CartContext } from "../../contexts/CartContext";
import { toast } from 'react-toastify';

type ItemType = {
    id: number
    name: string
    price: number
    image: string
    amount: number
}

const SHIP_ITEM_PRICE = 10
const FREE_SHIP_LIMIT = 250

export function Checkout() {

    const { cartItems, removeAll } = useContext(CartContext)
    const [items, setItems] = useState([] as Array<ReactNode>)
    const [subTotal, setSubTotal] = useState(0)
    const [shipping, setShipping] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {

        const itemsArray = Object.values(cartItems || {})

        const itemsJSX = itemsArray.map((item: ItemType) => { 
            return <CartItem {...item} key={item.id} />
        })
        setItems(itemsJSX)

        let sub = 0
        let cartLength = 0
        itemsArray.forEach(item => {
            sub = sub + item.price*item.amount
            cartLength += item.amount
        })

        const ship = sub > FREE_SHIP_LIMIT ? 0 : cartLength * SHIP_ITEM_PRICE

        setSubTotal(sub)
        setShipping(ship)
        setTotal(sub + ship)

    }, [cartItems])

    function buy() {
        removeAll()
        toast('Compra realizada com sucesso!', { autoClose: 1200 })
    }

    return (
        <div className="checkout-container">
            <header>
                <h1>
                    Loja de games
                </h1>
                <div className="link-to-home">
                    <Link className="link" to='/' >Voltar</Link>
                </div>
            </header>
            <section className="my-cart">Meu carrinho</section>
            <section className="items">
                <ul>
                    {items}
                </ul>
            </section>
            <section className="checkout">
                <div className="subtotal">Subtotal:
                    {subTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </div>
                <div className="shipping">Frete:
                    {shipping.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </div>
                <div className="total">Total:
                    {total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </div>
                <button className="buy" onClick={buy} disabled={items.length < 1}>Finalizar compra</button>
            </section>
        </div>
    )
}