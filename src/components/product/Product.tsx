
type ProductProps = {
    id: number
    name: string
    price: number
    score: number
    image: string
}

export function Product({ id, name, price, score, image } : ProductProps) {

    function addToCart() {

    }

    return (
        <div className="product-container">
            <div className="image">
                <img src={`/assets/${image}`} alt={name} />
            </div>
            <div className="name">
                {name}
            </div>
            <div className="price">
                {price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
            </div>
            <div className="score">
                {score}
            </div>
            <div className="add-to-cart">
                <button onClick={addToCart}>Adicionar ao carrinho</button>
            </div>
        </div>
    )
}