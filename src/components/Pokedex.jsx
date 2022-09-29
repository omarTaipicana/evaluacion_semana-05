import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { changeOption } from '../store/slices/change.slice';
import axios from "axios"
import PokemonCard from './PokemonCard';
import { useNavigate } from "react-router-dom";
import img from "../assets/images/POKEDEX.gif"

const Pokedex = () => {

    const navigate = useNavigate()

    const user = useSelector(state => state.user)

    const [url, setUrl] = useState([]);
    const [type, setType] = useState([])
    const [inputPokemon, setInputPokemon] = useState("")

    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1155")
            .then(res => setUrl(res.data.results))
    }, [])

    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/type")
            .then(res => setType(res.data.results))
    }, [])

    const searchName = () => {
        navigate(`/pokedex/${inputPokemon}`)
    }

    const searchType = (typeUrl) => {
        if (typeUrl === "all") {
            axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1155")
                .then(res => setUrl(res.data.results))
        } else {
            axios.get(typeUrl)
                .then(res => setUrl(res.data.pokemon))
        }
    }


    const [page, setPage] = useState(1)
    const pokemonPerPage = 10
    const lastIndexPagin = page * pokemonPerPage//10
    const firstIndexPagin = lastIndexPagin - pokemonPerPage
    const urlPaginated = url.slice(firstIndexPagin, lastIndexPagin)
    const totalPage = Math.ceil(url.length / pokemonPerPage)
    const pageNumers = []

    const [pageButton, setPageButton] = useState(1)
    const buttonPerPage = 10
    const lastIndexPageButton = pageButton * buttonPerPage
    const firstIndexPageButton = lastIndexPageButton - buttonPerPage
    const totalPageButton = Math.ceil(totalPage / buttonPerPage)

    for (let i = firstIndexPageButton + 1; i <= (lastIndexPageButton > totalPage ? totalPage : lastIndexPageButton); i++) {
        pageNumers.push(i)
    }

    return (
        <div className='pokedex-content'>            
            <p className='welcome'>Welcome {user}, here you can find your favorite pokemon</p>
            <div className='pokedex-header'>
                <div className='pokedex-gif'>
                    <h2>Pokedex</h2>
                    <img src={img} alt="" />
                </div>
                <div className='pokedex-search'>
                    <form onSubmit={searchName}>
                        <input
                            className='input-search'
                            placeholder='search pokemon'
                            type="text"
                            value={inputPokemon}
                            onChange={e => setInputPokemon(e.target.value)}
                        />
                        <br />
                        <i onClick={searchName} className="fa-solid fa-magnifying-glass"></i>
                    </form>
                    <div>
                        <select
                            className='input-search'
                            onChange={e => {
                                searchType(e.target.value)
                                setPage(1)
                                setPageButton(1)

                            }}>
                            <option value={"all"}>Selection one type</option>
                            <option value={"all"}>All Pokemon</option>
                            {type.map(type => (
                                <option key={type.name} value={type.url}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                        <br />
                        <b>Total pokemon:</b>
                        <br />
                        <p>{url.length}</p>
                    </div>
                </div>
                <i onClick={() => navigate("/")} className="fa fa-rotate-left"></i>
            </div>
            <div className='card-content'>
                {
                    urlPaginated.map((list) => (
                        <PokemonCard
                            url={list.url ? list.url : list.pokemon.url ? list.pokemon.url : list.pokemon.url}
                            key={list.url ? list.url : list.pokemon.url}
                            urlColor={`https://pokeapi.co/api/v2/pokemon-species/${list.name ? list.name : list.pokemon.name}`}
                        />
                    ))
                }
            </div>
            <div className='paginated-content'>
                <button className='btn-buttton-page-content'
                    onClick={() => setPageButton(pageButton - 1)}
                    disabled={pageButton === 1}
                    style={{ opacity: (pageButton === 1) ? ".1" : "" }}>
                    <i className="fa-solid fa-caret-left btn-button-page"></i>
                </button>
                <button
                    className='btn-page-card'
                    onClick={() => {
                        setPage(page - 1)
                        if (page === lastIndexPageButton - buttonPerPage + 1) {
                            setPageButton(pageButton - 1)
                        }
                    }}
                    disabled={page === 1}
                    style={{ opacity: (page === 1 ? ".1" : "") }}>
                    Previus
                </button>
                <button className='btn-page help'
                    onClick={() => {
                        setPage(1)
                        setPageButton(1)
                    }}>
                    {1}
                </button>
                ...{
                    pageNumers.map(number => (
                        <button
                            style={{ background: (number == page ? "yellow" : ""), color: (number == page ? "black" : ""), }}
                            className='btn-page'
                            key={number}
                            onClick={() => setPage(number)}>
                            {number}
                        </button>
                    ))
                }...
                <button className='btn-page help'
                    onClick={() => {
                        setPage(totalPage)
                        setPageButton(Math.ceil(totalPage / buttonPerPage))
                    }}>
                    {totalPage}
                </button>
                <button
                    className='btn-page-card'
                    onClick={() => {
                        setPage(page + 1)
                        if (page === lastIndexPageButton) {
                            setPageButton(pageButton + 1)
                        }
                    }}
                    disabled={page === totalPage}
                    style={{ opacity: (page === totalPage ? ".1" : "") }}>
                    Next
                </button>
                <button className='btn-buttton-page-content'
                    onClick={() => setPageButton(pageButton + 1)}
                    disabled={pageButton === totalPageButton}
                    style={{ opacity: (pageButton === totalPageButton ? ".1" : "") }}
                >
                    <i className="fa-solid fa-caret-right btn-button-page"></i>
                </button>
            </div>
            <h4><b>Page:</b>{page}</h4>
        </div>
    );
};

export default Pokedex;