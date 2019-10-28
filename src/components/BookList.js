import React, {useState} from 'react';
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../query/queries';

import BookDetail from './BookDetail';

function BookList(props) {

  const [selected, setSelected] = useState(null);  

  function displayBooks(){

    var data = props.data; 

    if(data.loading){

        return (<div>Carregando</div>);
        
    }else{
        return data.books.map(book => {
            return (
                <li key={book.id} onClick={ (e) => {setSelected(book.id)}}>
                    {book.name}
                </li>
            )
        });
    }
  }  
  return (   
    <div>
        <ul id="book-list">
            {displayBooks()}
        </ul>
        <BookDetail bookId={selected}/>
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);
