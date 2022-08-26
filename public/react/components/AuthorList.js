
import React from 'react';
import {ArticlesByAuthor} from './ArticlesByAuthor';

export const AuthorList = (props) => {
  console.log(props)
  return <>
    <h2>Authors</h2>
    <div className='inner'>
            {
            props.authors.map((author, idx) => {
                return <h3><button className="btn" data-id={author.id} onClick={props.fetchAuthorArticles} key={idx}>{author.name}</button></h3>
            })
        }
    </div>
  </>
} 
	