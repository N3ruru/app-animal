async function carregarAnimais(){
   const response = await axios.get('http://127.0.0.1:8000/animais');
   const animais = response.data;
   const lista = document.getElementById('lista_animais');
   if(lista.innerHTML!==""){
      const item = document.createElement('li');
      const animal = animais.pop();
      const linha = `${animal.nome}:\n idade: ${animal.idade}\n cor: ${animal.cor}\n sexo: ${animal.sexo}`
      item.innerText = linha;
      lista.appendChild(item);
   } else{
      for (const animal of animais) {
         const item = document.createElement('li');
         const linha = `${animal.nome}:\n\tidade: ${animal.idade}\n\tcor: ${animal.cor}\n\tsexo: ${animal.sexo}`
         item.innerText = linha;
         lista.appendChild(item);
      }
   }
}

async function manipularFormulario(){
   const formulario = document.getElementById('form_animal');
   const input_nome = document.getElementById('nome');

   formulario.onsubmit = async (event)=> {
      event.preventDefault();
      const nome_animal = input_nome.value;

      await axios.post('http://127.0.0.1:8000/animais', {
         nome: nome_animal,
         idade: 4,
         sexo: "Femea",
         cor: "Branco"
      })
      carregarAnimais();
      alert(`Animal ${nome_animal} Cadastrado`); 
   }
   
}


async function app(){
   console.log('App Iniciada');
   carregarAnimais();
   manipularFormulario();
}

app();