import { fireEvent } from '@testing-library/react'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router'
import { CartContext } from '../../contexts/CartContext'
import { Checkout } from './Checkout'

describe('Checkout', () => {

    let container = document.createElement('div')
    beforeEach(() => {
        document.body.appendChild(container)
    })

    afterEach(() => {
        unmountComponentAtNode(container)
        container.remove()
    })

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

    it('should render products', () => {
        const removeAll = jest.fn()
        const removeItem = jest.fn()
        const addItem = jest.fn()

        act(() => {
            render(
                <MemoryRouter>
                    <CartContext.Provider value={{ removeAll, removeItem, addItem, cartItems }}>
                        <Checkout />
                    </CartContext.Provider>
                </MemoryRouter>,
                container
            )
        })

        expect(container.querySelector('ul')?.children.length).toBe(3)
    })

    it('should buy', () => {
        act(() => {
            render(
                <MemoryRouter>
                    <CartContext.Provider value={{ removeAll, removeItem, addItem, cartItems }}>
                        <Checkout />
                    </CartContext.Provider>
                </MemoryRouter>,
                container
            )
        })

        const button = container.querySelector('.buy') || document.createElement('button')

        expect(container.querySelector('ul')?.children.length).toBe(3)

        act(() => {
            fireEvent.click(button)
        })

        expect(removeAll).toBeCalledTimes(1)
    })

    it('should render subtotal, shipping and total', () => {
        act(() => {
            render(
                <MemoryRouter>
                    <CartContext.Provider value={{ removeAll, removeItem, addItem, cartItems }}>
                        <Checkout />
                    </CartContext.Provider>
                </MemoryRouter>,
                container
            )
        })

        expect(container.querySelector('.subtotal')?.innerHTML).toContain('367,37')
        expect(container.querySelector('.shipping')?.innerHTML).toContain('0,00')
        expect(container.querySelector('.total')?.innerHTML).toContain('367,37')

    })
})