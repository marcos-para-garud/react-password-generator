import { useState , useCallback , useEffect , useRef} from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  let [length, setLength] = useState(8)
  let [numberAllowed, setNumberAllowed] = useState(false)
  let [charAllowed, setCharAllowed] = useState(false)
  let [password, setPassword] = useState("")
  let passwordRef = useRef(null);
  let passwordGenerator = useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="0123456789";
    if(charAllowed) str+="!@#$%^&*()_+'";
    for(let i=1; i<=length; i++)
      {
        let char = Math.floor(Math.random()*str.length+1)
        pass += str.charAt(char);
      }
      console.log("Generated password:", pass);
      setPassword(pass);

  } , [length , numberAllowed , charAllowed , setPassword])
 
  let copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  } , [password])
  useEffect(() => {
    console.log("Effect triggered");
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-8 my-8 text-orange-700 bg-gray-700 '>
      <h1 className='text-white text-center'>Password Generator</h1>
      <div className='flex shadow-rose rounded-lg overflow-hidden pb-4 mb-4'>
        <input 
        type='text'
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        ></input>
        <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-500 px-3 py-0.5 hover:bg-gray-50 '>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
           type="range"
           min={5}
           max={100}
           value={length} 
           className='cursor-pointer'
           onChange={(e)=>{
            setLength(e.target.value)
           }}/>
           
           <label>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox' 
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={()=>{
            setNumberAllowed((prev)=>!prev)
          }}></input>
          <label>numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox' 
          defaultChecked={charAllowed}
          id='charInput'
          onChange={()=>{
            setCharAllowed((prev)=>!prev)
          }}></input>
          <label>characters</label>
        </div>
      </div>
    </div>
     
       
    </>
  )
}

export default App
