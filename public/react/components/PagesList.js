import React from 'react';
import { Page } from './Page';

export const PagesList = (props) => {
	// console.log(props)
	return <>
		{
			props.pages.map((page, idx) => {
				return <Page fetchOnePage={props.fetchOnePage} page={page} key={idx} />
			})
		}
	</>
} 
