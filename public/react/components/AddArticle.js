import React, {useState} from 'react';
import './AddArticle.css'

export const AddArticle = (props) => {
    const [author, setAuthor] = useState('')
    const [email, setEmail] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState('')
//   console.log(props)
    async function postData(obj){
        try {
            const response = await fetch(`${props.apiURL}/wiki`,
            {
                method: 'POST',
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
    }

    function handleArticleForm (e) {
        e.preventDefault()
        // change title to slug _
        // add tags text which will be split by #
        if (tags[0] !== "#") {
          console.log("tags must start and be separated by #")
          return
        } else {

          const slug = title.split(' ').join('_')

          const obj = {
            name: author,
            slug: slug,
            email: email,
            title: title,
            content: content,
            status: "open", // always start article open
            tags: tags
          }
          postData(obj)
          
          setAuthor('')
          setEmail('')
          setTitle('')
          setContent('')
          setTags('')
        }
    }

  return <>
    <form id="addArticle" onSubmit={handleArticleForm}>
        <div className="form-section">
          <label htmlFor="author">Author:</label>
          <input id="author" onChange={(e) => setAuthor(e.target.value)}></input>
        </div>
        <div className="form-section">
          <label htmlFor="email">Email:</label>
          <input id="email" onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div className="form-section">
          <label htmlFor="title">Title:</label>
          <input id="title" onChange={(e) => setTitle(e.target.value)}></input>
        </div>
        <div className="form-section">
          <label htmlFor="content">Content:</label>
          <input id="content" onChange={(e) => setContent(e.target.value)}></input>
        </div>
        <div className="form-section">
          <label htmlFor="tags">Tag(s):</label>
          <input id="tags" onChange={(e) => setTags(e.target.value)}></input>
        </div>
        <button type="submit">Create New Article</button>
    </form>
  </>
} 
	