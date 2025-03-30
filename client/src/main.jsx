import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import {Provider} from 'react-redux'
import { Provider } from 'react-redux'
import  {store, persistor}  from './store/store.js'
import {ToastContainer} from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'
createRoot(document.getElementById('root')).render(
  <StrictMode>
<Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
</Provider>
<ToastContainer position="top-right" autoClose={3000} />
  </StrictMode>,
)
