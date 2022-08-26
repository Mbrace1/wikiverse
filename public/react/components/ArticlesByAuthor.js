import React from 'react';

export const ArticlesByAuthor = (props) => {
    console.log(props.authorsArticles.pages)

    async function deleteAuthor() {
        console.log('author deleted tbc')
    }

  if (props.authorsArticles.pages.length === 0) {
    return <>
        <div>No articles by author</div>
        <button onClick={deleteAuthor}>Delete Author</button>
    </>
  } else {
    return <>
        {props.authorsArticles.pages.map(p => <div>{p.title}</div>)}
    </>
  }

} 
	