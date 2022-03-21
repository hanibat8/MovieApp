import {render,screen,cleanup} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Login from './Login.tsx';

afterEach(cleanup);

test('on initial render login button is disabled',async ()=>{
    render(<BrowserRouter><Login/></BrowserRouter>);

   expect(await screen.findByRole('button',{name:/submit/i})).toBeEnabled();
})