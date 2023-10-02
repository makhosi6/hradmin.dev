import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home', () => {
    it('should have Employees link/text', () => {
        render(<Home/>);

        const myElem = screen.getByText('Employees');

        expect(myElem).toBeInTheDocument() // ASSERT
    })

    it('should have Departments link/text', () => {
        render(<Home/>);

        const myElem = screen.getByText(/departments/i);

        expect(myElem).toBeInTheDocument() // ASSERT
    })
 
})