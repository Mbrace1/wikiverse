import React, {useState} from 'react';
import './AddArticle.css'

export const AddArticle = (props) => {
    const [author, setAuthor] = useState('')
    const [email, setEmail] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState('')
    // console.log(props)
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
        // refresh lists
        props.fetchPages()
        props.fetchAuthors()
    }

    function handleArticleForm (e) {
        e.preventDefault()
        // change title to slug _
        const slug = title.split(' ').join('_').toLowerCase()

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

  return <>
    <form id="addArticle" onSubmit={handleArticleForm}>
        <div className="form-section">
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" onChange={(e) => setAuthor(e.target.value)}></input>
        </div>
        <div className="form-section">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div className="form-section">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" onChange={(e) => setTitle(e.target.value)}></input>
        </div>
        <div className="form-section">
          <label htmlFor="content">Content:</label>
          <textarea rows="4" cols="50" id="content" onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <div className="form-section">
          <label htmlFor="tags">*Tag(s):</label>
          <input placeholder="ImATag AlsoATag" type="text" id="tags" onChange={(e) => setTags(e.target.value)}></input>
        </div>
        <p className="input-note">*Separate tags with spaces</p>
        <button className="btn" type="submit">Create New Article</button>
    </form>
  </>
} 
	