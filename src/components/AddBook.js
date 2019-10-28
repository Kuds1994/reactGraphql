import React, {useState} from 'react';
import {graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import {getAuthorsQuery, addBook, getBooksQuery} from '../query/queries';


function AddBook(props) {

    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');

    const displayAuthors = () => {
        
        var data = props.getAuthorsQuery;

        if(data.loading){
            return (<option>Loading Authors..</option>)
        }else{
            return data.authors.map(author => {
                return (
                <option key={author.id} value={author.id}>
                    {author.name}
                </option>)
            });
        }
    }

    const submitForm = event => {
        event.preventDefault();
        props.addBook({
            variables: {
                name: name,
                genre: genre,
                authorId: authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        });
    }
   
    return (   
      <form id="add-book" onSubmit={submitForm}>
          <div className="field">
              <label>Book name:</label>
              <input type="text" onChange={(e) => setName(e.target.value)}/>
          </div>

          <div className="field">
              <label>Genre:</label>
              <input type="text" onChange={(e) => setGenre(e.target.value)}/>
          </div>

          <div className="field">
              <label>Author:</label>
              <select onChange={(e) => setAuthorId(e.target.value)}>
                  <option>Select Author</option>
                  {displayAuthors()}
              </select>
          </div>


          <button>+</button>
      </form>
    );
  }

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBook, {name: "addBook"})   
)(AddBook);  