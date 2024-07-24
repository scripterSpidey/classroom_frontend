import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { store,persistor } from './store/store.ts'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { StyledEngineProvider } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import theme from './utils/themes.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {/* <BrowserRouter> */}
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          </Provider>
        {/* </BrowserRouter> */}
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
)
