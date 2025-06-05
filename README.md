# 🏋️‍♀️ Workout Tracker - Aplicativo Interativo de Treinos

Aplicação web moderna desenvolvida com **React + TypeScript** e **Material UI** para permitir que usuários acompanhem um plano de treino detalhado de forma interativa. O aplicativo organiza o treino em fases, semanas e dias, permitindo marcar exercícios e dias como concluídos, salvando o progresso localmente e visualizando os dias de treino completados em um calendário.

---

## 📋 Funcionalidades Principais

*   **Plano de Treino Detalhado:** Exibe um plano de treino estruturado em múltiplas fases, semanas e treinos diários específicos.
*   **Rastreamento Interativo de Exercícios:** Cada exercício possui um checkbox para marcar sua conclusão individualmente.
*   **Marcação de Dias Concluídos:** Um botão permite marcar um dia inteiro de treino como concluído (habilitado somente após todos os exercícios do dia serem marcados).
*   **Persistência de Progresso:** O estado de conclusão dos exercícios, dias e as datas de conclusão são salvos automaticamente no `localStorage` do navegador, permitindo que o usuário retome o acompanhamento de onde parou.
*   **Visualização em Calendário:** Um componente de calendário integrado (`react-calendar`) destaca os dias em que o usuário marcou um treino como concluído, oferecendo um feedback visual do progresso.
*   **Interface Expansível:** As seções de fases, semanas e treinos diários são expansíveis/recolhíveis para facilitar a navegação e visualização.
*   **Estrutura Modular:** Código organizado com tipos de domínio claros (`src/domain`), lógica de estado desacoplada em hooks customizados (`src/hooks`), e componentes de UI reutilizáveis (`src/components`).

---

## 🚀 Tecnologias Utilizadas

*   **React** (v18+)
*   **TypeScript**
*   **Material UI (MUI)**: Para componentes de interface (Cards, Listas, Botões, Checkboxes, Ícones).
*   **React Calendar**: Para a visualização do calendário de progresso.
*   **UUID**: Para geração de IDs únicos (utilizado no mock de dados).
*   **Jest & React Testing Library**: Para testes unitários e de integração.
*   **Vite** (ou Create React App): Como ferramenta de build e desenvolvimento.

---

## 📁 Estrutura de Pastas

```
src/
├── App.tsx                     
├── components/
│   ├── DailyWorkoutDisplay.tsx
│   ├── ExerciseItem.tsx       
│   ├── PhaseDisplay.tsx
│   ├── WeeklyPlanDisplay.tsx
│   └── WorkoutCalendar.tsx     
├── domain/
│   └── workout/
│       └── Workout.ts          # Definições de tipos (Exercise, DailyWorkout, WeeklyPlan, Phase, WorkoutPlan, WorkoutProgress)
├── hooks/
│   └── useWorkoutProgress.ts   # Hook customizado para gerenciar o estado e persistência do progresso
├── mocks/
│   └── workoutMock.ts          # Mock de dados detalhado do plano de treino
├── pages/
│   └── WorkoutPage.tsx         # Página principal que orquestra a exibição e interação do plano
├── services/                   # (Opcional, pode conter chamadas de API no futuro)
├── tests/
│   └── pages/
│       └── WorkoutPage.test.tsx # Testes para a página principal
├── index.tsx                   # Ponto de entrada da aplicação
└── ... (outros arquivos de configuração, CSS, etc.)
```

---

## 📦 Instalação e Execução

1.  **Clone o repositório** (se aplicável):
    ```bash
    git clone <url-do-repositorio>
    cd <nome-da-pasta>
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```
3.  **Execute o projeto em modo de desenvolvimento:**
    ```bash
    npm run dev
    # ou, se estiver usando Create React App:
    npm start
    ```
4.  Acesse a aplicação no seu navegador, geralmente em `http://localhost:5173` (Vite) ou `http://localhost:3000` (CRA).

---

## 🔧 Como Funciona

1.  **Carregamento:** A `WorkoutPage` carrega o plano de treino (atualmente do `workoutMock.ts`).
2.  **Gerenciamento de Estado:** O hook `useWorkoutProgress` é inicializado. Ele tenta carregar o progresso salvo do `localStorage`. Se não houver progresso salvo, ele usa um estado inicial padrão.
3.  **Renderização:** A `WorkoutPage` renderiza a estrutura do plano (fases, semanas, dias) usando componentes aninhados (`PhaseDisplay`, `WeeklyPlanDisplay`, `DailyWorkoutDisplay`, `ExerciseItem`). O estado atual do progresso (obtido do hook) é passado como props para esses componentes para determinar quais checkboxes/dias estão marcados.
4.  **Interação:**
    *   Quando um usuário clica no checkbox de um `ExerciseItem`, a função `onToggle` (que chama `toggleExerciseCompletion` do hook) é acionada.
    *   Quando um usuário clica no botão "Marcar Dia" de um `DailyWorkoutDisplay`, a função `onToggleDay` (que chama `toggleDailyCompletion` do hook) é acionada.
5.  **Atualização de Estado:** As funções do hook (`toggleExerciseCompletion`, `toggleDailyCompletion`) atualizam o estado interno do progresso.
6.  **Persistência:** Um `useEffect` dentro do hook `useWorkoutProgress` detecta mudanças no estado do progresso e o salva automaticamente no `localStorage` (convertendo Datas para strings ISO).
7.  **Calendário:** O componente `WorkoutCalendar` recebe a lista de `completedDates` do hook e usa as funções `tileClassName` e `tileContent` da biblioteca `react-calendar` para destacar visualmente os dias concluídos.
8.  **Re-renderização:** As atualizações de estado causam a re-renderização dos componentes afetados, refletindo o progresso na UI (checkboxes marcados, fundo do card do dia alterado, calendário atualizado).

---

## 📌 Possíveis Melhorias Futuras

*   **Backend Integration:** Substituir o mock de dados e o `localStorage` por uma API real e banco de dados para persistência robusta e multiusuário.
*   **Autenticação:** Adicionar login/cadastro para que múltiplos usuários possam ter seus próprios planos e progressos.
*   **Criação/Edição de Planos:** Permitir que usuários criem ou personalizem seus próprios planos de treino.
*   **Mapeamento de Datas:** Implementar uma lógica mais robusta para mapear os treinos diários a datas específicas no calendário, em vez de apenas marcar o dia atual da conclusão.
*   **Feedback Visual Aprimorado:** Adicionar animações, notificações ou barras de progresso mais elaboradas.
*   **Métricas e Relatórios:** Calcular e exibir estatísticas sobre o progresso (ex: % de conclusão da fase, frequência semanal, etc.).
*   **Testes Abrangentes:** Expandir a cobertura de testes, especialmente para o hook `useWorkoutProgress` e interações mais complexas.
*   **Responsividade:** Garantir que o layout se adapte perfeitamente a diferentes tamanhos de tela (mobile, tablet, desktop).

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License** (ou a licença que você preferir).