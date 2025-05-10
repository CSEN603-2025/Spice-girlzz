import React from 'react'

function SideBarCompany() {
    const SideBarCompany = [
        {
        title : "My Internship Posts",
        link : "/company/posts" ,
        },
    
        {
            title : "Applications",
            link : "/company/applicants",
        },

        {
            title : "Interns",
            link : "/company/interns",
        },
        {
          title : "Evaluations",
          link : "/company/evaluate",
      },
    ];
  return (
    <div className='sidebar'>
      <ul className='SideBarList'>
      {SideBarCompany.map((val, key)=>
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
export default SideBarCompany;


 


