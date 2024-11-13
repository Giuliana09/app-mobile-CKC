# 🖥️🏎️ Aplicativo Gerenciador de Corridas de Kart

Este é um **Aplicativo Mobile** desenvolvido para atender às necessidades de um Organizador de Corridas de Kart. O foco principal é auxiliar o organizador nas tarefas realizadas durante o evento, proporcionando uma forma prática e eficiente de realizar o sorteio dos números de kart e gerenciar check-in, check-out, e outros aspectos relacionados às corridas.

## 🚀👩‍💻 Time de Desenvolvimento

-   [Emily Izabelle]( https://github.com/em1ky ) como Engenheira de Banco de Dados
-   [Giuliana Gralha]( https://github.com/Giuliana09 ) como Engenheira Front-end
-   [Larissa Silva]( https://github.com/LarissaSL ) como Engenheira Back-end e Fullstack
-   [Leticia Graziele]( https://github.com/LeticiaGaziel ) como UX/UI e Auxiliar de Banco de Dados
-   [Silvana Sales]( https://github.com/SilvanaMenezes ) como UX/UI e Fullstack

---

<br><br>

## 📌 Pré-requisitos de Tecnologias

Para iniciar o projeto, você precisa ter os seguintes requisitos instalados:

### 1. Configurando a API:
- **[Repositório da API](https://github.com/LarissaSL/API_Gerenciador-De-Corridas-de-Kart/tree/main)**  
  A API é a ponte entre a Aplicação Web e a Aplicação Mobile, sendo responsável por fornecer os dados necessários para o funcionamento do aplicativo mobile. Lembre-se de que a aplicação mobile depende dos dados inseridos na aplicação web.

### 2. Ambiente para o Aplicativo Mobile:
- **[Node.js](https://nodejs.org/pt)**  
⚠️ OBS.: Recomendamos que baixe a versão LTS, pois é mais estável.

- **IDE para React Native**  
  Recomendamos o uso do VScode, caso não tenha:
  - [Visual Studio Code](https://code.visualstudio.com/)

- **[Android Studio](https://developer.android.com/studio)**  
Android Studio é necessário para emular o ambiente Android, realizar testes locais e garantir que os Endpoints da API estão funcionando corretamente com o app.

<br><br>

---


## 📑 Índice
### 1. Inclusões
- [Inclusões](#-inclus%C3%B5es)

### 2. Funcionalidades
- [Funcionalidades](#%EF%B8%8F-funcionalidades)

### 3. Primeiros passos
- [Primeiros passos](#%EF%B8%8F%EF%B8%8F-primeiros-passos)
- [Clonando o Projeto Mobile](#-1-clonando-o-projeto-mobile)
- [Instalando Dependências e Bibliotecas](#-2-instalando-depend%C3%AAncias-e-bibliotecas)
- [Configurando a URL da API](#-3-configurando-a-url-da-api)
- [Emulando via Celular com Expo Go](#-4-emulando-via-celular-com-o-expo-go)
- [Executando o Projeto](#-5-executando-o-projeto)

### 4. Fluxos das funcionalidades
- [Fluxo de Check-in](#-1-fluxo-de-check-in)
- [Fluxo de Sorteio](#-2-fluxo-de-sorteio)
- [Fluxo de Check-out](#-3-fluxo-de-check-out)

### Extra 
- [Tecnologias](#-tecnologias)
- [Apêndices](#-ap%C3%AAndices)

---

<br><br>

## 🎯 Inclusões

- ✅ Criação do Readme do Aplicativo Mobile

---

<br><br>

## ⚙️ Funcionalidades

**Autenticação**
   - 🟢 Fazer Login
     
**Gerenciamento de Corridas**
   - 🟢 Buscar Lista de Corridas
   - 🟢 Aplicar Filtros nas Buscas de Corridas
     
**Check-in de Pilotos**
   - 🟢 Realizar Check-in de Pilotos
   - 🟢 Exibir Lista de Pilotos para Check-in
   - 🟢 Exibir Campos Disponíveis para Criar e Alterar no Check-in
   - 🟢 Exibir Confirmação de Check-in
     
**Sorteio de Pilotos**
   - 🟢 Realizar Sorteio para os Pilotos
   - 🟢 Excluir Números do Sorteio 
   - 🟢 Exibir Resultado do Sorteio por Piloto
   - 🟢 Exibir Lista Completa de Pilotos e seus Números de Kart
     
**Check-out de Pilotos**
   - 🟢 Realizar Check-out de Pilotos
   - 🟢 Exibir Lista de Pilotos para Check-out
   - 🟢 Exibir Campos Disponíveis para Alteração no Check-out
   - 🟢 Exibir Confirmação de Check-out
     
**Compartilhamento**
   - 🟢 Compartilhar Informações de Check-in e Sorteio via WhatsApp
     
**Navegação**
   - 🟢 Menu do Aplicativo
   - 🟢 Navegação da Tela de Check-in feito
   - 🟢 Navegação da Tela de Check-ou feito
   - 🟢 Navegação da Tela de Sorteio feito

<br>

**🔝 [Voltar ao Índice](#-%C3%ADndice)**

---

<br><br>


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

---

<br><br>


# 🖥️🛠️ Primeiros passos

## ✅ 1° **Clonando o Projeto Mobile**

Para começar a trabalhar no projeto mobile, você precisa clonar o repositório. Abra seu terminal e execute o seguinte comando para clonar o repositório do projeto para o seu computador:

```bash
git clone https://github.com/Giuliana09/app-mobile-CKC.git
```

- Após clonar, navegue até a pasta do projeto.
  
---

<br><br> 

## ✅ 2° **Instalando Dependências e Bibliotecas**

Depois de clonar o projeto, você precisa instalar as dependências que o aplicativo requer para rodar. Com o projeto clonado e dentro da pasta do projeto, execute o seguinte comando:

```bash
npm install
```

Esse comando irá baixar e instalar todas as dependências listadas no arquivo `package.json`.

Isso vai garantir que todas as bibliotecas necessárias para o funcionamento do seu projeto sejam instaladas corretamente.

---

<br><br>


## ✅ 3° **Configurando a URL da API**

Para que o aplicativo mobile se conecte à API, você precisará configurar a URL que ele usará para realizar as requisições.

### 🖥️Utilizando seu IP de Rede em uma variável de ambiente**

1. **Crie um arquivo `.env`** na raiz do projeto, onde você armazenará variáveis de ambiente, como a URL da API. No arquivo `.env`, adicione o seguinte código, substituindo `{SEU-IP-DE-REDE}` pelo seu IP de rede local ou pelo IP do servidor onde a API está hospedada:

```
API_URL="http://{SEU-IP-DE-REDE}:8080"
```

- **Exemplo**: Se o seu IP local for `123.456.7.10`, a linha no arquivo `.env` ficaria assim:

```
API_URL="http://123.456.7.10:8080"
```

✅ Resultado esperado:

![image](https://github.com/user-attachments/assets/b0e85850-e690-4f7e-9954-017462da316f)

<br>

⚠️ OBS.: **Não troque a porta 8080**, pois ela é a porta que a API utiliza.

<br>

**🔝 [Voltar ao Índice](#-%C3%ADndice)**

---

<br><br><br>

## ✅ 4° **Emulando via Celular com o Expo Go**

1. Em seu celular baixe o aplicativo da Expo chamado "Expo Go", compatível com Android e IOS.
 
Através dele é possível utilizar seu próprio celular para emular o projeto, sem a necessidade de sobrecarregar seu pc com o emulador Android por exemplo.

⚠️ OBS.: É necessário que o celular esteja na mesma rede de internet que seu computador.

---

<br>

2. Conexão via USB 
Com o celular conectado ao computador, você irá verificar se seu celular está sendo reconhecido através do comando:

```
adb devices 
```

- ✅ Deve aparecer assim:
  
![image](https://github.com/user-attachments/assets/29fe6fb7-8746-4fbc-98c8-80b084266310)

❌ Caso apareça `OFFILINE` no lugar do Devices, você irá precisar habilitá-lo:
- Execute o comando:
```
adb kill-server
```


- Em seguida
```
 adb start-server
```


- Excute este comando novamente.
```
adb devices
```

`Dessa vez irá aparecer Devices no lugar do offiline`


<br>

**🔝 [Voltar ao Índice](#-%C3%ADndice)**

---

<br><br><br>

## ✅ 5° **Executando o Projeto**
Para iniciar o projeto escreva o seguinte comando:
```
npx expo start 
```

Para limpar o cache:
- Esse comando irá iniciar o projeto e ao mesmo tempo limpar o cache.

```
npx expo start -c
```

- No aplicativo você pode ler o QR code ou escrever manualmente o link que está em seu terminal

![image](https://github.com/user-attachments/assets/cefda90f-4479-4883-b1ec-03af9e5c1694)

<br>

**🔝 [Voltar ao Índice](#-%C3%ADndice)**

---

<br><br><br>

# 📱 4 **Fluxo das Funcionalidades**
## ✅ 1° **Fluxo de Check-in**
📌Objetivo: Oferece a lista de pilotos com pagamentos confirmados, permitindo a edição do peso inicial e lastro, medidos no dia da corrida.

https://github.com/user-attachments/assets/a58c55f8-fd88-4655-b2eb-9241720a573a

<br>

**🔝 [Voltar ao Índice](#-%C3%ADndice)**

<br><br>

## ✅ 2° **Fluxo de Sorteio**
📌Objetivo: Oferece a lista de pilotos com check-in, permitindo as configurações para inicio do sorteio de karts, vinculando cada número ao seu respectivo piloto.

https://github.com/user-attachments/assets/f15a80ef-b727-42cc-9ae0-6bdf901332e3

<br>

**🔝 [Voltar ao Índice](#-%C3%ADndice)**

<br><br>

## ✅ 3° **Fluxo de Check-out**
📌Objetivo: Oferece a lista de pilotos com check-in, permitindo a edição do peso final e se o piloto está classificado.


https://github.com/user-attachments/assets/1e7125a2-5174-4701-b509-fd0d99d0598b

<br>

**🔝 [Voltar ao Índice](#-%C3%ADndice)**

---

<br><br><br>



## 🛠 Tecnologias

As seguintes tecnologias foram utilizadas no desenvolvimento desse projeto:

-  **[ JavaScript ]( https://developer.mozilla.org/pt-BR/docs/Web/JavaScript )**
-  **[ ReactNative ]( https://reactnative.dev/ )**
-  **[ Expo ]( https://docs.expo.dev/)**
-  **[ Html ]( https://developer.mozilla.org/pt-BR/docs/Web/HTML )**

---

## 📑 Apêndices

-  ` Confira o Projeto antes da mudança em PHP: `  ➡️➡️ [ Projeto Web via PHP ]( https://github.com/LarissaSL/SistemaCKC )
-  ` Confira o Projeto da API aqui: ` ➡️➡️ [ Projeto Mobile ]( https://github.com/LarissaSL/API_Gerenciador-De-Corridas-de-Kart )
-  ` Confira o Novo Projeto Web aqui: ` ➡️➡️ [ Projeto Web via JS ]( https://github.com/LarissaSL/API_Gerenciador-De-Corridas-de-Kart )

<br>

**🔝 [Voltar ao Índice](#-%C3%ADndice)**
