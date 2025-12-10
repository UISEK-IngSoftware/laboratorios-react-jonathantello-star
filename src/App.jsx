import { Container, Grid } from '@mui/material'
import Header from './components/Header'
import { pokemons } from './data/pokemons'
import PokemonCard from './components/PokemonCard'

import PokemonList from './components/PokemonList'
import './App.css'

function App() {

  return (
    <>
      <Header />
      <Container>
        <PokemonList />
      </Container>
    </>
  )
}

export default App
