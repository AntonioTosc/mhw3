/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function resetQuiz(event){
    const result = document.querySelector("#result");
    result.classList.add('hidden');

    for(const box of boxes){
        box.addEventListener('click', select);
        box.classList.remove('opacity');
        box.querySelector('.checkbox').src = "./images/unchecked.png";
        box.classList.remove('selected')
    }

    for(const key in finalAnswers){
        delete finalAnswers[key];
    }

    console.log(finalAnswers);

}

function choosePersonality(){
    if(finalAnswers.one === finalAnswers.two || finalAnswers.one === finalAnswers.three)
        return finalAnswers.one;
    if(finalAnswers.two === finalAnswers.one || finalAnswers.two === finalAnswers.three)
        return finalAnswers.two;
    if(finalAnswers.three === finalAnswers.one || finalAnswers.three === finalAnswers.two)
        return finalAnswers.three;
    return finalAnswers.one;
}

function finalAnswersLenght(){
    let s = 0;
    for(const i in finalAnswers)
        s++;
    return s;
}

function addAnswer(selectedImg){
    finalAnswers[selectedImg.dataset.questionId] = selectedImg.dataset.choiceId;

    if(finalAnswersLenght() == 3){
        for(const box of boxes){
            box.removeEventListener('click', select);
        }

        const personality = choosePersonality();

        const result = document.querySelector('#result');
        result.querySelector('h1').textContent = RESULTS_MAP[personality].title;
        result.querySelector('p').textContent = RESULTS_MAP[personality].contents;
        result.classList.remove('hidden');

        const button = result.querySelector('#button');
        button.addEventListener('click', resetQuiz);
        
    }
}

function opacity(selectedImg){
    const selectedAnswer = selectedImg.dataset.choiceId;

    const answers = selectedImg.parentNode.querySelectorAll('div');

    for (const unselectedAnswer of answers){
        if(unselectedAnswer.dataset.choiceId !== selectedAnswer){
            unselectedAnswer.classList.add('opacity');
            unselectedAnswer.querySelector('.checkbox').src = './images/unchecked.png';
            unselectedAnswer.classList.remove('selected');
        }
    }
}

function select(event){
    const selectedImg = event.currentTarget;
    selectedImg.classList.add('selected');
    selectedImg.classList.remove('opacity')

    const check = selectedImg.querySelector('.checkbox');
    check.src = "./images/checked.png";

    opacity(selectedImg);
    addAnswer(selectedImg);
}

const finalAnswers = {};

const boxes = document.querySelectorAll('.choice-grid div');
for (const box of boxes)
{
    box.addEventListener('click', select);
}

//api ricerca marvel



let ts="1681802982683";
let publicKey="345678fg5"
let hashVal="afcbe1dde7d32a25088b712beb8b3fe0";

let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");

let date = new Date();
console.log(date.getTime());

const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

function displayWords(value) {
  input.value = value;
  removeElements();
}

function removeElements() {
  listContainer.innerHTML = "";
}

input.addEventListener("keyup", async () => {
  removeElements();
  if (input.value.length < 4) {
    return false;
  }

  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;

  const response = await fetch(url);
  const jsonData = await response.json();

  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + name + "')");
    let word = "<b>" + name.substr(0, input.value.length) + "</b>";
    word += name.substr(input.value.length);
    div.innerHTML = `<p class="item">${word}</p>`;
    listContainer.appendChild(div);
  });
});

button.addEventListener(
  "click",
  (getRsult = async () => {
    if (input.value.trim().length < 1) {
      alert("Input non può essere vuoto ");
    }
    showContainer.innerHTML = "";
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;

    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.data["results"].forEach((element) => {
      showContainer.innerHTML = `<div class="card-container">
        <div class="container-character-image">
        <img src="${
          element.thumbnail["path"] + "." + element.thumbnail["extension"]
        }"/></div>
        <div class="character-name">${element.name}</div>
        <div class="character-description">${element.description}</div>
        </div>`;
    });
  })
);
window.onload = () => {
  getRsult();
};
// api spotify

function onJson(json) {

    const library=document.querySelector("#album-view");
    library.innerHTML='';
    
    const results=json.albums.items;
    let num _results=results.lenght;
    
    if(num_results>5)
    num_results=5;
    
    for(let i=0;i<num_results;i++)
    {
      
    const album_data = results[i]
   
    const title = album_data.name;
    const selected_image = album_data.images[0].url;
   
    const album = document.createElement('div');
    album.classList.add('album');
   
    const img = document.createElement('img');
    img.src = selected_image;
   
    const caption = document.createElement('span');
    caption.textContent = title;
       album.appendChild(img);
    album.appendChild(caption);
   
    library.appendChild(album);





    }

}
function search (event)
{

    event.preventDefault();

    const album_input=document.querySelector("#album");
 


    const album_value = encodeURIComponent(album_input.value);
    console.log('Eseguo ricerca: ' + album_value);
   
    fetch("https://api.spotify.com/v1/search?type=album&q=" + album_value,
      {
        headers:
        {
          'Authorization': 'Bearer ' + token
        }
      }
    ).then(onResponse).then(onJson);
  }
  
  function onTokenJson(json)
  {
  
    token = json.access_token;
  }
  
  function onTokenResponse(response)
  {
    return response.json();
  }
  
  
  const client_id = '1e65ce71e0324eac83cd4f622ce3503b';
  const client_secret = 'a30fa723a9ae48dc86aab3b5ebdb6dab';
  

  let token;
  
  fetch("https://accounts.spotify.com/api/token",
      {
     method: "post",
     body: 'grant_type=client_credentials',
     headers:
     {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
     }
    }
  ).then(onTokenResponse).then(onTokenJson);
  
  const form = document.querySelector('form');
  form.addEventListener('submit', search)
