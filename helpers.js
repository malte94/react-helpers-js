import {useState, useRef, useCallback, useEffect} from 'react';

export function useStateCallback(initialState) {
    const [state, setState] = useState(initialState);
    const cbRef = useRef(null); // init mutable ref container for callbacks
  
    const setStateCallback = useCallback((state, cb) => {
      cbRef.current = cb; // store current, passed callback in ref
      setState(state);
    }, []); // keep object reference stable, exactly like `useState`
  
    useEffect(() => {
      // cb.current is `null` on initial render, 
      // so we only invoke callback on state *updates*
      if (cbRef.current) {
        cbRef.current(state);
        cbRef.current = null; // reset callback after execution
      }
    }, [state]);
  
    return [state, setStateCallback];
  }

/* Usage:

import {useStateCallback as state} from './helpers.js';
import './App.css';

export default function App() {

  const [count, setCount] = state(0);

  const handleClick = () => {
    setCount(count + 1, count => {
      if (count > 5) {
        console.log('Over 5');
      }
      console.log(count);
    });
  };

  return (
    <div className="App">
      Count: {count}
      <button onClick={handleClick}>Increase</button>
    </div>
  );
}

###############################################################################

*/

export function useToggle(initialVal = false) {
    // call useState, "reserve piece of state"
    const [state, setState] = useState(initialVal);
    const toggle = () => {
      setState(!state);
    };
    // return piece of state AND a function to toggle it
    return [state, toggle];
  }

/* Usage: 

import useToggle from "./hooks/useToggle";

export default function Toggler() {
  const [isHappy, toggleIsHappy] = useToggle(true);
  const [isHeartbroken, toggleIsHeartbroken] = useToggle(false);
  const [isBanana, toggleIsBanana] = useToggle(true);
  return (
    <div>
      <h1 onClick={toggleIsHappy}>{isHappy ? "😄" : "😢"}</h1>
      <h1 onClick={toggleIsHeartbroken}>{isHeartbroken ? "💔" : "❤️"}</h1>
      <h1 onClick={toggleIsBanana}>{isBanana ? "🍌" : "🍏"}</h1>
    </div>
  );
}

###############################################################################

*/

export function useFormInput(initialVal) {
    const [value, setValue] = useState(initialVal);
    const handleChange = e => {
        setValue(e.target.value);
    };
    const reset = () => {
        setValue("");
    };
    return [value, handleChange, reset];
};

/* Usage:

export default function SimpleFormInputHook() {
  const [email, updateEmail, resetEmail] = useInputState("");
  const [password, updatePassword, resetPassword] = useInputState("");
  return (
    <div>
      <h1>
        Email is: {email} & Password is: {password}
      </h1>
      <input type='text' value={email} onChange={updateEmail} />
      <input type='text' value={password} onChange={updatePassword} />
      <button onClick={resetEmail}>Reset Email</button>
      <button onClick={resetPassword}>Reset Password</button>
    </div>
  );
}

###############################################################################

*/