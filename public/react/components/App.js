import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';
import { Article } from './Article';
import { AddArticle } from './AddArticle';
import { AuthorList } from './AuthorList';
import { DeleteArticle } from './DeleteArticle.js';

import './App.css'

// import and prepend the api url to any fetch calls
import apiURL from '../api';
import { ArticlesByAuthor } from './ArticlesByAuthor';

export const App = () => {

	const [pages, setPages] = useState([]);
	const [authors, setAuthors] = useState([]);
	const [articleContent, setArticleContent] = useState({})
	const [showArticleFrom, setShowArticleFrom] = useState(true)
	const [showArticleList, setShowArticleList] = useState(true)
	const [showAuthorList, setShowAuthorList] = useState(true)
	const [showArticle, setShowArticle] = useState(false)
	const [showAuthorsArticles, setShowAuthorsArticles] = useState(false)
	const [authorsArticles, setAuthorsArticles] = useState([])
	const [showDeleteMessage, setShowDeleteMessage] = useState(false)


	async function fetchPages(){
		try {
			const response = await fetch(`${apiURL}/wiki`);
			const pagesData = await response.json();
			console.log(pagesData)
			setPages(pagesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	async function fetchAuthors(){
		try {
			const response = await fetch(`${apiURL}/users`);
			const pagesData = await response.json();
			console.log(pagesData)
			setAuthors(pagesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	async function fetchOnePage(slug){
		// this will call get and grab author and tag content too
		try {
			const response = await fetch(`${apiURL}/wiki/${slug}`);
			const pagesData = await response.json();
			console.log(pagesData)
			setArticleContent(pagesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
		setShowArticleFrom(false)
		setShowArticleList(false)
		setShowAuthorList(false)
		setShowArticle(true)
	}

	async function fetchAuthorArticles(e){
		// this will call get and grab author and tag content too
		const id = e.currentTarget.dataset.id
		try {
			const response = await fetch(`${apiURL}/users/${id}`);
			const pagesData = await response.json();
			console.log(pagesData)
			setAuthorsArticles(pagesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
		setShowArticleFrom(false)
		setShowArticleList(false)
		setShowAuthorList(false)
		setShowAuthorsArticles(true)
	}


	useEffect(() => {
		fetchPages();
		fetchAuthors();
		console.log("initial load")
	}, []);

	function backHome() {
		fetchPages();
		fetchAuthors();
		setShowArticleFrom(true)
		setShowArticleList(true)
		setShowAuthorList(true)
		setShowArticle(false)
		setShowAuthorsArticles(false)
		setShowDeleteMessage(false)
	}

	return (
		<main>	
      <h1>WikiVerse</h1>
	  	<div className='two-col'>
			<div className='col'>
				{showArticleList && <PagesList fetchOnePage={fetchOnePage} pages={pages} />}
			</div>
			<div className='col'>
				{showAuthorList && <AuthorList fetchAuthorArticles={fetchAuthorArticles} authors={authors}/>}
			</div>
		</div>
			{showArticle && <button className="btn" onClick={backHome}>Back to homepage</button>}
			{showAuthorsArticles && <button className="btn" onClick={backHome}>Back to homepage</button>}
			{showDeleteMessage && <button className="btn" onClick={backHome}>Back to homepage</button>}
			{Object.keys(articleContent).length !== 0 && showArticle && <Article 
			fetchPages={fetchPages} fetchAuthors={fetchAuthors}
			setShowArticle={setShowArticle}
			setArticleContent={setArticleContent}
			setShowDeleteMessage={setShowDeleteMessage}
			setShowArticleFrom={setShowArticleFrom} apiURL={apiURL}
			articleContent={articleContent}/>}
			{showAuthorsArticles && <ArticlesByAuthor authorsArticles={authorsArticles}/>}
			{showArticleFrom && <AddArticle apiURL={apiURL} fetchPages={fetchPages} fetchAuthors={fetchAuthors}/>}
			{showDeleteMessage && <DeleteArticle/>}
		</main>
	)
}