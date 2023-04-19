let classificacoes = [];
let categories = [];
let objCategories = null

$('#resultado').html('&nbsp;');
$('#classe').val('');
$('#arquivos').html('');
$('#categoria').html('');

$.getJSON('./js/categories.json', function(result){
	categories.push(result)

	objCategories = categories[0]
	console.log(objCategories)

	let textEtrash = `<div class="bg-light" style="padding: 12px;" align="right"><b><span class='text-dark'></span></b></div>`
	$("#background-div").html(textEtrash)
})

function abrir() {
	$('#categoria').html('')
	let exibicao = document.querySelector('#exibicao');
	let captura = document.querySelector('#captura');
	let file = document.querySelector('input[type=file]').files[0];
	let reader = new FileReader();

	if(file) {
		reader.readAsDataURL(file);
		let arquivos = $('#arquivos').html().toString().trim();
		if(arquivos.indexOf('%') < 0) {
			if(arquivos.length > 0)
				$('#arquivos').html(arquivos+', '+file.name);
			else
				$('#arquivos').html(file.name);	
		}
	}else {
		exibicao.src = './img/icon.png';
		captura.src = './img/icon.png';
	}

	reader.onloadend = function() {
		exibicao.src = reader.result;
		captura.src = reader.result;
	}
	$('#resultado').text('...');
}

function classificar() {
	$('#resultado').text('... classificando.');
	let className = $('#classe').val().trim();
	if(className.length <= 0) className = 'Classe INDEFINIDA';

	const img = document.getElementById('captura');
	const arrPixels = tf.browser.fromPixels(img).arraySync();

	const objClasse = {Class: className, Pixels: arrPixels};
	classificacoes.push(objClasse);

	const resultado = 
	`<b>CLASSIFICADO como <span class='text-danger-themex'>${className.toUpperCase()}</span></b>`;
	$('#resultado').html(resultado);
}

function prever() {
	$('#resultado').text('... processando predição.');
	$('#classe').val('...');
	$('#arquivos').text('...');
	

	const img = document.getElementById('captura');
	const tfPixels1 = tf.browser.fromPixels(img);

	let arrDiferencas = [];
	let arrClassName = [];
	for(let i=0; i<classificacoes.length; i++) {
		const className = classificacoes[i].Class.trim();
		const tfPixels2 = tf.tensor(classificacoes[i].Pixels);

		const diferenca = tfPixels1.sub(tfPixels2).abs().sum().arraySync();
		arrClassName.push(className);
		arrDiferencas.push(diferenca);
	}

	const menor = tf.tensor(arrDiferencas).min().arraySync();
	const maior = tf.tensor(arrDiferencas).max().arraySync();
	const percentPositivo = parseFloat(100-((menor/(menor+maior))*100)).toFixed(8);
	const percentNegativo = parseFloat(100-percentPositivo).toFixed(8);
	let index = 0;
	for(let i=0; i<arrDiferencas.length; i++) {
		if(arrDiferencas[i]==menor) index = i;
	}

	const classificacao = arrClassName[index].toString().trim();
	$('#resultado').html(`<b><span class='text-danger-themex'>${classificacao.toUpperCase()}</span></b>`);
	$('#classe').val(classificacao);
	
	const probabilidades = 
	`${percentPositivo}% de probabilidades de pertencer a classe ${classificacao}.\r\n` +
	`${percentNegativo}% de probabilidades de pertencer a outras classes.`;
	$('#arquivos').html(probabilidades);

	let categoryTrash = {
		green: "E-LIXO GRUPO VERDE",
		blue: "E-LIXO GRUPO AZUL",
		brown: "E-LIXO GRUPO MARROM",
		white: "E-LIXO GRUPO BRANCO",
	}
	
	if (objCategories.blue.find(target => target === classificacao) == classificacao) {
		let textEtrash = `<div class="bg-light" style="padding: 12px;" align="right"><b><span class='text-info'>${classificacao} | ${categoryTrash.blue}</span></b></div>`
		$("#background-div").html(textEtrash)
	}
	
	if (objCategories.green.find(target => target === classificacao) == classificacao) {
		let textEtrash = `<div class="bg-light" style="padding: 12px;" align="right"><b><span class='text-success'>${classificacao} | ${categoryTrash.green}</span></b></div>`
		$("#background-div").html(textEtrash)
	}
	
	if (objCategories.brown.find(target => target === classificacao) == classificacao) {
		let textEtrash = `<div class="bg-light" style="padding: 12px;" align="right"><b><span class='text-brown'>${classificacao} | ${categoryTrash.brown}</span></b></div>`
		$("#background-div").html(textEtrash)
	}
	
	if (objCategories.white.find(target => target === classificacao) == classificacao) {
		let textEtrash = `<div class="bg-light" style="padding: 12px;" align="right"><b><span class='text-dark'>${classificacao} | ${categoryTrash.white}</span></b></div>`
		$("#background-div").html(textEtrash)
	}
}

