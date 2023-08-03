'use client'

import '../styles/global.scss'
import { ReduxProvider } from '@redux/provider'

const RootLayout = ({children}) => {
  
  
  return (
   <html lang='en'>
        <body >
          <h1 className='title'></h1>
          
            {/* hello world */}
            <ReduxProvider>
              {children}
            </ReduxProvider>
        </body>
   </html>
  )
}

export default RootLayout