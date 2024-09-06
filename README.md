# 🖥️🏎️ Interface Gerenciador de Corridas de Kart

Interface desenvolvida para atender as necessidades de um Organizador de Corridas de Kart. Tem como foco principal trazer uma interface intuitiva e solucionar os problemas do Cliente e criar uma Ponte de Comunicação entre Aplicação Web e Mobile.

O projeto Web do Gerenciador já foi feito em PHP, porém notamos que não havia uma boa estrutura, além de não conseguirmos conectar essa aplicação com o Mobile. Logo, a solução de fazer uma conexão através de uma API que lidasse com os dois tipos de APP foi a solução adotada.

## 🚀👩‍💻 Tempo de Desenvolvimento

-   [Emily Izabelle]( https://github.com/em1ky ) como Engenheira de Banco de Dados
-   [Giuliana Gralha]( https://github.com/Giuliana09 ) como Engenheira Front-end
-   [Larissa Silva]( https://github.com/LarissaSL ) como Engenheira Back-end
-   [Leticia Graziele]( https://github.com/LeticiaGaziel ) como UX/UI e Auxiliar de Banco de Dados
-   [Silvana Sales]( https://github.com/SilvanaMenezes ) como UX/UI e Fullstack

## 🎯 Inclusões

- ✅ Criação do Readme do front

## ⚙️ Funcionalidades e telas

- 🟡 CRUD de Kartódromos
- 🟡 CRUD de Campeonatos
- 🟡 CRUD de Corridas
- 🟡 CRUD de Usuários
- 🟡 CRUD de Produtos
- 🟡 CRUD de Classificação das Corridas
- 🟡 Autenticação de usuários
- 🟡 Compra de ingressos de corridas
- 🟡 Carrinho de Compras
- 🟡 Check-out de Pagamentos
- 🟡 Check-in de Pilotos
- 🟡 Check-out de Pilotos
- 🟡 Sorteador de Números de Karts
- 🟡 Compartilhamento via Whatsapp da Lista de Pilotos

<br><br><br>
---
## 📓 Padrões de Nomenclatura nos Commits

Abaixo segue uma tabela onde explicamos um padrão para nossos commits.

| **Tipo**    | **Descrição**                                                   |
|-------------|-----------------------------------------------------------------|
| **FEAT**    | Para novos recursos                                             |
| **FIX**     | Solucionando um problema                                        |
| **RAW**     | Arquivo de configs, dados, features, parâmetros                 |
| **BUILD**   | Arquivos de build e dependências                                |
| **PERF**    | Mudança de performance                                          |
| **REMOVE**  | Exclusão de arquivos, diretórios ou código                      |
| **CHORE**   | Atualizações de tarefas de build, configs de admin, pacotes, etc|
| **REFACTOR**| Refatorações sem alterar funcionalidade                         |
| **TESTE**   | Alterações em teste                                             |
| **CI**      | Mudanças relacionadas a integração contínua                     |
| **DOCS**    | Mudanças na documentação                                        |
| **CLEANUP** | Remover trechos desnecessários                                  |
| **STYLE**   | Formatações de código                                           |

Exemplo de uso:
```
git commit -m "FEAT - CRUD de Usuarios"
```

<br><br><br>
---

# 🖥️🛠️ Como usar?

## 1° Instalando dependências e bibliotecas 
Como este projeto é desenvolvido com React Native, é necessário ter o NodeJS instalado [instale a última versão LTS](https://nodejs.org/en/) e algumas bibliotecas:


### 1- Adicionando o node_modules.
Como este arquivo é muito pesado, então é padrão que ele esteja entre os arquivos que são ignorados através do gitgnore.

- Antes de tudo, é importante em seu terminal que esteja dentro do diretório do projeto, EX:  `**C:\Users\app-mobile-CKC:** `
- Em seu terminal digite o seguinte comando:

```
npm install
```

### 2- Em seu celular baixe o aplicativo da Expo chamado "Expo Go", compatível com Android e IOS.
 
Através dele é possível utilizar seu próprio celular para emular o projeto, sem a necessidade de sobrecarregar seu pc com o emulador Android por exemplo.

- Com ele você pode ler o QR code que irá aparecer quando executar a aplicação para conectar com seu celular, porém é necessário que esteja na mesma rede de internet que seu computador. Ou pode conectar com o cabo USB:

### 3- Conexão via USB
Com o celular conectado ao computador, você irá verificar se seu celular está sendo reconhecido através do comando:

```
adb devices 
```
 Deve aparecer assim:
  
![image](https://github.com/user-attachments/assets/29fe6fb7-8746-4fbc-98c8-80b084266310)

Caso apareça `OFFILINE` no lugar do Devices, você irá precisar habilitá-lo:
- execute o comando:
```
adb kill-server
```
- Em seguida
```
 adb start-server
```

- Excute este comando novamente.
`tem que aparecer Devices no lugar do offiline`
```
adb devices
```
- Ainda no terminal digite:

```
npm uninstall -g ngrok
```
- Em seguida:
```
npm install -g ngrok
```
## Executando o projeto
No terminal escreva:

```
npx expo start --tunnel
```
- No aplicativo você pode ler o QR code ou escrever manualmente o link que está em seu terminal

![image](https://github.com/user-attachments/assets/cefda90f-4479-4883-b1ec-03af9e5c1694)

- QR code e o link:
  
![image](https://github.com/user-attachments/assets/ae7aa87f-67d0-49fd-b590-7b25aa22fcdb)


<br><br><br>
---

## 🛠 Tecnologias

As seguintes tecnologias foram utilizadas no desenvolvimento desse projeto:

-  **[JavaScript]( https://developer.mozilla.org/pt-BR/docs/Web/JavaScript )**
-  **[ReactNative]( https://reactnative.dev/ )**
-  **[ Expo ]( https://docs.expo.dev/)**
-  **[ Html ]( https://developer.mozilla.org/pt-BR/docs/Web/HTML )**
-  **[ MySQL ]( https://www.mysql.com )**

## 📑 Apêndices

-  ` Confira o Projeto antes de mudar API aqui: `  ➡️➡️ [ Projeto Web via PHP ] ( https://github.com/LarissaSL/SistemaCKC )
-  ` Confira o Projeto Mobile aqui: ` ➡️➡️ [ Projeto Mobile ] ( https://github.com/LarissaSL/API_Gerenciador-De-Corridas-de-Kart )
-  ` Confira o Novo Projeto Web aqui: ` ➡️➡️ [ Projeto Web via JS ] ( https://github.com/LarissaSL/API_Gerenciador-De-Corridas-de-Kart )
