import { createContext, ReactNode, useEffect, useState } from "react"

type CartItemType = {
    id: number
    name: string
    price: number
    image: string
    amount: number
}

type CartItemsType = {
    [index: number]: CartItemType
}

type CartContextType = {
    cartItems: CartItemsType
    addItem: (item: CartItemType) => void
    removeItem: (id: number) => void
    removeAll: () => void
}

type CartContextProviderProps = {
    children: ReactNode
}

export const CartContext = createContext({} as CartContextType)

export function CartContextProvider(props: CartContextProviderProps) {

    const [cartItems, setCartItems] = useState({} as CartItemsType)

    useEffect(() => {
        const items = JSON.stringify(localStorage.getItem('ecommerce-challenge-cart') || '{}')

        setCartItems(JSON.parse(JSON.parse(items)))
    }, [])

    function addItem(item: CartItemType) {
        const items = cartItems
        if(items[item.id]) item.amount = items[item.id].amount + 1
        items[item.id] = item
        setCartItems(items)
        localStorage.setItem('ecommerce-challenge-cart', JSON.stringify(items))
    }

    function removeItem(id: number) {
        const items = cartItems
        delete items[id]
        setCartItems(items)
        localStorage.setItem('ecommerce-challenge-cart', JSON.stringify(items))
    }

    function removeAll() {
        localStorage.removeItem('ecommerce-challenge-cart')
        setCartItems({})
    }

    return (
        <CartContext.Provider value={{ cartItems, addItem, removeItem, removeAll}} >
            {props.children}
        </CartContext.Provider>
    )
}