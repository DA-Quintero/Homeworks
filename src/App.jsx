import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementBy } from './store/counterSlice'
import { push, pop, clear } from './store/stackSlice'
import './App.css'

function App() {
  const [incrementValue, setIncrementValue] = useState('')
  const [stackValue, setStackValue] = useState('')
  
  const count = useSelector((state) => state.counter.value)
  const stack = useSelector((state) => state.stack.items)
  const dispatch = useDispatch()

  const handleIncrementBy = () => {
    const value = parseInt(incrementValue)
    if (!isNaN(value)) {
      dispatch(incrementBy(value))
      setIncrementValue('')
    } else {
      alert('Please enter a valid number')
    }
  }

  const handlePush = () => {
    if (stackValue.trim() !== '') {
      dispatch(push(stackValue))
      setStackValue('')
    } else {
      alert('Please enter a value to push')
    }
  }

  const handlePop = () => {
    if (stack.length > 0) {
      dispatch(pop())
    } else {
      alert('Stack is empty')
    }
  }

  const getTopItem = () => {
    return stack.length > 0 ? stack[stack.length - 1] : 'Empty'
  }

  return (
    <>
      <div className="card">
        <h2>Counter: {count}</h2>
        <div>
          <button onClick={() => dispatch(increment())}>
            Increment
          </button>
          <button onClick={() => dispatch(decrement())}>
            Decrement
          </button>
        </div>
        
        <div style={{ marginTop: '10px' }}>
          <input
            type="number"
            value={incrementValue}
            onChange={(e) => setIncrementValue(e.target.value)}
            placeholder="Enter value to increment by"
          />
          <button onClick={handleIncrementBy}>
            Increment By
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Stack</h2>
        <div>
          <input
            type="text"
            value={stackValue}
            onChange={(e) => setStackValue(e.target.value)}
            placeholder="Enter value to push"
          />
          <button onClick={handlePush}>Push</button>
          <button onClick={handlePop}>Pop</button>
          <button onClick={() => dispatch(clear())}>Clear</button>
        </div>
        
        <div style={{ marginTop: '10px' }}>
          <p><strong>Peek:</strong> {getTopItem()}</p>
          <p><strong>Stack size:</strong> {stack.length}</p>
        </div>
        
        <div style={{ marginTop: '10px' }}>
          <h3>Stack content:</h3>
          <ul>
            {stack.slice().reverse().map((item, index) => (
              <li key={stack.length - 1 - index}>
                {item} {index === 0 ? '' : ''}
              </li>
            ))}
          </ul>
          {stack.length === 0 && <p>Stack is empty</p>}
        </div>
      </div>
    </>
  )
}

export default App
