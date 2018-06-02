//these can be commented out; just to let me know
//alert("Connection successful"),
//$('body').append("jQuery found");

//I found that a $(document).ready(function () is not needed
//if put the jQuery cdn script at the bottom of the body
//section of the html code

//we start by displaying a quote from myArray local selected randomly
//this also in case remote Mashape Andrux api is down
displayQuoteFromArray();

function displayQuoteFromArray() {

    var myQuotes = [
        {
            author: "Salvador Dali",
            quote: "The only difference between me and a madman is that I'm not mad."
        },
        {
            author: "Soren Aabye Kierkegaard",
            quote: "People demand freedom of speech to make up for the freedom of thought which they avoid"
        },
        {
            author: "Oscar Wilde",
            quote: "The only way to get rid of a temptation is to yield to it."
        },
        {
            author: "Aldous Huxley",
            quote: "Maybe this world is another planet's Hell."
        },
        {
            author: "Thomas Alva Edison",
            quote: "I have not failed. I've just found 10,000 ways that won't work."
        }
    ];

    //this picks one of the 5 quotes randomly
    //and displays it at initial page loading
    var random = Math.floor(Math.random() * 5);
    displayArrayQuote(myQuotes[random]);
}
//note difference from api display function
function displayArrayQuote(response) {
    console.log(response.quote),
        console.log(response.author),
        $("#quote").text(response.quote),
        $("#author").text(response.author)

//then when we click the next_quote button, we make the api call
//here, click has a jQuery callback function -- the alert
$("#next_quote").click(function () {
    $('#main').fadeOut();
    getRandomQuote();
});
//to let us know the handler function has been called
//alert( "Handler for .click() called." );
//the main code block fades out

//the handler function runs this other function - 
//the ajax call function for the andrux api
function getRandomQuote() {

    $.ajax({
        type: "POST",
        url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1",
        dataType: "json",

        //if it connects successfully, we put it in a function called response
        success: function (response) {
            //to let us know what the api got
            console.log(response);
        },

        //if that connection was successful, we run this function
        success: displayAPIQuote,

        //we created a function to display quotes from our local 5 quotes array 
        //if the AJAX call to the api fails

        error: displayQuoteFromArray,
        //error: function() { alert('boo, api fail!'); },

        //we set the header before sending the call
        //for one thing, it has my Mashape key
        beforeSend: setHeader,

    });

    function setHeader(xhr) {
        xhr.setRequestHeader("X-Mashape-Key", "PQBRm5xvsgmshhh70SDUws4i1GvSp15SB8PjsnP2CBrXY7TRhH");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Accept", "application/json");
    }

}
    //the old Andrux famous quotes api was not delivered in array
    //the new on is, this code handles that change
};

function displayAPIQuote(response) {
    console.log(response[0].quote); //to make sure we are getting the correct output: comment out later  
    $("#quote").text(response[0].quote);
    $('#author').text(response[0].author);
    //update the tweet href for the new quote
    tweetQuote();
    $('#main').fadeIn(1200);
};

function tweetQuote() {
    var twitterURL = 'https://twitter.com/intent/tweet?hashtags=quotes&text="';
    var quote = $("#quote").text();
    var author = $('#author').text();
    twitterURL += quote + '" - ' + author;

    //attach the url, quote, & author href attribute
    //to the tweet button    
    $('#tweet').attr('href', twitterURL);
}