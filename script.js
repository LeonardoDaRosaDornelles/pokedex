const pokemonNome = document.querySelector('.pokemon_name')

const pokemonNum = document.querySelector('.pokemon_number')

const pokemonImg = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')

const input = document.querySelector('.input_search')

const prox = document.querySelector('.btn-next')

const anterior = document.querySelector('.btn-prev')

let NumPokemon = 1

const fetchpokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200){
        const data = APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) =>{

    pokemonNome.innerHTML = 'Carregando...';

    const data = await fetchpokemon(pokemon);

    if(data){
        pokemonImg.style.display = 'block';

        pokemonNome.innerHTML = data.name;

        pokemonNum.innerHTML = data.id;

        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        NumPokemon = data.id
        
    }else{
        pokemonImg.style.display = 'none';
        pokemonNome.innerHTML = 'Não encontrado';
        pokemonNum.innerHTML = '';
    }
}


form.addEventListener('submit',(event) =>{
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    input.value = '';
})

anterior.addEventListener('click',() =>{
    if (NumPokemon > 1){
        NumPokemon -= 1;
        renderPokemon(NumPokemon);
    }
})

prox.addEventListener('click',() =>{
    NumPokemon += 1;
    renderPokemon(NumPokemon);
})

renderPokemon(NumPokemon);