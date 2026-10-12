import { useState } from 'react';

// A stand-in "project": the simplest possible interactive component.
// useState gives the component memory that survives re-renders.
export default function Demo() {
  const [count, setCount] = useState(0);
  return (
    <button type="button" onClick={() => setCount((c) => c + 1)}>
      Clicked {count} {count === 1 ? 'time' : 'times'}
    </button>
  );
}
