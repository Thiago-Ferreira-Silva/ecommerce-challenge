import { Link } from "react-router-dom";
import { CartItem } from "../../components/cartItem/CartItem";

const itemData = {
    id: 312,
    name: "Super Mario Odyssey",
    price: 197.88,
    image: "super-mario-odyssey.png"
}

export function Checkout() {

    function buy() {
        alert('Compra realizada com sucesso!')
    }

    return (
        <div className="checkout-container">
            <header>
                <h1>
                    Loja de games
                </h1>
                <div className="link-to-home">
                    <Link to='/' >Voltar</Link>
                </div>
            </header>
            <section>Meu carrinho</section>
            <section className="items">
                <CartItem {...itemData} />
            </section>
            <section className="checkout">
                <div className="subtotal">Subtotal: {}</div>
                <div className="shipping">Frete: {}</div>
                <div className="total">Total: {}</div>
                <button className="buy" onClick={buy}>Finalizar compra</button>
            </section>
        </div>
    )
}