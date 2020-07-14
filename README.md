# Uber Clone

Este é o repositório com o código fonte desenvolvido durante as aulas do
Rocketseat no [YouTube](https://youtu.be/bg-U0xZwcRk) onde criamos um clone da interface do Uber.

## Instalação

Você precisará ter apenas o [NodeJS](https://nodejs.org) instalado na sua máquina, e após isso, clonar este repositório:

```sh
  $ git clone https://github.com/eriksongoncalves/uber-clone-react-native.git
```

Depois disso acesse a pasta e instale as dependências executando o seguinte comando:

```sh
  $ yarn install # ou npm install
```

## Executando a aplicação

Execute o comando a baixo para inicializar:

```sh
  $ yarn start # ou npm start
```

## Atenção

Você vai precisar configurar o Google Maps API(Maps SDK, places, directions, geocoding) e adicionar a sua API KEY nos componentes:

- src/components/Directions
- src/components/Map
- src/components/Search
- android/app/src/main/AndroidManifest.xml
