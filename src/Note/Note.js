import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import APIcontext from '../APIcontext';

export default class Note extends Component {
  static contextType = APIcontext;
 
  handleDeleteNote(id){
    fetch(`https://polar-fjord-58738.herokuapp.com/api/notes/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': `application/json`
      }),
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        //return res.json()
      })
      .then(data => {
        // call the callback when the request is successful
        // this is where the App component can remove it from state
        //console.log(id);
        this.context.deleteNote(id);
        //this.props.history.push('/')
        //this.props.deleteRefresh();
        
      })
      .catch(error => {
        console.error(error)
      })
  }
  
  render(){
    const { id,name, modified} = this.props;
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button className='Note__delete' type='button' onClick={()=>this.handleDeleteNote(id)}>
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
  
}
