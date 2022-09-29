import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logo from "../assets/images/Pokemon-Logo.png"
import pokebola from "../assets/images/pokebola-2.gif"

const PokedexDetails = () => {

    const opacy = 0.4
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

    const { id } = useParams()
    const navigate = useNavigate()

    const [pokemonId, setPokemonId] = useState({})
    const [pokemonColor, setPokemonColor] = useState({})
    const [pokemonColor2, setPokemonColor2] = useState({})

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => setPokemonId(res.data))
    }, [])

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
            .then(res => {
                setPokemonColor(res.data.color.name),
                    setPokemonColor2(res.data.color.name)
            })
    }, []),

        colorPokemon.map(color => (
            color.name === pokemonColor && setPokemonColor(color.codeRgb)
        ))

    console.log(pokemonColor)

    return (
        <div
            className='content-details'
            style={{ backgroundColor: pokemonColor, border: `solid 0.5rem ${pokemonColor2}` }}
        >
            <div className='pokedex-details-content'>
                <div
                    className='poke-details-img'
                    style={{ border: `solid 0.4rem ${pokemonColor2}` }}
                >
                    <div className='img-details-content'>
                        <img className='logo' src={logo} alt="" />
                        <br />
                        <h4 className='poke_name_details img-posicion'>{(pokemonId.name?.toUpperCase())}</h4>
                        <br />
                        <img className='img-details img-posicion' src={pokemonId.id ? `https://cdn.traction.one/pokedex/pokemon/${pokemonId.id}.png` : "#"} alt="" />
                    </div>
                </div>
                <div className='content-pokedex-details'>
                    <div className='details-content'>
                        <img className='pokebola-details' src={pokebola} alt="" />
                        <div style={{background:pokemonColor}} className='details-info-content'>
                            <p><b>{pokemonId.name?.toUpperCase()}{" "}#{" "}{(pokemonId.id)}</b></p>
                            <div className='w-h-content'>
                                <p className='info hw'><b>Weight:{" "}</b>{(pokemonId.weight)}</p>
                                <p className='info hw'><b>Height:{" "}</b>{pokemonId.height}</p>
                            </div>
                            <div className='w-h-content'>
                                <p className='info'><b>Type:</b>
                                    <div className='w-h-content'>
                                        <p>{" "}{pokemonId?.types?.[0]?.type.name?.charAt(0).toUpperCase()}{pokemonId?.types?.[0]?.type.name.slice(1)}</p>
                                        <p>{pokemonId?.types?.[1]?.type.name.charAt(0).toUpperCase()}{pokemonId?.types?.[1]?.type.name.slice(1)}</p>
                                    </div>
                                </p>
                                <p className='info'><b>Abilities:</b>
                                    <div className='w-h-content'>
                                        <p>{pokemonId?.abilities?.[0]?.ability.name?.charAt(0).toUpperCase()}{pokemonId?.abilities?.[0]?.ability.name.slice(1)}</p>
                                        <p>{pokemonId?.abilities?.[1]?.ability.name?.charAt(0).toUpperCase()}{pokemonId?.abilities?.[1]?.ability.name.slice(1)}</p>
                                    </div>
                                </p>
                            </div>
                            <ul className='sdah-content'>
                                <li className='sdah'><b>HP:</b>{" "}{pokemonId?.stats?.[0]?.base_stat}</li>
                                <li className='sdah'><b>Attack:</b>{" "}{pokemonId?.stats?.[1]?.base_stat}</li>
                                <li className='sdah'><b>Defense:</b>{" "}{pokemonId?.stats?.[2]?.base_stat}</li>
                                <li className='sdah'><b>Speed:</b>{" "}{pokemonId?.stats?.[5]?.base_stat}</li>
                            </ul>
                        </div>
                    </div>
                    <div className='movements-content'>
                        <p className='movements-title'>Movements</p>
                        <div className='movements'>
                            {pokemonId?.moves?.map(move => (
                                <p key={move.move.name}>
                                    {move.move.name.charAt(0).toUpperCase()}{move.move.name.slice(1)}{"  /"}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div>
                        <i onClick={() => navigate("/pokedex")} className="fa fa-rotate-left"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokedexDetails;