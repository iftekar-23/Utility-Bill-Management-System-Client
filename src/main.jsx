import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import AuthProvider from './context/AuthProvider.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import router from './router/routes.jsx'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router}/>
        <Tooltip
          id="global-tooltip"
          place="top"
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            fontSize: "13px",
            borderRadius: "6px",
            padding: "6px 10px",
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)