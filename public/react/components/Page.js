import React from 'react';

export const Page = (props) => {
  console.log(props)
  return <>
    <h3 id={props.page.id}><button onClick={() => props.fetchOnePage(props.page.slug)}>{props.page.title}</button></h3>
  </>
} 
	