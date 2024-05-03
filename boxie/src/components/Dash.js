
import { useState, useEffect } from 'react';
import axios from "axios";
import $ from 'jquery';

function Dash(props) {
    const [searchResults, setSearchResults] = useState([]);

     const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);

    // Load todo list from the server on component mount
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/getTodos")
            .then(response => {
                console.log(response.data);
                setTodos(response.data); // Update todos state with fetched data
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleTODO = () => {
        axios.post("http://127.0.0.1:5000/push", { text: task })
            .then(response => {
                const newTodo = { Name: task };
                console.log(response.data);
                setTodos([...todos, newTodo]);
                setTask("");

            })
            .catch((err) => {
                console.log(err);
            });
    };




    $(document).ready(function() {
        $('#searchButton').click(function() {
            var searchTerm = $('#searchTerm').val();
            var contentType = $('#contentType').val();
            var apiKey = '130d2b6b';
            var apiUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&type=${contentType}&apikey=${apiKey}`;

            $.ajax({
                url: apiUrl,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    displayResults(data.Search);
                },
                error: function() {
                    console.log('Error fetching data from API.');
                }
            });
        });
    });

    function displayResults(results) {
        var resultsDiv = $('#results');
        resultsDiv.empty();

        if (results) {
            for (var i = 0; i < results.length; i += 3) {
                var rowHtml = '<div class="container">';
                rowHtml += '<div class="row">';

                for (var j = i; j < Math.min(i + 3, results.length); j++) {
                    var result = results[j];
                    var imdbLink = `https://www.imdb.com/title/${result.imdbID}`;
                    var cardHtml = `
                        <div class="col-sm-4">
                            <div class="card mb-3">
                                <div class="row no-gutters">
                                    <div class="card-img-top">
                                        <img src="${result.Poster}" class="card-img" alt="Poster">
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title">${result.Title}</h5>
                                        <hr/>
                                        <p class="card-text">Type: ${result.Type}</p>
                                        <hr/>
                                        <p>Year: ${result.Year}</p>
                                        <hr/>
                                        <p>$19.99</p>
                                        <hr/>
                                        <a href="${imdbLink}" target="_blank">View on IMDb</a>
                                         <hr/>
                                          <div className="col-md-3">
                                                <button  class="btn btn-primary" onClick={handleTODO}>add to cart</button>
                                            </div>
                                          </div>
                                </div>
                            </div>
                        </div>
                    `;
                    rowHtml += cardHtml;
                }

                rowHtml += '</div>';
                rowHtml += '</div>';
                resultsDiv.append(rowHtml);
            }
        } else {
            resultsDiv.html('<p>No results found.</p>');
        }
    }

    return (
        <div>
            <div className="jumbotron mt-5">
                <h1 style={{ fontSize: '30px', color: 'blueviolet' }}><strong> IMDB Movie Search </strong></h1>
                <div className="row mt-3">
                    <div className="col-md-4">
                        <input type="text" id="searchTerm" className="form-control" placeholder="Enter movie title"/>
                    </div>
                    <div className="col-md-3">
                        <select id="contentType" className="form-control">
                            <option value="">All</option>
                            <option value="movie">Movie</option>
                            <option value="series">Series</option>
                            <option value="episode">Episode</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <button id="searchButton" className="btn btn-primary">Search</button>
                    </div>
                    <div className="col-md-12">
                        <hr/>
                    </div>

                    <div id="results" className="mt-4"></div>

                    <div className="col-md-12 mt-4 text-center">
                        <button id="prevPage" className="btn btn-secondary mr-2">Previous</button>
                        <span>Page <span id="currentPage">1</span> of <span id="totalPages">1</span></span>
                        <button id="nextPage" className="btn btn-secondary ml-2">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dash;
