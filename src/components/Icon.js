// import ReactDOM from "react-dom/client";
import { useState } from "react";
import Basic from "./testcontents";
import globerevolution from '../assets/globe-revolution.gif'
import './Icon.css';

const Button = () => {
  const [Icon, setIcon] = useState(false)


  const handleopen = () => {
    if(Icon==false){
      setIcon(true)
    }
    else{
        setIcon(false)
    }
  }

  return (
      <>
          <div className="hd-hdr">
              {/* <button id="talky"className={Icon ?"hd-btn":"hd-btn-inactive"} onClick={handleopen}>Talky</button> */}
              <img classname='hd-img' style={{width:'100px',cursor:'pointer'}} src ={globerevolution}onClick={handleopen}></img>
          </div>
          {Icon ?
            //    <Contents /> : ''
            <Basic /> : ''

          }
      </>
  )


}
export default Button;

//   import { useState } from "react";
// import ReactDOM from "react-dom/client";

// function ChatIcon() {
//   const [Icon, setIcon] = useState("true");

//   const handleClick = (e) => {
//     e.preventDefault()
//     if(e.target.value) {
//         setIcon(!Icon)
//     }
//     setIcon(!Icon)
// }

//   return (
//     <>
//      <button className = 'active-select-option'
//                onClick = {handleClick}>Chat</button>
//                {Icon ?                                                
//             <div className = "select-option">
//                <ul id = 'action1' className = "select-option-inner rounded">
                 
//                  <li>Buy More</li>
                 
//                  <li>Sell </li> 
                
//                  <li>Next Li Tag</li> 
//                  <li>Edit Detials</li>
//                 </ul> 
//                 </div> :  ' ' }
//     </>
//   )
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<ChatIcon />);

// export default ChatIcon;