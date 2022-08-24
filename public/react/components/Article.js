import React from 'react';

export const Article = (props) => {
  console.log(props)

  function handleArticleUpdate() {
    console.log("update")
  }

  function handleArticleDelete() {
    console.log("delete")
  }

  return <>
    <h1>{props.title} <br/>{props.email}</h1>
    <p>{props.content}</p>
    <p>
    {props.tags.map(tag => <b key={tag.id}>#{tag.name} </b>)}
    <span>{props.status}</span>
    <button onClick={handleArticleUpdate}>Update Article</button>
    <button onClick={handleArticleDelete}>Delete Article</button>
    </p>
  </>
} 
	