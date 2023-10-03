import React from 'react';
import { render } from '@testing-library/react';
import Signup from './Signup'

describe('Signup page', () => {
    it('should render the component onto the screen', () => {
        const view = render(<Signup/>);
        expect(view).toBeTruthy();
    })
})