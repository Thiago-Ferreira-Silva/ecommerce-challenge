import '../../styles/components/CartItem.scss'
import { useContext } from "react"
import { CartContext } from "../../contexts/CartContext"

type CartItemProps = {
    id: number
    name: string
    price: number
    image: string
}

export function CartItem({ id, name, price, image }: CartItemProps) {

    const { removeItem } = useContext(CartContext)

    function remove() {
        removeItem(id)
    }

    return (
        <div className="cart-item-container">
            <div className="image">
                <img src={`/assets/${image}`} alt={name} />
            </div>
            <div className="name">
                {name}
            </div>
            <section>
                <div className="price">
                    {price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </div>
                <div className="remove">
                    <button onClick={remove}>Remover</button>
                </div>
            </section>
        </div>
    )
}