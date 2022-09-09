const handleCalc = (array, number) => {
  const slice = array.slice(0, number)
  let factor = number - 7
  let sum = 0

  for (let i = number; i >= 1; i--) {
    const n = slice[number - i]
    sum += n * factor--
    if (factor < 2) factor = 9
  }

  const result = 11 - (sum % 11)

  return result > 9 ? 0 : result
}

function handleValidateCnpj(cnpj) {

  if (!cnpj) return false;

  if (cnpj.length > 14) return false;

  const digitsOnly = /^\d{14}$/.test(cnpj);

  if (!digitsOnly) return false;

  const match = cnpj.toString().match(/\d/g);
  const numbers = Array.isArray(match) ? match.map(Number) : [];

  if (numbers.length !== 14) return false;
  
  const items = [...new Set(numbers)];
  if (items.length === 1) return false;

  const digits = numbers.slice(12);
  
  const numbersLenghtWithoutTwoDigits = 14 - 2;
  const digit0 = handleCalc(numbers, numbersLenghtWithoutTwoDigits);
  if (digit0 !== digits[0]) return false

  const numbersLenghtWithoutOneDigit = 14 - 1;
  const digit1 = handleCalc(numbers, numbersLenghtWithoutOneDigit)
  return digit1 === digits[1]
}

function clearInputs(text) {
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function handleValidateName(name){
  return name.length > 3;
}
function handleValidateCep(cep){
  return cep.length === 8;
}
function addIsInvalidFieldClass(id) {
  document.querySelector(`#${id}`).classList.add('invalid-field');
}
function removeIsInvalidFieldClass(id){
  document.querySelector(`#${id}`).classList.remove('invalid-field');
}


//criando a função para  salvar o formulário
function saveForm(event){
  
  //para evitar que a pagina fiquei carregando 
  event.preventDefault();

  //objeto contendo chaves onde se tem os dados importantes do formulário
  const data = {
    cnpj: document.querySelector('#cnpj').value,
    name: clearInputs(document.querySelector('#name').value),
    cep: document.querySelector('#cep').value,
    address: document.querySelector('#address').value,
    number: document.querySelector('.input-number').value,
    district: document.querySelector('#district').value,
  }

  const isValidCnpj = handleValidateCnpj(data.cnpj);
  if(!isValidCnpj){
    addIsInvalidFieldClass('cnpj');
    return;
  }
  removeIsInvalidFieldClass('cnpj');

  const isValidName = handleValidateName(data.name);
  if(!isValidName) {
    addIsInvalidFieldClass('name');
    return;
  }
  removeIsInvalidFieldClass('name');

  const isValidCep = handleValidateCep(data.cep);
  if(!isValidCep) { 
    addIsInvalidFieldClass('cep');
    return;
  }
  removeIsInvalidFieldClass('cep');
  
  //criando uma varia table
  const table = document.querySelector('#table-content');
  //criando uma string, o que eu quero que apareça a na tabela
  const newLine = `
  <td>${data.cnpj}</td>
  <td>${data.name}</td>
  <td><a>Edit</a></td>
  `
  //criando um no tr
  const node = document.createElement('tr');
  //atribuindo a newLine  ao no onde fica a parte mais interna do innerHTML
  node.innerHTML = newLine;
  //adicionando o no <tr> ao filho table 
  table.appendChild(node);
  //criando o formulario
  const form =document.querySelector('.form');
  //resentando o formulário 
  form.reset();
}
