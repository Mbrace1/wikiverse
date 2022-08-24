import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';
import { Article } from './Article';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [pages, setPages] = useState([]);
	const [articleContent, setArticleContent] = useState({})

	async function fetchPages(){
		try {
			const response = await fetch(`${apiURL}/wiki`);
			const pagesData = await response.json();
			setPages(pagesData);
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
	}

	useEffect(() => {
		fetchPages();
	}, []);
	Object.keys(articleContent).length !== 0 && console.log(articleContent)
	return (
		<main>	
      <h1>WikiVerse</h1>
			<h2>An interesting 📚</h2>
			<PagesList fetchOnePage={fetchOnePage} pages={pages} />
			{Object.keys(articleContent).length !== 0 && <Article 
			author={articleContent.author.name} email={articleContent.author.email} content={articleContent.content} 
			title={articleContent.title} status={articleContent.status} tags={articleContent.tags}/>}
		</main>
	)
}