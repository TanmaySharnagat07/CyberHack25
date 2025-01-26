import { useState } from 'react'
import './App.css'
import VideoUpload from './components/VideoUpload'
import FactCheckWidget from './components/FactCheckWidget'

import ImageDetect from './components/ImageDetect'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <VideoUpload/> */}
    {/* <FactCheckWidget/> */}
    <ImageDetect/>
    </>
  )
}

export default App
