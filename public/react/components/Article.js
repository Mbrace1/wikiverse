import React, {useState} from 'react';
import {UpdateArticle} from './UpdateArticle.js'
import './Article.css'

export const Article = (props) => {
  console.log(props)
  const slug = props.articleContent.title.split(' ').join('_').toLowerCase()
  const [showUpdateForm, setShowUpdateForm] = useState(false)

  function showArticleUpdate(e) {
    // console.log(e.currentTarget.dataset.slug)
    // const thisSlug = e.currentTarget.dataset.slug
    setShowUpdateForm(true)
    props.setShowArticleFrom(false)
  }

  async function handleArticleDelete(e) {
    console.log(e.currentTarget.dataset.slug)
    const thisSlug = e.currentTarget.dataset.slug
    try {
      const response = await fetch(`${props.apiURL}/wiki/${thisSlug}`,
      {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
      });
      const pagesData = await response.json();
      console.log(pagesData)
      props.setShowDeleteMessage(true)
      props.setShowArticle(false)
  } catch (err) {
      console.log("Oh no an error! ", err)
  }
  }

  return <>
    <div id="article">
      <div id="inner-article">
        <h1>{props.articleContent.title} <br/><span>{props.articleContent.author.name} - {props.articleContent.author.email}</span></h1>
        <p id="content">{props.articleContent.content}</p>
        <p id="footer">
          <span id="tags">{props.articleContent.tags.map(tag => <b key={tag.id}>#{tag.name} </b>)}</span>
          <span id="status">{props.articleContent.status}</span>
        </p>
        <p id="article-buttons">
          <button className="btn" data-slug={slug} onClick={showArticleUpdate}>Update Article</button>
          <button className="btn" data-slug={slug} onClick={handleArticleDelete}>Delete Article</button>
        </p>
      </div>
    </div>
    {showUpdateForm && <UpdateArticle slug={slug} apiURL={props.apiURL}
    setArticleContent={props.setArticleContent}
    articleContent={props.articleContent}
    setShowUpdateForm={setShowUpdateForm}/>}
  </>
} 
	