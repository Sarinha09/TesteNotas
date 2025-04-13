let pontos = 0;
    let faseAtual = 1;
    let sequenciaNotas = [];

    const fases = [
      ["♫", "♫", "♫", "♪","♪","♭"],                   
      ["♪", "♫","𝄢","𝄢","𝄢","𝄢"],              
      ["♬", "♫", "♫", "♭","♭","♭"],         
      ["♩", "♬", "♫", "♫","♪","♭","♪","♪"],    
      ["♫", "𝄢","♫","♫", "𝄢", "♪", "♭","♭","♭"]
    ];


    const notaImagens = {
        "♫": "imagens/nota1.png",
        "♬": "imagens/nota2.png",
        "♪": "imagens/nota3.png",
        "𝄢": "imagens/nota4.png",
        "♩": "imagens/nota5.png",
        "♭": "imagens/nota6.png"
      };

    function gerarSequenciaNotas(fase) {
        const alvoDiv = document.getElementById("alvo");
        alvoDiv.innerHTML = ""; // Limpa antes de adicionar novas imagens
    
        if (fase <= fases.length) {
            sequenciaNotas = fases[fase - 1];
    
            sequenciaNotas.forEach(nota => {
                const imgNota = document.createElement("img");
                imgNota.src = notaImagens[nota] || "imagens/imagem_indisponivel.png"; 
                imgNota.alt = nota;
                imgNota.classList.add("nota-img");
                imgNota.style.width = "50px"; 
                imgNota.style.margin = "5px";
    
                alvoDiv.appendChild(imgNota);
            });
    
        } else {
            sequenciaNotas = [];
            alvoDiv.innerText = "🏁 Você terminou todas as fases!";
            document.getElementById("resposta").innerText = "Parabéns! 🎉";
        }
    }

    // Atualiza os dados de pontuação e fase na interface
    function atualizarPontuacao() {
      document.getElementById("pontos").innerText = pontos;
      document.getElementById("fase").innerText = faseAtual;
    }

    // Execução do programa Blockly
    function executar() {
      let code = javascriptGenerator.workspaceToCode(workspace);
      code = `[${code.trim().replace(/,+$/, '')}]`;

      let comandos = [];
      try {
        comandos = eval(code);
      } catch (e) {
        document.getElementById("resposta").innerText = "Erro: " + e.message;
        return;
      }

      const alvo = sequenciaNotas;
      const saidaDiv = document.getElementById("saidaNotas");
      const resposta = document.getElementById("resposta");

      saidaDiv.innerHTML = "";
      resposta.innerText = "";

      let i = 0;

      function tocarProximaNota() {
        if (i >= comandos.length) {
            if (i === alvo.length) {
                resposta.innerText = "✅ Acertou tudo!";
                mostrarModal("Parabéns, você acertou!", true);
              }
              else {
            resposta.innerText = "⚠️ Faltaram notas!";
       
          }
          return;
        }

        const nota = comandos[i];
        const span = document.createElement("span");
        span.innerText = nota;
        span.style.padding = "5px";
        span.style.fontWeight = "bold";
        span.style.fontSize = "24px";
        span.style.transition = "transform 0.3s";
        span.style.margin = "5px";
        span.style.color = "black";
        span.style.background = "yellow";

        // Animação de pulo
        span.animate([
          { transform: 'translateY(0)' },
          { transform: 'translateY(-10px)' },
          { transform: 'translateY(0)' }
        ], {
          duration: 300,
          easing: 'ease'
        });

        saidaDiv.appendChild(span);

        // Som
        const audio = document.getElementById("audio_" + nota);
        if (audio) {
          audio.currentTime = 0;
          audio.play();
        }

        // Verificação
        if (nota !== alvo[i]) {
            resposta.innerText = `❌ Errou na nota ${i + 1}: esperava "${alvo[i]}" mas tocou "${nota}"`;
            span.style.background = "red";
          
            // Mostrar modal de erro
            mostrarModal(`Você errou na nota ${i + 1}!`, false);
            return;
          }
          

        i++;
        setTimeout(tocarProximaNota, 800);
      }

      tocarProximaNota();
    }

    function mostrarModal(mensagem, acertou) {
        const modal = document.getElementById("modal");
        const modalMensagem = document.getElementById("modalMensagem");
        const btnProxima = document.getElementById("btnProximaFase");
      
        modalMensagem.innerText = mensagem;
        modal.classList.remove("hidden");
      
        if (acertou) {
          btnProxima.classList.remove("hidden");
        } else {
          btnProxima.classList.add("hidden");
        }
      }
      
      // Evento botão "Fechar"
      document.getElementById("btnFechar").onclick = function () {
        document.getElementById("modal").classList.add("hidden");
      };
      
      // Evento botão "Próxima Fase"
      document.getElementById("btnProximaFase").onclick = function () {
        document.getElementById("modal").classList.add("hidden");
      
        pontos += 10;
        faseAtual += 1;
        atualizarPontuacao();
        gerarSequenciaNotas(faseAtual);
      
        // Resetar Blockly
        workspace.clear();
      };
      

    // Início do jogo
    gerarSequenciaNotas(faseAtual);
    atualizarPontuacao();