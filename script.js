const botoes = document.querySelectorAll(".servico");
const imagens = document.querySelectorAll(".imagens-servicos");

if (botoes.length > 0 && imagens.length > 0) {
    botoes[0].classList.add('ativo');
    imagens.forEach((img, index) => {
        img.style.display = index === 0 ? "block" : "none";
    });
}

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        botoes.forEach(b => b.classList.remove("ativo"));
        botao.classList.add("ativo");

        imagens.forEach((img, index) => {
            img.style.display = index === Array.from(botoes).indexOf(botao) ? "block" : "none";
        });
    });
});

// Carrossel infinito duplicando os círculos
document.addEventListener('DOMContentLoaded', () => {
    const carrosselInner = document.querySelector('.carrossel-inner');
    if (carrosselInner) {
        // Duplicar os círculos para efeito infinito
        carrosselInner.innerHTML += carrosselInner.innerHTML;
    }
    
});


document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.slider img');
    const navLinks = document.querySelectorAll('.slider-nav a');
    let current = 0;
    let interval;

    // Função para mostrar o slide desejado com animação lateral
    function showSlide(index) {
        if (index === current) return; // Evita animação se for o mesmo slide
        const direction = index > current ? 'right' : 'left'; // Define direção da animação
        const prevImg = images[current];
        const nextImg = images[index];

        // Remove todas as classes de animação antigas
        images.forEach(img => {
            img.classList.remove('slide-in-right', 'slide-in-left', 'slide-out-right', 'slide-out-left');
        });

        // Exibe o próximo slide e adiciona classe de animação de entrada
        nextImg.style.display = 'block';
        nextImg.classList.add(direction === 'right' ? 'slide-in-right' : 'slide-in-left');

        // Adiciona classe de animação de saída ao slide anterior
        prevImg.classList.add(direction === 'right' ? 'slide-out-left' : 'slide-out-right');

        // Após a animação, oculta o slide anterior e remove classes de animação
        setTimeout(() => {
            prevImg.style.display = 'none';
            nextImg.classList.remove('slide-in-right', 'slide-in-left');
            prevImg.classList.remove('slide-out-right', 'slide-out-left');
        }, 500); // duração da animação

        // Atualiza o botão ativo
        navLinks.forEach((link, i) => {
            link.classList.toggle('active', i === index);
        });
        current = index;
    }

    // Avança para o próximo slide
    function nextSlide() {
        let next = (current + 1) % images.length;
        showSlide(next);
    }

    // Inicia o avanço automático dos slides
    function startAutoSlide() {
        interval = setInterval(nextSlide, 3000);
    }

    // Para o avanço automático dos slides
    function stopAutoSlide() {
        clearInterval(interval);
    }

    // Adiciona evento de clique nos botões de navegação
    navLinks.forEach((link, i) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            stopAutoSlide();
            showSlide(i);
            startAutoSlide();
        });
    });

    // Inicializa slider
    showSlide(0);
    startAutoSlide();
});

// Variaveis do overlay
const overlay = document.getElementById("quem-somos");
const fecharBtn = document.querySelector(".fechar-overlay");

// Variavel do link "Quem somos"
const linkQuemSomos = document.querySelector('a[href="#quem-somos"]');

// Abre o overlay
linkQuemSomos.addEventListener("click", (e) => {
  e.preventDefault(); // não deixa rolar pra baixo
  overlay.style.display = "flex";
});

// Fecha no botão
fecharBtn.addEventListener("click", () => {
  overlay.style.display = "none";
});

// Fecha clicando fora do conteúdo
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.style.display = "none";
  }
});

// Carrinho

// Variaveis carrinho
const btnCarrinho = document.querySelector('.btn');
const asideCarrinho = document.getElementById('carrinho');
const fecharCarrinho = document.getElementById('fecharCarrinho');
const overlayCarrinho = document.getElementById('overlay');

// Abrir carrinho
btnCarrinho.addEventListener('click', () => {
    asideCarrinho.classList.add('ativo');
    overlayCarrinho.classList.add('ativo');
});

// Fechar carrinho
function fecharTudo() {
    asideCarrinho.classList.remove('ativo');
    overlayCarrinho.classList.remove('ativo');
}

// Fechar pelo botão e clicando fora
fecharCarrinho.addEventListener('click', fecharTudo);
overlayCarrinho.addEventListener('click', fecharTudo)

// Função para adicionar serviço ao carrinho
function adicionarAoCarrinho(nomeServico) {
    const carrinhoConteudo = document.querySelector('.carrinho-conteudo');
    let lista = carrinhoConteudo.querySelector('ul');
    if (!lista) {
        lista = document.createElement('ul');
        lista.style.listStyle = 'none';
        lista.style.padding = '0';
        carrinhoConteudo.innerHTML = '';
        carrinhoConteudo.appendChild(lista);
    }
    const item = document.createElement('li');
    item.style.display = 'flex';
    item.style.justifyContent = 'space-between';
    item.style.alignItems = 'center';
    item.style.padding = '6px 0';

    item.textContent = nomeServico;

    // Ícone de lixeira (SVG)
    const btnRemover = document.createElement('button');
    btnRemover.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#ff3333" viewBox="0 0 24 24">
        <path d="M3 6h18v2H3V6zm2 3h14l-1.5 14h-11L5 9zm5 2v8h2v-8h-2z"/>
      </svg>
    `;
    btnRemover.style.background = 'none';
    btnRemover.style.border = 'none';
    btnRemover.style.cursor = 'pointer';
    btnRemover.style.marginLeft = '12px';
    btnRemover.title = 'Remover';

    btnRemover.addEventListener('click', function(e) {
        e.stopPropagation();
        item.remove();
        // Se não houver mais itens, mostra mensagem padrão
        if (lista.children.length === 0) {
            carrinhoConteudo.innerHTML = '<p>Nenhum item no carrinho ainda.</p>';
        }
    });

    // Adiciona o botão ao item
    item.appendChild(btnRemover);
    lista.appendChild(item);
}

// Evento para botões de adicionar ao carrinho
document.querySelectorAll('.btn-adicionar-carrinho').forEach(btn => {
    btn.addEventListener('click', function() {
        // Busca o nome do serviço relacionado ao botão
        const servicoBtn = btn.parentElement.querySelector('.servico');
        const nomeServico = servicoBtn ? servicoBtn.textContent : 'Serviço';
        adicionarAoCarrinho(nomeServico);
    });
});
