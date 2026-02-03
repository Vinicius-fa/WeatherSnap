# ☀️ WeatherSnap - App de Previsão do Tempo

O **WeatherSnap** é uma aplicação web moderna e responsiva que permite consultar a previsão do tempo de qualquer cidade do mundo em tempo real. O projeto utiliza um design focado em UX (User Experience) com efeitos de *glassmorphism* e temas escuros.

![Banner do Projeto](https://via.placeholder.com/800x400?text=WeatherSnap+Preview)

## 🚀 Funcionalidades

* **Busca em Tempo Real:** Consulta por nome de cidade utilizando a API de Geocoding.
* **Previsão Detalhada:** Exibe temperatura atual, condição climática, umidade e velocidade do vento.
* **Previsão Estendida:** Cards com a previsão para os próximos 3 dias.
* **Sugestões Inteligentes:** Mensagens contextuais baseadas no clima (Ex: "Leve um guarda-chuva").
* **Design Responsivo:** Adaptado para dispositivos móveis e desktop através do TailwindCSS.
* **Interface Moderna:** Efeito de desfoque (Glassmorphism) e ícones animados.

## 🛠️ Tecnologias Utilizadas

* [HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML) - Estrutura da página.
* [TailwindCSS](https://tailwindcss.com/) - Estilização rápida e responsiva.
* [JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) - Lógica de consumo de API e manipulação do DOM.
* [Open-Meteo API](https://open-meteo.com/) - Dados climáticos gratuitos (sem necessidade de chave de API).
* [Phosphor Icons](https://phosphoricons.com/) - Ícones de interface.

## ⚙️ Como rodar o projeto

Este é um projeto *frontend-only*, portanto, não é necessário instalar dependências pesadas.

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/seu-usuario/weathersnap.git](https://github.com/seu-usuario/weathersnap.git)
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd weathersnap
    ```
3.  Abra o arquivo `index.html` diretamente no seu navegador ou utilize a extensão **Live Server** no VS Code.

## 🧠 Como o código funciona?

O app segue um fluxo de duas etapas para obter os dados:
1.  **Conversão de Nome para Coordenadas:** O JavaScript envia o nome da cidade para a API de Geocoding para obter Latitude e Longitude.
2.  **Busca do Clima:** Com as coordenadas, o app consulta a API Weather da Open-Meteo, que retorna um arquivo JSON com as temperaturas e códigos WMO.
3.  **Mapeamento:** Os códigos numéricos da API são traduzidos para textos amigáveis e ícones correspondentes através de um objeto de mapeamento no JS.

## 📝 Licença

Este projeto foi desenvolvido para fins didáticos. Sinta-se à vontade para usar e melhorar!

---
Desenvolvido por Vinícius F. A. 👋