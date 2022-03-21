import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {AuthContextProvider} from './store/auth-context';
import {ErrorBoundary} from 'react-error-boundary'

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
    <BrowserRouter>
      <ErrorBoundary
      fallbackRender =  {({error, resetErrorBoundary}) => (
          <div>
          <h1>An error occurred: {error.message}</h1>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      )}
    >
       <App />
    </ErrorBoundary>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
