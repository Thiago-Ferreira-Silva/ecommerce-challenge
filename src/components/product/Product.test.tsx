import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
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
            .toBe(productData.score.toString())
        expect(container.querySelector('img'))
            .toBeInTheDocument()
        expect(container.querySelector('button'))
            .toBeInTheDocument()

    })
})