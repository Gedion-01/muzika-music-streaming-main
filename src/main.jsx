import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
//
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Auth0ProviderWithNavigate } from './auth/authProvider.jsx'

const queryClinet = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Auth0ProviderWithNavigate>
    <QueryClientProvider client={queryClinet}>
      <App />
    </QueryClientProvider>
    </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>,
)
