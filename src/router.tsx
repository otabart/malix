import { createBrowserRouter } from "react-router-dom"

import Tokenize from './components/Tokenize'
import MarketPlace from './components/MarketPlace'
import ViewIps from './components/ViewIps'
import TxnHistory from './components/TxnHistory'
import App from "./App"

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <div>404 Not Found</div>
    },
    {
      path: "/tokenize",
      element: <Tokenize />
    },
    {
      path: "/marketplace",
      element: <MarketPlace />
    },
    {
      path: "/viewIp",
      element: <ViewIps />
    },
    {
      path: "/history",
      element: <TxnHistory />
    }
    
  ])