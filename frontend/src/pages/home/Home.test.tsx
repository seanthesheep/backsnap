import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

describe('Home page', () => {
    it('should render the component onto the screen', () => {
        const view = render(<Home/>);
        expect(view).toBeTruthy();
    })
})