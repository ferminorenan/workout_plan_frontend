## 🏋️‍♀️ Workout Tracker - Aplicativo de Treinos Interativos

Aplicação web desenvolvida com **React + TypeScript** para permitir que o usuário acompanhe sua rotina de treinos por fases, séries e exercícios. O usuário pode **marcar os exercícios realizados**, **visualizar seu progresso** e **avançar automaticamente para a próxima fase** do treino.

---

### 📋 Funcionalidades principais

✅ Lista de treinos organizada por:

* **Fases** (ex: Fase 1 – Full Body)
* **Séries** dentro de cada fase
* **Exercícios** com repetições e marcação de conclusão

🔁 Interatividade:

* Checkboxes para marcar exercícios concluídos
* Avanço automático de fase após completar todos os exercícios
* Progresso visual de fases: *Concluída*, *Em andamento* e *Pendente*

---

## 🚀 Tecnologias Utilizadas

* **React** (com Vite ou Create React App)
* **TypeScript**
* **CSS Modules** ou estilização direta
* Estrutura com **camadas de domínio**, **aplicação** e **infraestrutura** (DDD simples)

---

## 📁 Estrutura de Pastas

```
src/
├── App.tsx                     # Componente principal
├── domain/
│   └── workout/
│       └── Workout.ts          # Classes Workout, Fase, Serie, Exercicio
├── application/
│   └── workout/
│       └── Workout.ts          # Aplicação da lógica de Workout
├── infrastructure/
│   └── repositories/
│       └── WorkoutRepositoryImpl.ts # Simulação de repositório/mock
├── pages/
│   └── WorkoutPage.tsx         # Página principal com controle de treino
├── services/
│   └── WorkoutService.ts       # Mock de dados
├── index.tsx                   # Entry point da aplicação
└── styles/
    └── App.css                 # Estilização base
```

---

## 📦 Instalação e Execução

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/workout-tracker.git
cd workout-tracker
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto:

```bash
npm run dev   # ou npm start, se estiver usando CRA
```

4. Acesse em:
   `http://localhost:5173` (Vite)
   ou
   `http://localhost:3000` (Create React App)

---

## 🔧 Como funciona

### Estrutura de dados (mock)

```ts
// services/WorkoutService.ts
export const workoutMock: Fase[] = [
  {
    titulo: 'Fase 1 – Full Body',
    series: [
      {
        nome: 'Série 1',
        exercicios: [
          { nome: 'Agachamento', repeticoes: '15 repetições' },
          { nome: 'Flexão', repeticoes: '10 repetições' },
          ...
        ]
      },
      ...
    ]
  },
  ...
];
```

### Lógica do componente `WorkoutPage`

* Ao carregar, simula o fetch dos dados.
* Armazena o progresso do usuário em `useState`.
* Valida a conclusão de cada série/fase com base nos checkboxes.
* Avança para a próxima fase automaticamente.
* Exibe uma lista de progresso no final.

---

## 📌 Possíveis Melhorias Futuras

Aqui vão sugestões para evoluir o projeto:

### 💾 Persistência

* Salvar progresso no **localStorage** ou IndexedDB
* Integração com backend (Node.js, Firebase, Django, etc.)

### 🧍 Cadastro e login

* Implementar **autenticação de usuários**
* Salvar treinos personalizados para cada perfil

### 📊 Métricas e gráficos

* Mostrar gráfico de evolução
* Estatísticas de treino por semana/mês

### 💬 Feedback interativo

* Animações de conclusão
* Sons ou mensagens motivacionais ao concluir fases

### 🔄 Treinos personalizados

* Interface para o usuário **criar seus próprios treinos**
* Reordenar, editar ou excluir fases e exercícios

### 📱 Versão mobile

* Otimizar layout com **responsividade** total
* Possível versão em **React Native**

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**.
Você pode usá-lo, modificá-lo e distribuí-lo livremente.