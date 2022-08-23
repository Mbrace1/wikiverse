import React from 'react';

export const Page = (props) => {
  console.log(props)
  return <>
    <h3 id={props.page.id}><button onClick={() => props.setArticleContent(props.page.content)}>{props.page.title}</button></h3>
  </>
} 
	