import React from 'react';

export const Article = (props) => {
  console.log(props)
// needs author, tags, title, so wil have fetch? */
  return <>
    <h1>{props.title} <br/>{props.email}</h1>
    <p>{props.content}</p>
    <p>
    {props.tags.map(tag => <b key={tag.id}>#{tag.name} </b>)}
    <span>{props.status}</span>
    </p>
  </>
} 
	