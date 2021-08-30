import { fireEvent } from '@testing-library/react'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { CartContext } from '../../contexts/CartContext'
import { Product } from './Product'

describe('Product', () => {

    let container = document.createElement('div')
    beforeEach(() => {
        document.body.appendChild(container)
    })

    afterEach(() => {
        unmountComponentAtNode(container)
        container.remove()
    })

    const productData = {
        id: 312,
        name: "Super Mario Odyssey",
        price: 197.88,
        score: 100,
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

    it('should render the data from props', () => {
        act(() => {
            render(
                <Product {...productData} />,
                container,
            )
        })

        expect(container.querySelector('.name')?.textContent)
            .toBe(productData.name)
        expect(container.querySelector('.price')?.textContent)
            .toBe(productData.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
        expect(container.querySelector('.score')?.textContent)
            .toContain(productData.score.toString())
        expect(container.querySelector('img'))
            .toBeInTheDocument()
        expect(container.querySelector('button'))
            .toBeInTheDocument()

    })

    it('should add to cart', () => {

        act(() => {
            render(
                <CartContext.Provider value={{ removeAll, removeItem, addItem, cartItems }}>
                    <Product {...productData} />
                </CartContext.Provider>,
                container,
            )
        })

        const button = container.querySelector('button') || document.createElement('button')

        act(() => {
            fireEvent.click(button)
        })

        expect(addItem).toHaveBeenCalledTimes(1)
    })
})