import React from 'react';
import { useEffect } from 'react';
import axios from "axios"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const opacy=0.5
const colorPokemon = [
    {
        name: "black",
        codeRgb: `rgb(0, 0, 0,${opacy})`,
    },
    {
        name: "blue",
        codeRgb: `rgb(0, 0, 255,${opacy})`,
    },
    {
        name: "brown",
        codeRgb: `rgb(165, 42, 42, ${opacy})`,
    },
    {
        name: "gray",
        codeRgb: `rgb(128, 128, 128,${opacy})`,
    },
    {
        name: "green",
        codeRgb: `rgb(0, 128, 0,${opacy})`,
    },
    {
        name: "pink",
        codeRgb: `rgb(255, 192, 203,${opacy})`,
    },
    {
        name: "purple",
        codeRgb: `rgb(128, 0, 128,${opacy})`,
    },
    {
        name: "red",
        codeRgb: `rgb(255, 0, 0,${opacy})`,
    },
    {
        name: "white",
        codeRgb: `rgb(255, 255, 255,${opacy})`,
    },
    {
        name: "yellow",
        codeRgb: `rgb(255, 255, 0,${opacy})`,
    }]

const PokemonCard = ({ url, urlColor }) => {

    const navigate = useNavigate()
    const [pokemon, setPokemon] = useState({})
    const [pokemonColor, setPokemonColor] = useState({})
    const [pokemonColor2, setPokemonColor2] = useState({})

    useEffect(() => {
        axios
            .get(url)
            .then(res => setPokemon(res.data))
    }, [])

    useEffect(() => {
        axios
            .get(urlColor)
            .then(res => {
                setPokemonColor(res.data.color.name),
                    setPokemonColor2(res.data.color.name)
            })
    }, []),

        colorPokemon.map(color => (
            color.name === pokemonColor && setPokemonColor(color.codeRgb)
        ))

    return (
        <div
            className='card'
            onClick={() => navigate(`/pokedex/${pokemon.id}`)}
            style={{ backgroundColor: pokemonColor, border: `solid 0.2rem ${pokemonColor2}` }}
        >
            <h3 className='card-name'>{pokemon.name}</h3>
            <div className='card-info'>
                <ul className='ul-card'>
                    <li><b>HP:</b>{" "}{pokemon?.stats?.[0]?.base_stat}</li>
                    <li><b>Attack:</b>{" "}{pokemon?.stats?.[1]?.base_stat}</li>
                    <li><b>Defense:</b>{" "}{pokemon?.stats?.[2]?.base_stat}</li>
                    <li><b>Speed:</b>{" "}{pokemon?.stats?.[5]?.base_stat}</li>
                </ul>
                <div className='img-card-content'>
                    <img className='img-card' src={pokemon.id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png` : "#"} alt="" />
                </div>
            </div>
            <p className='card-types'><b>Types:</b>{" "}{pokemon?.types?.[0]?.type.name}{", "}{pokemon?.types?.[1]?.type.name}</p>
        </div>
    );
};

export default PokemonCard;