import '../../styles/components/Product.scss'
import { useContext } from "react"
import { CartContext } from "../../contexts/CartContext"

type ProductProps = {
    id: number
    name: string
    price: number
    score: number
    image: string
}

export function Product({ id, name, price, score, image }: ProductProps) {

    const { addItem } = useContext(CartContext)

    function addToCart() {
        addItem({ id, name, price, image })
        alert('Adicionado com sucesso!')
    }

    return (
        <div className="product-container">
            <div className="image">
                <img src={`/assets/${image}`} alt={name} />
            </div>
            <section>
                <div className="price">
                    {price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </div>
                <div className="score">
                score <span>{score}</span>
                </div>
            </section>
            <div className="name">
                {name}
            </div>
            <div className="add-to-cart">
                <button onClick={addToCart}>Adicionar ao carrinho</button>
            </div>
        </div>
    )
}