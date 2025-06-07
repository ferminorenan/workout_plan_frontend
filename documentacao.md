# Documentação da Integração Frontend-Backend

## Visão Geral

Este documento descreve as alterações realizadas para integrar o frontend com o backend do projeto de plano de treino, com foco na implementação de cadastro e autenticação de forma segura, seguindo os princípios SOLID e TDD.

## Estrutura do Projeto

### Backend

O backend é uma aplicação Django com Django REST Framework, organizada nos seguintes apps:

- **registration**: Gerencia autenticação e perfis de usuário
- **main**: Gerencia os recursos principais do plano de treino

### Frontend

O frontend é uma aplicação React com TypeScript, organizada da seguinte forma:

- **components**: Componentes reutilizáveis da UI
- **contexts**: Contextos React para gerenciamento de estado global
- **pages**: Páginas da aplicação
- **services**: Serviços para comunicação com a API
- **utils**: Utilitários e funções auxiliares

## Implementações Realizadas

### 1. Serviços de API

Criamos três serviços principais para gerenciar a comunicação com o backend:

- **AuthService**: Gerencia autenticação (login, registro, refresh de token)
- **TokenService**: Gerencia armazenamento e validação de tokens JWT
- **ApiService**: Serviço base para chamadas de API com interceptadores para autenticação

### 2. Contexto de Autenticação

Atualizamos o `AuthContext` para:

- Utilizar os serviços de API para autenticação
- Gerenciar o estado de autenticação do usuário
- Fornecer funções de login, registro e logout
- Verificar a autenticação ao carregar a aplicação

### 3. Páginas de Autenticação

Implementamos as páginas de login e registro com:

- Validação de formulários usando Formik e Yup
- Feedback visual para o usuário
- Redirecionamento após autenticação bem-sucedida

### 4. Proteção de Rotas

Implementamos proteção de rotas para garantir que apenas usuários autenticados possam acessar determinadas páginas.

### 5. Medidas de Segurança

Implementamos várias medidas de segurança:

- Validação de entrada no frontend e backend
- Sanitização de dados
- Gerenciamento seguro de tokens JWT
- Refresh automático de tokens expirados

## Princípios SOLID Aplicados

### Single Responsibility Principle (SRP)

Cada serviço e componente tem uma única responsabilidade:

- **AuthService**: Responsável apenas pela autenticação
- **TokenService**: Responsável apenas pelo gerenciamento de tokens
- **ApiService**: Responsável apenas pela comunicação com a API

### Open/Closed Principle (OCP)

Os serviços são projetados para serem extensíveis sem modificação:

- **ApiService**: Pode ser estendido para adicionar novos interceptadores
- **AuthContext**: Pode ser estendido para adicionar novos métodos de autenticação

### Liskov Substitution Principle (LSP)

As interfaces são projetadas para permitir substituição:

- **IAuthService**: Define uma interface clara para o serviço de autenticação

### Interface Segregation Principle (ISP)

As interfaces são específicas para cada cliente:

- Interfaces separadas para diferentes tipos de dados (LoginData, RegisterData, etc.)

### Dependency Inversion Principle (DIP)

Os componentes dependem de abstrações, não de implementações concretas:

- **AuthContext**: Depende da interface IAuthService, não da implementação concreta

## Abordagem TDD

Seguimos a abordagem Test-Driven Development (TDD):

1. Escrevemos testes para os serviços de autenticação
2. Escrevemos testes para o contexto de autenticação
3. Escrevemos testes para as páginas de login e registro
4. Implementamos os serviços e componentes para passar nos testes

## Instruções para Executar o Projeto

### Backend

1. Instale as dependências:
   ```
   pip install django djangorestframework djangorestframework-simplejwt django-cors-headers django-allauth dj-rest-auth
   ```

2. Execute as migrações:
   ```
   python manage.py migrate
   ```

3. Inicie o servidor:
   ```
   python manage.py runserver 0.0.0.0:8000
   ```

### Frontend

1. Instale as dependências:
   ```
   npm install
   ```

2. Configure a variável de ambiente para a URL da API:
   ```
   REACT_APP_API_URL=http://localhost:8000/api
   ```

3. Inicie o servidor de desenvolvimento:
   ```
   npm start
   ```

## Conclusão

A integração do frontend com o backend foi realizada com sucesso, seguindo os princípios SOLID e TDD. O sistema agora oferece uma experiência de usuário segura e consistente, com autenticação robusta e proteção de rotas.


## Detalhes Técnicos da Implementação

### Fluxo de Autenticação

O fluxo de autenticação implementado segue o padrão JWT (JSON Web Token):

1. **Registro**:
   - O usuário fornece nome, email e senha
   - O frontend valida os dados e envia para o backend
   - O backend cria o usuário e retorna tokens JWT (access e refresh)
   - O frontend armazena os tokens e redireciona para a página principal

2. **Login**:
   - O usuário fornece email e senha
   - O frontend valida os dados e envia para o backend
   - O backend verifica as credenciais e retorna tokens JWT
   - O frontend armazena os tokens e redireciona para a página principal

3. **Verificação de Autenticação**:
   - Ao carregar a aplicação, o frontend verifica se há tokens armazenados
   - Se houver, verifica se o token de acesso está válido
   - Se estiver expirado, tenta renovar usando o token de refresh
   - Se bem-sucedido, obtém os dados do usuário e atualiza o estado de autenticação

4. **Proteção de Rotas**:
   - Rotas protegidas verificam o estado de autenticação
   - Se não autenticado, redireciona para a página de login

### Gerenciamento de Tokens

O `TokenService` implementa as seguintes funcionalidades:

- **Armazenamento de Tokens**: Armazena tokens JWT no localStorage
- **Verificação de Expiração**: Verifica se o token de acesso está expirado
- **Limpeza de Tokens**: Remove tokens ao fazer logout

### Interceptadores de API

O `ApiService` implementa interceptadores para:

- **Adicionar Token de Autorização**: Adiciona o token JWT ao cabeçalho de todas as requisições
- **Renovação Automática de Token**: Se uma requisição falhar com erro 401 (Não Autorizado), tenta renovar o token e reenviar a requisição
- **Redirecionamento para Login**: Se não for possível renovar o token, redireciona para a página de login

### Validação e Sanitização

Implementamos validação e sanitização de dados para:

- **Email**: Verifica formato válido
- **Senha**: Verifica comprimento mínimo e complexidade
- **Nome**: Verifica caracteres permitidos

A sanitização remove caracteres especiais e tags HTML para prevenir ataques XSS.

### Tratamento de Erros

Implementamos tratamento de erros para:

- **Erros de Autenticação**: Exibe mensagens amigáveis para o usuário
- **Erros de API**: Captura e trata erros de comunicação com o backend
- **Erros de Validação**: Exibe mensagens específicas para cada campo

## Melhorias Futuras

Algumas melhorias que poderiam ser implementadas no futuro:

1. **Cookies HttpOnly**: Migrar o armazenamento de tokens de localStorage para cookies HttpOnly para maior segurança
2. **Autenticação de Dois Fatores**: Implementar 2FA para aumentar a segurança
3. **Recuperação de Senha**: Adicionar funcionalidade de recuperação de senha
4. **Testes E2E**: Adicionar testes end-to-end para validar o fluxo completo de autenticação
5. **Monitoramento de Segurança**: Implementar logging e monitoramento de tentativas de login suspeitas

## Considerações de Segurança

Implementamos várias medidas de segurança, mas é importante considerar:

- **HTTPS**: Em produção, sempre usar HTTPS para proteger a comunicação
- **Rate Limiting**: Implementar limitação de taxa para prevenir ataques de força bruta
- **CORS**: Configurar CORS corretamente em produção para permitir apenas origens confiáveis
- **Auditoria**: Implementar logging de ações sensíveis para auditoria

## Decisões de Design

### Por que JWT?

Escolhemos JWT para autenticação porque:

1. É stateless, reduzindo a carga no servidor
2. Permite fácil escalabilidade
3. Funciona bem com arquiteturas de microserviços
4. Oferece um mecanismo seguro para transmitir informações entre partes

### Por que Context API?

Escolhemos a Context API do React para gerenciar o estado de autenticação porque:

1. É nativa do React, sem dependências externas
2. É suficiente para o escopo deste projeto
3. Facilita o compartilhamento do estado de autenticação entre componentes
4. Mantém a aplicação mais leve comparado a soluções como Redux

### Por que Formik e Yup?

Escolhemos Formik e Yup para validação de formulários porque:

1. Formik simplifica o gerenciamento de estado de formulários
2. Yup oferece uma API declarativa para validação de esquemas
3. A combinação reduz significativamente o código boilerplate
4. Facilita a manutenção e extensão das validações

