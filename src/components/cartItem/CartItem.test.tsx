import { fireEvent } from '@testing-library/react'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { CartContext } from '../../contexts/CartContext'
import { CartItem } from './CartItem'

describe('Cart item', () => {

    let container = document.createElement('div')
    beforeEach(() => {
        document.body.appendChild(container)
        Object.defineProperty(window, "location", {
            value: {
               reload: jest.fn()
            },
            writable: true
        })
    })

    afterEach(() => {
        unmountComponentAtNode(container)
        container.remove()
    })

    const itemData = {
        id: 312,
        name: "Super Mario Odyssey",
        price: 197.88,
        image: "super-mario-odyssey.png"
    }

    const cartItems = [{
        id: 312,
        name: "Super Mario Odyssey",
        price: 197.88,
        image: "super-mario-odyssey.png"
    },
    {
        id: 201,
        name: "Call Of Duty Infinite Warfare",
        price: 49.99,
        image: "call-of-duty-infinite-warfare.png"
    },
    {
        id: 102,
        name: "The Witcher III Wild Hunt",
        price: 119.5,
        image: "the-witcher-iii-wild-hunt.png"
    }]

    const removeAll = jest.fn()
    const removeItem = jest.fn()
    const addItem = jest.fn()

    it('should render data from props', () => {
        act(() => {
            render(
                <CartItem {...itemData} />,
                container
            )
        })

        expect(container.querySelector('.name')?.textContent).toBe(itemData.name)
        expect(container.querySelector('.price')?.textContent)
            .toBe(itemData.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
        expect(container.querySelector('img'))
            .toBeInTheDocument()
        expect(container.querySelector('button'))
            .toBeInTheDocument()
    })

    it('should remove itself', () => {
        act(() => {
            render(
                <><CartContext.Provider value={{ addItem, removeItem, removeAll, cartItems }}>
                    <CartItem {...itemData} />
                </CartContext.Provider></>,
                container
            )
        })

        const removeButton = container.querySelector('button') || document.createElement('button')

        act(() => {
            fireEvent.click(removeButton)
        })

        expect(removeItem).toHaveBeenCalledTimes(1)
    })
})