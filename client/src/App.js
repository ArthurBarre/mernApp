import React from 'react';
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const TodosQuery = gql`
  {
    todos {
      id
      text
      complete
    }
  }
`
const UpdateMutation = gql`
mutation($id: ID!, $complete: Boolean!){
  updateTodo(id: $id, complete:  $complete)
}
`

class App extends React.Component {

  state = {
    checked: [0]
  };



  updateTodo = todo => {
    //update todo
    this.props.updateTodo({
      variables: {
        id: todo.id,
        complete: !todo.complete
      }
    })
  }

  removeTodo = todo => {
    //remove todo

  }
  render() {
    const { data: { loading, todos } } = this.props;
    if (loading) {
      return null
    } else {
      return (
        <div style={{ display: "flex" }}>
          <div style={{ margin: "auto", width: 400 }}>
            <Paper elevation={1}>
              <List>
                {todos.map(todo => (
                  <ListItem
                    key={todo.id}
                    role={undefined}
                    dense
                    button
                    onClick={() => this.updateTodo(todo)}
                  >
                    <Checkbox
                      checked={todo.complete}
                      tabIndex={-1}
                      disableRipple
                    />
                    <ListItemText primary={todo.text} />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => this.removeTodo(todo)}>
                        <CloseIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </div>
        </div>
      )
    }
  }
}

export default
  compose(
    graphql(UpdateMutation, { name: "updateTodo" }),
    graphql(TodosQuery)(App)
  )