const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');





let apiQuotes = []

//show loading
function loading(){
    loader.hidden = false
    quoteContainer.hidden = true;
}
//show loading
function complete(){
    loader.hidden = true
    quoteContainer.hidden = false;
}

//Get quotes from API

async function Quotes(){
    //loader start
    loading();
    const apiUrl = 'https://quotes-api-self.vercel.app/quote';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        console.log(apiQuotes);
        //check if author field is blank and replace it with unknown
        if(!apiQuotes.author){
            authorText.textContent = 'Unknown';
        }else{
            authorText.textContent = apiQuotes.author;
        }

        //check quote length to determine the styling
        if(apiQuotes.quote.length > 100){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.textContent = apiQuotes.quote;

        //loader complete
        complete()
    }catch(error){
        // catch Error Here
        console.log("whoops! Something went wrong");
    }
}

//Tweet Quote
function tweetQuote(){
    // ?=> query parameter
    //we got this link from twitter wen intent
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
    // this _blank will help to open the twitter window in a new tab
    window.open(twitterUrl, '_blank')
}

//Event Listeners
newQuoteBtn.addEventListener('click', Quotes);
twitterBtn.addEventListener('click', tweetQuote);


//on load
Quotes()
