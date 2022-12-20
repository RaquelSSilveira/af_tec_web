function novoElemento(tagName, className) {
    const elemento = document.createElement(tagName)
    elemento.className = className
    return elemento
}

function Barreira(reversa = false) {
    this.elemento = novoElemento('div', 'barreira')
    const borda = novoElemento('div', 'borda')
    const corpo = novoElemento('div', 'corpo')
    this.elemento.appendChild(reversa ? corpo : borda)
    this.elemento.appendChild(reversa ? borda : corpo)

    this.setAltura = altura => corpo.style.height = `${altura}px`

}

/* const b= new Barreira(false)
b.setAltura(500)
document.querySelector('[wm-flappy]').appendChild(b.elemento) */  



function ParDeBarreiras(altura, abertura, popsicaoNaTela) {
    this.elemento = novoElemento('div', 'par-de-barreiras')
    this.superior = new Barreira(true)
    this.inferior = new Barreira(false)

    this.elemento.appendChild(this.superior.elemento)
    this.elemento.appendChild(this.inferior.elemento)


    this.sortearAbertura = () => {
        const alturaSuperior = Math.random() * (altura - abertura)
        const alturaInferior = altura - abertura - alturaSuperior
        this.superior.setAltura(alturaSuperior)
        this.inferior.setAltura(alturaInferior)
    }
    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX =  popsicaoNaTela => this.elemento.style.left = `${popsicaoNaTela}px`
    this.getLargura = () => this.elemento.clientWidth

    this.sortearAbertura()
    this.setX(popsicaoNaTela)
} 

/* const b= new ParDeBarreiras(500,300,1000)
document.querySelector('[wm-flappy]').appendChild(b.elemento)  */

function Barreiras(altura, largura, abertura, espaco, notificarPonto) {
    this.pares = [
        new ParDeBarreiras(altura, abertura, largura),
        new ParDeBarreiras(altura, abertura, largura + espaco),
        new ParDeBarreiras(altura, abertura, largura + espaco * 2),
        new ParDeBarreiras(altura, abertura, largura + espaco * 3)
    ]

    const deslocamento = 3
    this.animar = () => {
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento)

            if (par.getX() < -par.getLargura()) {
                par.setX(par.getX() + espaco * this.pares.length)
                par.sortearAbertura()
            }
            const meio = largura / 2
            const cruzouMeio = par.getX() + deslocamento >= meio
                && par.getX() < meio
            if (cruzouMeio) {
                notificarPonto()
            }
        })
    }
}

/* const barreiras = new Barreiras(700, 400, 200, 400)
const areaDoJogo = document.querySelector('[wm-flappy]')

barreiras.pares.forEach( par => areaDoJogo.appendChild(par.elemento)) 

setInterval(() => {
    barreiras.animar()
},20)  */

function personagens(){
    const personagen = document.getElementById('personagens-select')
    switch(personagen.value){
            
        case 'passaro':
            return 'img/passaro.png'
            break;

        case 'Nave':
            return 'img/nave1.png'
            break;

        case 'AngryBird':
            return 'img/angrybird.png'
            break;
        
    }

}


function Passaro(alturaJogo,subir,descer) {
    let voando = false



    this.elemento = novoElemento('img', 'passaro')
    this.elemento.src = personagens();

    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setY = y => this.elemento.style.bottom = `${y}px`

    window.onkeydown = e => voando = true
    window.onkeyup = e => voando = false

    this.animar = () => {
        const novoY = this.getY() + (voando ? subir : descer)
        const alturaMaxima = alturaJogo - this.elemento.clientWidth

        if (novoY <= 0) {
            this.setY(0)
        } else if (novoY >= alturaMaxima) {
            this.setY(alturaMaxima)
        } else {
            this.setY(novoY)
        }
    }
    this.setY(alturaJogo / 2)
}

/* const barreiras = new Barreiras(700, 400, 200, 400)
const passaro = new Passaro(700)

const areaDoJogo = document.querySelector('[wm-flappy]')

areaDoJogo.appendChild(passaro.elemento)
barreiras.pares.forEach( par => areaDoJogo.appendChild(par.elemento)) 

setInterval(() => {
      barreiras.animar()
      passaro.animar() 
},20) */


 function Progresso() {
    
    this.elemento = novoElemento('span', 'progresso')
    this.atualizarPontos = pontos => {
        this.elemento.innerHTML = pontos
    }
    this.atualizarPontos(0)
  
}

/*  const barreiras = new Barreiras(700, 400, 200, 400)
const passaro = new Passaro(700)

const areaDoJogo = document.querySelector('[wm-flappy]')

areaDoJogo.appendChild(passaro.elemento)
barreiras.pares.forEach( par => areaDoJogo.appendChild(par.elemento))  */


 function estaoSobrepostos(elementoA, elementoB) {

    const a = elementoA.getBoundingClientRect()
    const b = elementoB.getBoundingClientRect()
    const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left
    const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top

    return horizontal && vertical
}

function colidiu(passaro, barreiras) {
    let colidiu = false

    barreiras.pares.forEach(parDeBarreiras => {
        if (!colidiu) {
            const superior = parDeBarreiras.superior.elemento
            const inferior = parDeBarreiras.inferior.elemento
            colidiu = estaoSobrepostos(passaro.elemento, superior)
                || estaoSobrepostos(passaro.elemento, inferior)
        }
    })
    return colidiu

}

 function FlappyBird() {
    
    const velocidade = velocidadeJogo();
    const valor_pontuacao = pontuacao();
    const intervalo_canos =  intervalo();
    const [subir, descer] = velocidadePersonagem();
    const abertura_canos = abertura();

    let pontos = 0
    const areaDoJogo = document.querySelector('[wm-flappy]')
    const altura = areaDoJogo.clientHeight
    const largura = areaDoJogo.clientWidth

    const progresso = new Progresso()
    const barreiras = new Barreiras(altura, largura, abertura_canos, intervalo_canos,
        () => progresso.atualizarPontos(pontos += valor_pontuacao))

    const passaro = new Passaro(altura,subir,descer)

    areaDoJogo.appendChild(progresso.elemento)
    areaDoJogo.appendChild(passaro.elemento)
    barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento))

    this.start = () => {
        const inputModeReal = document.getElementById('input-modo-real')
        const nome = document.getElementById('nome');

        if(inputModeReal.checked != true) alert(`Para sair do modo de treino selecione o modo Real em configurações`);
        const temporizador = setInterval(() => {
            barreiras.animar()
            passaro.animar()

              if(colidiu(passaro,barreiras) && inputModeReal.checked){
                 clearInterval(temporizador) 
                 //let pontos = progresso()
                 //const areaDoJogo = document.querySelector('[wm-flappy]')
                 areaDoJogo.removeChild(progresso.elemento)
                 areaDoJogo.removeChild(passaro.elemento)
                 barreiras.pares.forEach(par => areaDoJogo.removeChild(par.elemento))
                 alert(` ${nome.value} sua pontuação foi ${pontos}`);
                 //document.location.reload(true);*/
             } else{

             }
        },velocidade)
    }
}

function velocidadeJogo (){

    let valor_velocidade = 0;
    const velocidade = document.getElementById('velocidade-select');

    switch(velocidade.value){
            
        case '1':
            valor_velocidade = 40;
            break;

        case '2':
            valor_velocidade = 35;
            break;

        case '3':
            valor_velocidade = 30;
            break; 
                
        case '4':
            valor_velocidade = 25;
            break;

        case '5':
            valor_velocidade = 20;
            break;

        case '6':
            valor_velocidade = 18;
            break; 
            
        case '7':
            valor_velocidade = 16;
            break;

        case '8':
            valor_velocidade = 14;
            break;

        case '9':
            valor_velocidade = 12;
            break;

        case '10':
            valor_velocidade = 10;
            break; 
    }
    return valor_velocidade;

}

function pontuacao (){
    let valor_pontuacao = 1;
    const pontuacao = document.getElementById('pontuacao-select')

    if(pontuacao.value != 1){
        valor_pontuacao = (pontuacao.value == 10)? valor_pontuacao = 10: valor_pontuacao = 100
   }

   return valor_pontuacao;

}

function intervalo (){

    let valor_intervalo = 400;

    const input_intervalo_facil = document.getElementById('intervalo_facil');
    const input_intervalo_normal = document.getElementById('intervalo_normal');

    if(input_intervalo_normal.checked != true){
        valor_intervalo = (input_intervalo_facil.checked == true)? valor_intervalo = 600: valor_intervalo = 200
    }

    return valor_intervalo

}

function velocidadePersonagem (){

    let subir = 0;
    let descer = 0;

    const velocidade_personagem = document.getElementById('velocidade-personagem-select')

    switch(velocidade_personagem.value){
            
        case 'Baixa':
            subir = 4;
            descer = -3;
            break;

        case 'Média':
            subir = 8;
            descer = -5;
            break;

        case 'Alta':
            subir = 12;
            descer = -7;
            break; 
    }
    
    return [subir, descer];

}

function abertura(){

    let valor_abertura = 300;
    
    const input_abertura_facil = document.getElementById('abertura_facil');
    const input_abertura_media = document.getElementById('abertura_media');


    
    if(input_abertura_facil.checked != true){
        valor_abertura =  (input_abertura_media.checked == true)? valor_abertura = 250 : valor_abertura = 200;
    }
    return valor_abertura;

}

document.addEventListener('DOMContentLoaded', () => {

      const html = document.querySelector('html')
      const inputDarkMode = document.getElementById('input-dark-mode')
      const inputLightMode = document.getElementById('input-light-mode')
      

      inputDarkMode.addEventListener('change', () => {
        if(inputDarkMode.checked){
          html.setAttribute("dark", "true")
          localStorage.setItem('dark-mode', true)
        }
      })

      inputLightMode.addEventListener('change', () => {
        if(inputLightMode.checked){
            html.removeAttribute("dark")
            localStorage.removeItem('dark-mode')
          
        }
        })   

})

function iniciar(){

    new FlappyBird().start()

} 