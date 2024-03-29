import React, { Component } from 'react';
import './App.css';
import Form from "./component/Form";
import Recipes from "./component/Recipes";

const API_KEY = '5952d427a1178bff343b7b3f751166f8'

class App extends Component {
  state ={
    recipes: []
  }
  getRecipe= async (e) => {
    const recipeName = e.target.elements.recipeName.value

    e.preventDefault()
    const api_call = await fetch(`https://cors-anywhere.herokuapp.com/http://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=10`)

    const data = await api_call.json()
    this.setState({recipes: data.recipes})
  }
  componentDidMount() {
    const json = localStorage.getItem('recipes')
    const recipes = JSON.parse(json)
    this.setState({recipes: recipes})
    console.log(recipes);
  }

  componentDidUpdate() {
    const recipes = JSON.stringify(this.state.recipes)
    localStorage.setItem('recipes', recipes)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe}/>
        <Recipes recipes={this.state.recipes}/>
      </div>
    );
  }
}

export default App;