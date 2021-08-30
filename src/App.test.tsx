import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router'
import App from './App'

describe('Home', () => {

    let container = document.createElement('div')
    beforeEach(() => {
        document.body.appendChild(container)
    })

    afterEach(() => {
        unmountComponentAtNode(container)
        container.remove()
    })

    it('should render', () => {
        act(() => {
            render(
                <MemoryRouter>
                    <App />
                </MemoryRouter>,
                container
            )
        })
        
        expect(container.querySelector('.App')?.children.length).toBe(2)
    })
  })