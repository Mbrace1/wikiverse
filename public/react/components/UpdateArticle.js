
import React, {useState} from 'react';

export const UpdateArticle = (props) => {
    const tags = props.articleContent.tags.map(t => t.name).join(' ')
    // console.log(tags)
    // console.log(props)
    const [updatedTitle, setUpdatedTitle] = useState(props.articleContent.title)
    const [updatedContent, setUpdatedContent] = useState(props.articleContent.content)
    const [updatedTags, setUpdatedTags] = useState(tags)

//   console.log(props)
     function handleUpdateForm(e) {
        e.preventDefault()

        const obj = {
            title: updatedTitle,
            slug: updatedTitle.split(' ').join('_').toLowerCase(),
            content: updatedContent,
            // tags: updatedTags.split[]
        }
        console.log(obj)
        postUpdatedArticle(obj)
    }

    async function postUpdatedArticle(obj) {
        try {
            const response = await fetch(`${props.apiURL}/wiki/${props.slug}`,
            {
                method: 'PUT',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            const pagesData = await response.json();
            console.log(pagesData)
        } catch (err) {
            console.log("Oh no an error! ", err)
        }

        // props.setArticleContent(...props.articleContent, obj)
        // console.log(articleContent)
    }

  return <>
    <form id="updateArticle" onSubmit={handleUpdateForm}>
        <div className="form-section">
          <label htmlFor="update-title">Title:</label>
          <input placeholder={updatedTitle} type="text" id="update-title" onChange={(e) => setUpdatedTitle(e.target.value)}></input>
        </div>
        <div className="form-section">
          <label htmlFor="update-content">Content:</label>
          <textarea placeholder={updatedContent} rows="4" cols="50" id="update-content" onChange={(e) => setUpdatedContent(e.target.value)}></textarea>
        </div>
        <div className="form-section">
          <label htmlFor="update-tags">*Tag(s):</label>
          <input placeholder={updatedTags} type="text" id="update-tags" onChange={(e) => setUpdatedTags(e.target.value)}></input>
        </div>
        <p className="input-note">*Separate tags with spaces</p>
        <button className="btn" type="submit">Confirm Update Article</button>
    </form>
  </>
} 
	