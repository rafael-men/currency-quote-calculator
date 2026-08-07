# Currency Quote - Conversor de Moedas

Uma aplicação web moderna para **conversão de moedas em tempo real** e **visualização do histórico de cotações em gráficos interativos**. Desenvolvida com **Next.js 15 (App Router)**, **React 19**, **TypeScript** e **Tailwind CSS**, integrando dados ao vivo da [AwesomeAPI](https://docs.awesomeapi.com.br/).

---

##  Funcionalidades

- 💱 **Conversão em Tempo Real:** Conversão de valores entre dezenas de moedas internacionais e criptomoedas com atualização instantânea.
- 🔄 **Atualização Automática:** As taxas de câmbio são recarregadas automaticamente a cada 30 segundos.
- 📈 **Gráfico de Cotação Histórica:** Exibição interativa do histórico de taxas dos últimos dias com Chart.js.
- 🎯 **Filtragem Inteligente de Pares:** Os menus suspensos filtram dinamicamente apenas os pares de moedas suportados pela API, garantindo seleções válidas.
- 🌐 **Nomes e Bandeiras Locais:** Exibição do nome por extenso das moedas em português (`pt-BR`) e bandeiras dos países integradas via `flagcdn`.
- 🎨 **Interface Moderna e Responsiva:** Design com efeito *Glassmorphic*, suporte completo para dispositivos móveis, tablets e desktops.
- 🔢 **Formatação Monetária Avançada:** Formatação de entrada e saída personalizada conforme as convenções locais (`Intl.NumberFormat`).

---

##  Tecnologias Utilizadas

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Biblioteca de UI:** [React 19](https://react.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Gráficos:** [Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/)
- **Requisições HTTP:** Axios & Fetch API
- **Fonte de Dados:** [AwesomeAPI Economia](https://docs.awesomeapi.com.br/)

---

##  Estrutura do Projeto

```text
├── app/
│   ├── api/                   # API Routes (Proxy para a AwesomeAPI)
│   │   ├── currencies/        # Lista moedas e pares suportados
│   │   └── exchange-rate/     # Consulta cotações atuais e histórico
│   ├── components/            # Componentes reutilizáveis da interface
│   │   ├── AmountInput.tsx    # Campo de entrada de valor com formatação
│   │   ├── ConverterResult.tsx# Exibição do resultado final convertido
│   │   ├── CurrencyChart.tsx  # Gráfico interativo de variação do câmbio
│   │   ├── CurrencyField.tsx  # Dropdown personalizado para seleção de moedas
│   │   ├── Navbar.tsx         # Barra de navegação superior
│   │   └── Footer.tsx         # Rodapé com versão e links
│   ├── hooks/
│   │   └── useCurrencyConverter.ts # Custom hook para gerenciamento do estado e busca
│   ├── pages/
│   │   └── Main.tsx           # Container principal do conversor
│   ├── services/
│   │   └── currencyService.ts # Serviços de comunicação com a API interna
│   ├── types/                 # Interfaces e definições de tipos TypeScript
│   └── utils/
│       └── currencyFormat.ts  # Utilitários de formatação e manipulação de valores
├── public/                    # Arquivos estáticos (ícones, imagens)
└── package.json
```

---

## 🏁 Como Executar o Projeto Localmente

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:
- **Node.js** (versão 18.x ou superior recomendada)
- **npm**, **pnpm** ou **yarn**

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/currency-quote-calculator.git
   cd main-converter
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador para visualizar a aplicação.

---

## 📜 Scripts Disponíveis

No diretório do projeto, você pode executar:

- `npm run dev`: Executa a aplicação em modo de desenvolvimento.
- `npm run build`: Cria a versão otimizada de produção da aplicação.
- `npm run start`: Inicia o servidor de produção após o build.
- `npm run lint`: Executa a verificação do ESLint para validar a qualidade do código.

---

## 📡 API Interna (Endpoints Proxy)

A aplicação utiliza rotas internas da Next.js App Router para realizar as chamadas à AwesomeAPI:

- `GET /api/currencies`
  - Retorna a lista de moedas únicas e os pares de conversão disponíveis.
- `GET /api/exchange-rate?fromCurrency={MOEDA1}&toCurrency={MOEDA2}&amount={VALOR}&history={DIAS}`
  - Retorna a taxa de câmbio atual, o valor convertido e o histórico de cotações dos últimos dias.

---
