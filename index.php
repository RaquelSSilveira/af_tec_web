<?php
include_once('config.php');
if (isset($_POST['submit'])) {
    $nome_jogador = $_POST['nome-do-jogador'];
    $cenario = $_POST['cenario'];
    $abertura = $_POST['abertura_canos'];
    $distancia = $_POST['intervalo_canos'];
    $velocidade_jogo = $_POST['velocidade'];
    $personagem = $_POST['personagem'];
    $modo = $_POST['modo'];
    $velocidade_personagem = $_POST['velocidade_personagem'];
    $tipo_pontuacao = $_POST['tipo_pontuacao'];

    $result = mysqli_query($conexao, "INSERT INTO jogador(nome_jogador,cenario,abertura,distancia,velocidade_jogo,personagem,modo,velocidade_personagem,tipo_pontuacao) 
    VALUES('$nome_jogador', '$cenario','$abertura','$distancia','$velocidade_jogo','$personagem','$modo','$velocidade_personagem','$tipo_pontuacao')");
}

?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta content-type:application charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flappy Bird</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <link rel="stylesheet" href="css/flappy.css" content-type="text/css">
</head>

<body class="conteudo">
    <h1>Flappy Bird</h1>

    <div class="grid">
        <div wm-flappy>

            <!-- 
            <img class="passaro" src="img/passaro.png" alt="passaro">
                <div class="par-de-barreiras">
                    <div class="barreira">
                        <div class="corpo"> </div>
                        <div class="borda"></div>
                    </div>
                    <div class="barreira">
                        <div class="borda"> </div>
                        <div class="corpo"></div>
                    </div>
                </div>
                <div class="progresso"> 10 </div>   -->
        </div>
        <form action="index.php" method="post" ajax="true">
            <div class="configuracao">
                <h1>Configurações do Jogo</h1>
                <div class="formulario">
                    <span class="selects">
                        <label for="nome">Nome:</label>
                        <input type="text" id='nome' name="nome-do-jogador" value="jogador" required>
                    </span>
                </div>

                <div class="formulario">
                    <span class="selects">
                        <label for="cenario">Cenário:</label>
                        <label for="input-light-mode">Diurno</label>
                        <input type="radio" id="input-light-mode" name="cenario" value="Diurno" checked>
                        <label for="input-dark-mode">Noturno</label>
                        <input type="radio" id="input-dark-mode" name="cenario" value="Noturno">
                    </span>
                </div>

                <div class="formulario">

                    <span class="selects"> Abertura entre Canos:
                        <input type="radio" id="abertura_facil" name="abertura_canos">
                        <label for="abertura_facil">Fácil</label>
                        <input type="radio" id="abertura_media" name="abertura_canos" checked>
                        <label for="abertura_media">Média</label>
                        <input type="radio" id="abertura_dificil" name="abertura_canos">
                        <label for="abertura_dificil">Difícil</label>
                    </span>
                </div>

                <div class="formulario">

                    <span class="selects">Distância entre Canos:
                        <input type="radio" id="intervalo_facil" name="intervalo_canos">
                        <label for="intervalo_facil">Fácil</label>
                        <input type="radio" id="intervalo_normal" name="intervalo_canos" checked>
                        <label for="intervalo_normal">Normal</label>
                        <input type="radio" id="intervalo_dificil" name="intervalo_canos">
                        <label for="intervalo_dificil">Difícil</label>
                    </span>
                </div>

                <div class="formulario">
                    <span class="selects">
                        <label for="velocidade-select">Velocidade do Jogo:</label>
                        <select id="velocidade-select" name="velocidade" required>
                            <option>3</option>
                            <option>1</option>
                            <option>2</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </select>
                    </span>
                </div>

                <div class="formulario">
                    <span class="selects">
                        <label for="personagens-select">Personagens:</label>
                        <select id="personagens-select" name="personagem">
                            <option>passaro</option>
                            <option>Nave</option>
                            <option>AngryBird</option>
                        </select>
                    </span>
                </div>

                <div class="formulario">
                    <span class="selects">Tipo de Jogo:
                        <input type="radio" id="input-modo-real" name="modo" value="Real" checked>
                        <label for="input-modo_real">Real</label>
                        <input type="radio" id="input-modo-treino" name="modo" value="Treino">
                        <label for="input-modo-teste">Treino</label>
                    </span>
                </div>

                <div class="formulario">
                    <span class="selects">
                        <label for="velocidade-personagem-select">Velocidade do Personagem: </label>
                        <select id="velocidade-personagem-select" name="velocidade_personagem" required>
                            <option>Baixa</option>
                            <option>Média</option>
                            <option>Alta</option>
                        </select>
                    </span>
                </div>

                <div class="formulario">
                    <span class="selects">
                        <label for="pontuacao-select"> Pontuação:</label>
                        <select id="pontuacao-select" name="tipo_pontuacao" required>
                            <option>1</option>
                            <option>10</option>
                            <option>100</option>
                        </select>
                    </span>
                </div>

                <div class="formulario">
                    <label for="submit"></label>
                    <input type ="submit" id="submit" name="submit" value="submit" onclick="iniciar()">
                </div>
            </div>
        </form>
    </div>

 <script src="js/flappy.js" type="text/javascript"></script>
    <!-- <script>
        function stopDefAction(e) {
            e.preventDefault();
    }

        document.getElementById('submit').addEventListener('click', stopDefAction, false);
    </script>  -->
</body>

</html>