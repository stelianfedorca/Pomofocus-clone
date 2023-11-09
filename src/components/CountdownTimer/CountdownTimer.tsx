
import { useEffect, useRef, useState } from 'react'
import './CountdownTimer.css'

export function CountdownTimer() {
  let initialCount = new Date(0, 0, 0, 0, 10); 
  const [timeRemaining, setTimeRemaining] = useState(initialCount);
  const intervalId = useRef<number | null>(null);

  useEffect(() => {
  
    // clean up function for clearing the interval 
    return () => {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current)
      }
    }
  }, [])

  function formatDate(date: Date): string {
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const paddedSeconds = seconds.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}`;
  }

  function startCountdown() {
    if (intervalId.current) return ;

    intervalId.current = window.setInterval(() => {
      setTimeRemaining(prevTimeRemaining => new Date(prevTimeRemaining.getTime() - 1000))
    }, 1000);
  }

  function stopCountdown() {
    if (intervalId.current === null) return;

    clearInterval(intervalId.current);
    intervalId.current = null;
  }

  function resetCounter() {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
    }

    setTimeRemaining(initialCount);
  }

  return (
    <div className="counter-container">
      <div className='counter-content'>
        <div className='timer'>
          <h1>{formatDate(timeRemaining)}</h1>
        </div>
        <div className='buttons-container'>
          <button className='button' onClick={startCountdown}>Start</button>
          <button className='button' onClick={stopCountdown}>Stop</button>
          <button className='button' onClick={resetCounter}>Reset</button>
        </div>
      </div>
    </div>
    )
}