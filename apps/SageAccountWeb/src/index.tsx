import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './routes'
import * as serviceWorker from './serviceWorker'

// KaTeX CSS is not included in the SRC style bundle since it includes many large font files.
import 'katex/dist/katex.css'

const container = document.getElementById('accountWebRoot')

const root = createRoot(container!)

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
