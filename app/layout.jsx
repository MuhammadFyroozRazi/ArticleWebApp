
import '../styles/global.scss'

const RootLayout = ({children}) => {
  return (
   <html lang='en'>
        <body >
            <h1 className='title'> </h1>
            {/* hello world */}
            {children}
        </body>
   </html>
  )
}

export default RootLayout