import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLanguages, translateText } from "./reudx/actions/translateActions"
import Select from 'react-select'
import { setAnswer } from "./reudx/slices/textSlice"


const App = () => {

const dispatch =useDispatch()

const translateSlice = useSelector((store)=> store.translateSlice)
const textSlice= useSelector((store)=>store.textSlice)

const [text, setText] =useState("")
const [sourceLang, setSourceLang]= useState({
  value: 'tr',
  label: 'Turkish',
})
const [targetLang, setTargetLang]= useState({
  value: 'en',
  label: 'English',
})



useEffect(()=>{
dispatch(getLanguages())
},[])

const data = useMemo(() => 
translateSlice.languages.map((i)=>({
  value:i.code,
  label:i.name,
})),[translateSlice.languages]) 

const handleSwap = ()=>{
  setSourceLang(targetLang)
  setTargetLang(sourceLang)

setText(textSlice.answer)
dispatch(setAnswer(text))
}

  return (
    <div id="main-page">

       <div className="container">
          <h1>Çeviri+</h1>

             <div className="upper">
   <Select 
   isLoading={translateSlice.isLoading} 
   isDisabled={translateSlice.isLoading}
   value={sourceLang} 
   onChange={setSourceLang} 
   className="select" 
   options={data}/>
    <button onClick={handleSwap}>Değiş</button>
    <Select 
    isLoading={translateSlice.isLoading} 
    isDisabled={translateSlice.isLoading}
    value={targetLang} 
    onChange={setTargetLang} 
    className="select"
     options={data}/>

             </div>

            <div className="middle">
    <div>
      <textarea value={text} onChange={(e)=> setText(e.target.value)}/>
    </div>
    <div>
      <textarea disabled value={textSlice.answer} />
      {textSlice.isLoading && (<div className="wrapper">
                <div className="typewriter">
                  <div className="slide">
                    <i></i>
                  </div>
                  <div className="paper"></div>
                  <div className="keyboard"></div>
                </div>
              </div>)}
    </div>
            </div>

            <button onClick={()=>dispatch(translateText({text,sourceLang,targetLang}))}>Çevir</button>

      </div>

    </div>
  )
}

export default App