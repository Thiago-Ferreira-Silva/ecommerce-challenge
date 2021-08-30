import { fireEvent } from '@testing-library/react'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router'
import { Home } from './Home'

describe('Home', () => {

    let container = document.createElement('div')
    beforeEach(() => {
        document.body.appendChild(container)
    })

    afterEach(() => {
        unmountComponentAtNode(container)
        container.remove()
    })

    it('should render products', () => {
        act(() => {
            render(
                <MemoryRouter>
                    <Home />
                </MemoryRouter>,
                container
            )
        })

        expect(container.querySelector('ul')?.children.length).toBe(9)
    })

    it('should sort products', () => {
        act(() => {
            render(
                <MemoryRouter>
                    <Home />
                </MemoryRouter>,
                container
            )
        })

        const button = container.querySelector('button') || document.createElement('button')

        expect(container.querySelector('span')?.innerHTML).toContain('nome')

        expect(container.querySelector('ul')?.firstChild?.textContent).toContain('Call Of Duty Infinite Warfare')

        act(() => {
            fireEvent.click(button)
        })

        expect(container.querySelector('span')?.innerHTML).toContain('preço')

        expect(container.querySelector('ul')?.firstChild?.textContent).toContain('Call Of Duty Infinite Warfare')

        act(() => {
            fireEvent.click(button)
        })

        expect(container.querySelector('span')?.innerHTML).toContain('score')
        
        expect(container.querySelector('ul')?.firstChild?.textContent).toContain('Shards of Darkness')

        act(() => {
            fireEvent.click(button)
        })

        expect(container.querySelector('span')?.innerHTML).toContain('nome')

        expect(container.querySelector('ul')?.firstChild?.textContent).toContain('Call Of Duty Infinite Warfare')

        expect(container.querySelector('ul')?.children.length).toBe(9)
    })

    it('should search products', () => {
        act(() => {
            render(
                <MemoryRouter>
                    <Home />
                </MemoryRouter>,
                container
            )
        })

        const input = container.querySelector('input') || document.createElement('input')

        expect(container.querySelector('ul')?.children.length).toBe(9)

        act(() => {
            fireEvent.change(input, { target: { value: 'Shards of Darkness'} })
        })

        expect(container.querySelector('ul')?.children.length).toBe(1)

        act(() => {
            fireEvent.change(input, { target: { value: 'Call'} })
        })

        expect(container.querySelector('ul')?.children.length).toBe(2)

        act(() => {
            fireEvent.change(input, { target: { value: 'bgfdfsdfd'} })
        })

        expect(container.querySelector('ul')?.children.length).toBe(0)
    })
})