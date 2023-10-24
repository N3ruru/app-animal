async function carregarAnimais(){
   const response = await axios.get('http://127.0.0.1:8000/animais');
   const animais = response.data;
   const lista = document.getElementById('lista_animais');
   lista.innerHTML = "";
   for (const animal of animais) {
      const buttonExcluir = document.createElement('button');
      buttonExcluir.textContent = "Excluir";
      buttonExcluir.onclick = function(event) {
         excluiAnimal(event.target.parentNode.id);
      }
      const buttonAbrir = document.createElement('button');
      buttonAbrir.textContent = "Visualizar";
      buttonAbrir.onclick = function(event) {
         visualizaAnimal(event.target.parentNode.id);
      }
      const item = document.createElement('li');
      item.id = animal.id;
      const linha = `${animal.nome}`
      item.innerText = linha;
      lista.appendChild(item);
      item.appendChild(buttonAbrir);
      item.appendChild(buttonExcluir);
   }
}

async function manipularFormulario(){
   const formulario = document.getElementById('form_animal');
   const input_nome = document.getElementById('nome');
   const input_sexo = document.getElementById('sexo');
   const input_idade = document.getElementById('idade');
   const input_cor = document.getElementById('cor');

   formulario.onsubmit = async (event)=> {
      event.preventDefault();
      const nome_animal = input_nome.value;
      const nome_sexo = input_sexo.value;
      const nome_idade = input_idade.value;
      const nome_cor = input_cor.value;

      await axios.post('http://127.0.0.1:8000/animais', {
         nome: nome_animal,
         idade: nome_idade,
         sexo: nome_sexo,
         cor: nome_cor
      })
      carregarAnimais();
   }
   
}

async function excluiAnimal(id){
   const urlDoAnimal = `http://127.0.0.1:8000/animais/${id}`
   await axios.delete(urlDoAnimal);
   console.log(urlDoAnimal);
   carregarAnimais();
}

async function visualizaAnimal(id){
   carregarAnimais();
   const urlDoAnimal = `http://127.0.0.1:8000/animais/${id}`
   const response = await axios.get(urlDoAnimal);
   const animal = response.data;
   const sublista = document.createElement('ul');
   const item = document.getElementById(`${id}`);
   item.appendChild(sublista);
   const sexo = document.createElement('li');
   const idade = document.createElement('li');
   const cor = document.createElement('li');
   sexo.innerText = `Sexo: ${animal.sexo}`;
   idade.innerText = `Idade: ${animal.idade} anos`;
   cor.innerText = `Cor: ${animal.cor}`;
   sublista.appendChild(sexo);
   sublista.appendChild(idade);
   sublista.appendChild(cor);
}

async function app(){
   console.log('App Iniciada');
   carregarAnimais();
   manipularFormulario();
}

app();