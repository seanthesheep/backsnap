import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login'

describe('Login page', () => {
    it('should render the component onto the screen', () => {
        const view = render(<Login/>);
        expect(view).toBeTruthy();
    })
})