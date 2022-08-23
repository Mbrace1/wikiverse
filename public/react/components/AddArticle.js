import React from 'react';

export const AddArticle = (props) => {
//   console.log(props)
  return <>
    <form id="addArticle">
        <input>author</input>
        <input>title</input>
        <input>content</input>
        <input>slug</input>
        <button type="submit" for="addArticle">Create New Article</button>
    </form>
  </>
} 
	