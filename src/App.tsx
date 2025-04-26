import { useState } from 'react';
import './App.css'
import WorkCat from './components/WorkCat'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <h1>2505 Forever</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          小时时薪 + {count}
        </button>
        <p>
          点击加薪，自己的工资自己努力争取
        </p>
      
      </div>
        
       <WorkCat count={count}/>

      <p className="read-the-docs">
        世袭制才情，传女不传男
      </p>
    </>
  )
}

export default App
