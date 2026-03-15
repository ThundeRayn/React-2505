import { useState } from 'react'
import './CatSalary.css'
import WorkCat from '../components/WorkCat'

const CatSalary = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
        <h1>2505 Forever</h1>
        <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
                小时时薪 + {count}
            </button>
            <p>
                点击加薪，助力尾尾变得机智
            </p>
            <p>
                所以到底聪明了没有啊
            </p>

        </div>

        <WorkCat count={count} />

        <p className="read-the-docs">
            世袭制才情，传女不传男
        </p>
    </div>
  )
}

export default CatSalary