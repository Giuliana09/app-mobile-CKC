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

## ⚙️ Funcionalidades

**Autenticação**
   - 🟢 Fazer Login
**Gerenciamento de Corridas**
   - 🟢 Buscar Lista de Corridas
   - 🟢 Aplicar Filtros nas Buscas de Corridas
**Check-in de Pilotos**
   - 🟢 Realizar Check-in de Pilotos
   - 🟢 Exibir Lista de Pilotos para Check-in
   - 🟢 Exibir Campos Disponíveis para Alteração no Check-in
   - 🟢 Exibir Confirmação de Check-in
**Sorteio de Pilotos**
   - 🟢 Realizar Sorteio para os Pilotos
   - 🟢 Solicitar Maior Número de Kart
   - 🟢 Excluir Números 
   - 🟢 Confirmar Exclusão de Números de Kart
   - 🟢 Exibir Resultado do Sorteio por Piloto
   - 🟢 Exibir Confirmação do Sorteio
   - 🟢 Exibir Lista Completa de Pilotos e seus Números de Kart
**Check-out de Pilotos**
   - 🟢 Realizar Check-out de Pilotos
   - 🟢 Exibir Lista de Pilotos para Check-out
   - 🟢 Exibir Campos Disponíveis para Alteração no Check-out
   - 🟢 Exibir Confirmação de Check-out
**Compartilhamento**
   - 🟡 Compartilhar Informações de Check-in e Sorteio via WhatsApp
**Navegação**
   - 🟢 Menu do Aplicativo
   - 🟡 Navegação da Tela de Check-in feito
   - 🟡 Navegação da Tela de Check-ou feito
   - 🟡 Navegação da Tela de Sorteio feito

## 🖥️ Telas
**Autenticação**
   - 🟢 Tela de Login
**Navegação Principal**
   - 🟢 Menu Principal
**Check-in**
   - 🟢 Tela para Exibir Corridas de Check-in
   - 🟢 Tela para Exibir Lista de Pilotos para Check-in
   - 🟡 Tela para Exibir Campos Disponíveis para Alteração em Check-in
   - 🟢 Tela de Confirmação de Check-in
**Sorteio**
   - 🟢 Tela para Exibir Corridas para Fazer Sorteio
   - 🟢 Tela para Exibir Resultados do Sorteio por Piloto
   - 🟡 Telas de Configurações do Sorteio
   - 🟡 Tela de Confirmação do Sorteio
   - 🟡 Tela para Exibir Lista Completa de Pilotos e seus Números de Kart
**Check-out**
   - 🟢 Tela para Exibir Corridas para Fazer Check-out
   - 🟡 Tela para Exibir Lista de Pilotos para Check-out
   - 🟡 Tela para Exibir Campos Disponíveis para Alteração em Check-out
   - 🟢 Tela de Confirmação de Check-out



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

<br><br>
---

# 🖥️🛠️ Como usar?

## 1° Instalando dependências e bibliotecas

**_Utilizando seu IP de Rede em uma variável de ambiente_**

Crie um arquivo .env na raiz do projeto
```
API_URL="http://{SEU-IP-DE-REDE}:8080"
```

No projeto instale o plugin que irá permitir a leitura dessa variável no código.

```
npm install dotenv
```

Resultado esperado:

![image](https://github.com/user-attachments/assets/b0e85850-e690-4f7e-9954-017462da316f)


Como este projeto é desenvolvido com React Native, é necessário ter o NodeJS instalado [instale a última versão LTS](https://nodejs.org/en/) e algumas bibliotecas:


### 1- Adicionando o node_modules.
Como este arquivo é muito pesado, então é padrão que ele esteja entre os arquivos que são ignorados através do gitgnore.

- Antes de tudo, é importante em seu terminal que esteja dentro do diretório do projeto, EX:  `**C:\Users\app-mobile-CKC:** `
- Em seu terminal digite o seguinte comando:

```
npm install
```
---
### 2- React Navigation
React Navigation é composto de alguns utilitários principais e eles são usados ​​para criar a estrutura de navegação em aplicativos

**_Instalação_**

```
npm install @react-navigation/native
```
**_Instalando suas dependências_**
```
npx expo install react-native-screens react-native-safe-area-context
```
**_Instalando native stack navigator_**
- Ele fornece uma maneira para o aplicativo fazer a transição entre telas e gerenciar o histórico de navegação

```
npm install @react-navigation/native-stack
```
**_Instalando tabs para barra de navegação_**
- Ele fornece a estrutura para desenvolver a navbar do aplicativo

```
npm install @react-navigation/bottom-tabs
```
**_Instalando ícones do react_**
- Ele fornece uma biblioteca de ícones que podem ser usados diretamente no código, utilizando apenas o seu nome

```
npm install react-native-vector-icons
```
**_Instalando recurso para o typescript_**
- Ele fornece um recurso para que o typescript reconheça os ícones do react.

```
npm i --save-dev @types/react-native-vector-icons
```
---
### 3 - Uso da font

- Primeiro comando:
 
	```
	npx expo install expo-font
	```
 
 - Segundo comando:
 
	```
	npx expo install expo-splash-screen  
	```

---

### 4- Em seu celular baixe o aplicativo da Expo chamado "Expo Go", compatível com Android e IOS.
 
Através dele é possível utilizar seu próprio celular para emular o projeto, sem a necessidade de sobrecarregar seu pc com o emulador Android por exemplo.

- Com ele você pode ler o QR code que irá aparecer quando executar a aplicação para conectar com seu celular, porém é necessário que esteja na mesma rede de internet que seu computador. Ou pode conectar com o cabo USB:

### 5- Conexão via USB
Com o celular conectado ao computador, você irá verificar se seu celular está sendo reconhecido através do comando:

```
adb devices 
```
- Deve aparecer assim:
  
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
```
adb devices
```
`Dessa vez irá aparecer Devices no lugar do offiline`
<br>

- Ainda no terminal digite:

```
npm uninstall -g ngrok
```
- Em seguida:
```
npm install -g ngrok
```
## 6 - Executando o projeto
Para iniciar o projeto escreva o seguinte comando:
```
npx expo start 
```

Caso deseja usa a conexão via USB:

```
npx expo start --tunnel
```

Para limpar o cache:
- Esse comando irá iniciar o projeto e ao mesmo tempo limpar o cache.

```
npx expo start -c
```

- No aplicativo você pode ler o QR code ou escrever manualmente o link que está em seu terminal

![image](https://github.com/user-attachments/assets/cefda90f-4479-4883-b1ec-03af9e5c1694)

- QR code e o link:
  
![image](https://github.com/user-attachments/assets/ae7aa87f-67d0-49fd-b590-7b25aa22fcdb)


<br><br>
---

## Como Resolver o Problema de "ADB Devices" Não Reconhecido

Se o seu computador não reconhecer o comando `adb devices`, siga os passos abaixo:

1. **Baixar Ferramenta ADB**  
   - Você precisará baixar a ferramenta ADB da plataforma oficial do Android.
   - Acesse o link para a página de download: [SDK Platform-Tools](https://developer.android.com/tools/releases/platform-tools?hl=pt-br).
   - Na seção **Downloads**, faça o download do SDK Platform-Tools de acordo com o seu sistema operacional (Windows, macOS ou Linux).

2. **Descompactar e Configurar Caminho**  
   - Após o download, descompacte a pasta baixada.
   - Abra a pasta **Platform-tools** e copie o caminho dela.

3. **Configurar Variáveis de Ambiente no Windows**  
   - No Windows, procure por "Editar as Variáveis de Ambiente do Sistema" no menu de pesquisa.
   - Clique em **Variáveis de Ambiente**.
   - Na seção **Variáveis do Sistema**, procure por `Path`, selecione-o e clique em **Editar**.
   - Clique em **Novo** e cole o caminho da pasta **Platform-tools** que você copiou anteriormente.

4. **Testar Configuração**  
   - Feche e reabra o prompt de comando (CMD).
   - Execute o comando `adb devices` para verificar se o ADB foi reconhecido corretamente.

--- 
<br><br>

## 🛠 Tecnologias

As seguintes tecnologias foram utilizadas no desenvolvimento desse projeto:

-  **[JavaScript]( https://developer.mozilla.org/pt-BR/docs/Web/JavaScript )**
-  **[ReactNative]( https://reactnative.dev/ )**
-  **[ Expo ]( https://docs.expo.dev/)**
-  **[ Html ]( https://developer.mozilla.org/pt-BR/docs/Web/HTML )**
-  **[ MySQL ]( https://www.mysql.com )**

## 📑 Apêndices

-  ` Confira o Projeto antes de mudar API aqui: `  ➡️➡️ [ Projeto Web via PHP ]( https://github.com/LarissaSL/SistemaCKC )
-  ` Confira o Projeto Mobile aqui: ` ➡️➡️ [ Projeto Mobile ]( https://github.com/LarissaSL/API_Gerenciador-De-Corridas-de-Kart )
-  ` Confira o Novo Projeto Web aqui: ` ➡️➡️ [ Projeto Web via JS ]( https://github.com/LarissaSL/API_Gerenciador-De-Corridas-de-Kart )
