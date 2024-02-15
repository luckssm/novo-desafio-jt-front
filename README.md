# Observações

### Paginação

A chamada à API de paginação não retorna a quantidade total de páginas do backend, tornando difícil a tarefa de utilizar o design de paginação proposto. Para dar sequência à tarefa, foi realizada a paginação simplesmente fazendo uma chamada à API que retorne todos os itens e exibindo para o usuário apenas os itens de interesse.

Seria mais interessante fazer uma chamada que retornasse apenas os itens da página atual exibida para o usuário, mas como não existiam tantos itens no total (42), essa abordagem de pegar todos os itens não chegou a ser um problema.

### Typescript

A maioria dos projetos que trabalhei utilizavam somente Javascript, então atualizar o projeto para Typescript demandou um pouco de estudo e pesquisa.

Provavelmente ainda falta adicionar algumas definições de tipos e deve ter uma forma melhor de organizá-los, mas não foquei muito nisso tanto pela minha falta de experiência (não ia conseguir deixar "perfeito" nesse curto período) e para poder progredir nas outras tarefas.

Acredito que com uma base de referência e um pouco mais de experiência já conseguirei melhorar nesse ponto.

### Storybook

Sinceramente nunca tinha ouvido falar dessa ferramenta, então foi mais um desafio no projeto.

No começo confesso que não gostei muito da ideia de ter que ficar repetindo código só para ter acesso a algo que já estava pronto (afinal, é "só rodar o código e ir vendo as telas"). Além disso, é mais uma ferramenta para ser aprendida, e acho que a stack de front já tem muitas ferramentas e frameworks.

Mas apesar do desafio, conforme fui estudando e utilizando, consegui perceber na prática as vantagens da ferramenta. Me peguei algumas vezes agradecendo por não ter que abrir o aplicativo só para ver como era o design de um componente (e esse era um projeto simples).

Acho que como eu já tinha uma base pronta desse projeto, não via tanto a utilidade, porque eu estava adicionando as stories somente para documentar e facilitar o desenvolvimento depois (o que não faz muito sentido em um projeto teste de poucos dias).

Mas pelo que entendi, o verdadeiro poder da ferramenta está na hora de criar o projeto, dividindo em stories pequenas e depois juntando os pedaços, assim como fazemos tanto no react quanto no scrum. A diferença é que a ferramenta deixa muito mais fácil de visualizar e testar esses componentes individualmente. Acho que aí sim o impacto seria muito positivo.

Não fiz o Storybook do projeto inteiro porque achei que ficaria repetitivo nesse momento, e preferi desenvolver outros pontos.

### Jest e React Testing Library

Utilizei o Jest antes principalmente para fazer testes no backend, então não tinha muita noção de como usar para o frontend.

Decidi focar em adicionar alguns testes unitários de componentes, para garantir que estavam renderizando corretamente.

Tive dificuldades em fazer testes de integração, principalmente utilizando os estados do redux nos testes. Não consegui, por exemplo, simular uma atualização da página após uma mudança de estados do redux. Por esse motivo, preferi testar o redux separadamente dos componentes, testando apenas sua funcionalidade.

Nunca tinha usado React Testing Library, então foi interessante entender que realmente precisaria de alguma outra ferramenta (mais uma) para fazer os testes no frontend com React.

### Cypress

Era o que utilizava para fazer os testes no frontend, utilizando a abordagem de testes E2E. Já tinha feito uma implementação desse teste no outro desafio, então simplesmente atualizei para executar os dois testes nesse desafio repaginado.

### TODOs

Deixei alguns TODOs no meio do código para indicar o que poderia ser feito no futuro. Normalmente adicionaria essas informações em tasks no backlog do projeto.
