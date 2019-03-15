import React, { Component } from 'react';
import './App.css';
import Header from '../components/Cockpit/Header';
import Test from '../components/Test/Test';
import Persons from '../components/Persons/Persons'
import Input from '../components/Input/Input'


class App extends Component {  
  state = {
    formIsValid: false,
    myForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        touched: false,
        validation: {
          required: true
        },
        valid: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your address'
        },
        value: '',
        touched: false,
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Email address'
        },
        value: '',
        touched: false,
        validation: {
          required: true
        },
        valid: false
      },
      number: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'Your phone number'
        },
        value: '',
        touched: false,
        validation: {
          required: true,
          maxLength: 5
        },
        valid: false
      },
      country: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'germany', displayValue: 'Germany'},
            {value: 'usa', displayValue: 'USA'},
            {value: 'ghana', displayValue: 'Ghana'},
            {value: 'peru', displayValue: 'Peru'},
          ]
        },
        // validation: {},
        valid: false,
        value: 'germany',
        touched: false
      }
    },
    isLoggedIn: false,
    persons: [
      {id: "wee", name: "Mark", age: 30, city: "Compton"},
      {id: "ss", name: "Grigg", age: 25, city: "Charlotte"},
      {id: "ssf", name: "Willock", age: 31, city: "Boston"},
      {id: "tgh", name: "James", age: 20, city: "Cali"}
    ],
    isShowing: false        
  }

  statusChangeHandler = () => {
    this.setState(prevState => {
      return {
        isLoggedIn: !prevState.isLoggedIn,
      }
    })
  }

  deletePersonHandler = (personIndex) => {
    const p = [...this.state.persons];
    p.splice(personIndex, 1);
    this.setState({
      persons: p
    })  
  }

  nameHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex( p => {
      return p.id === id
    })
    
    const person = {...this.state.persons[personIndex]}
    person.name = event.target.value

    const persons = [...this.state.persons]
    persons[personIndex] = person

    this.setState({ persons: persons })

  }

  togglePerson = () => {
    const doesShow = this.state.isShowing
    this.setState({ isShowing: !doesShow})

    //******another way is the prevState method******/ 
    // this.setState(prevState => {
    //   return {
    //     isShowing: !prevState.isShowing
    //   }
    // })
  }

  handleChange = (event, inputID) => {
    const updatedForm = {
      ...this.state.myForm
    };
    const updatedFormElement = {...updatedForm[inputID]};
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true;
    updatedForm[inputID] = updatedFormElement;

    let formIsValid = true;
    for(let inputID in this.state.myForm) {
      formIsValid = updatedForm[inputID].valid && formIsValid;
    }
    this.setState({myForm: updatedForm, formIsValid: formIsValid})
  }

  userFormHandler = (event) => {
    event.preventDefault();

    const formData = {};

    for (let formInputId in this.state.myForm) {
      formData[formInputId] = this.state.myForm[formInputId].value;
    }
  }

  checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  render() {
    let persons = null

    if ( this.state.isShowing ) {
      persons = <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameHandler}/>
    }
    const formElementsArray = [];
    for (let key in this.state.myForm) {
      formElementsArray.push({
        id: key,
        config: this.state.myForm[key]
      });
    }
    let form = (
      <form onSubmit={this.userFormHandler}>
        {formElementsArray.map((formElement) => {
          return (
            <Input key={formElement.id}
            label={formElement.id} 
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            shouldValidate={formElement.config.validation}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            changed={(event) => this.handleChange(event, formElement.id)} />
          )
          })}
        <button disabled={!this.state.formIsValid}>Submit</button>
      </form>
    )

    //******alternatively the ternary method also works but in cases like this, 
    // the variable-if-statement method is preferable and recommended******/ 

    return (
      <div className="App">
          <Header 
          click={this.togglePerson}/>

          { persons }

          <Test status={this.state.isLoggedIn ? <p>LOGGED IN!</p> : <p>LOGGED OUT!</p>} 
          clicked={this.statusChangeHandler}
          button={this.state.isLoggedIn ? <p>Please Log Out!</p> : <p>Please Log In!</p>}/>

          {form}
      </div>
    );
  }
}

export default App;
