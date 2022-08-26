import React from 'react';
import { Page } from './Page';

export const PagesList = (props) => {
	// console.log(props)
	return <>
		<h2>Articles</h2>
		<div className='inner'>
			{
				props.pages.map((page, idx) => {
					return <Page fetchOnePage={props.fetchOnePage} page={page} key={idx} />
				})
			}
		</div>
	</>
} 
