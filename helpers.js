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

export function useToggle(initialVal = false) {
    // call useState, "reserve piece of state"
    const [state, setState] = useState(initialVal);
    const toggle = () => {
      setState(!state);
    };
    // return piece of state AND a function to toggle it
    return [state, toggle];
  }

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