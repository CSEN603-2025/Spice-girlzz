import React from 'react'
import { SideBarStudent } from './SideBarStudent'

function SideBar() {
  return (
    <div className='sidebar'>
      <ul className='SideBarList'>
      {SideBarStudent.map((val, key)=>
    {
      return <li key={key}
      className='row'
      id = {window.location.pathname == val.link ? "active" : ""}
       onClick={()=>{window.location.pathname=val.link}}>
        <div id='title'>
        {val.title}
        </div></li>
      
    })}</ul></div>
  )
}

export default SideBar;

// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
// import { SideBarStudent } from './SideBarStudent';

// function SideBar() {
//   const navigate = useNavigate(); // Initialize useNavigate

//   return (
//     <div className='sidebar'>
//       <ul className='SideBarList'>
//         {SideBarStudent.map((val, key) => {
//           return (
//             <li
//               key={key}
//               className='row'
//               id={window.location.pathname === val.link ? 'active' : ''}
//               onClick={() => navigate(val.link)} // Use navigate instead of window.location
//             >
//               <div id='title'>
//                 {val.title}
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// export default SideBar;

