
**Marcações como por exemplo: [edit: OK] são edições no documento feitas por mim para indicar observações ou pontos realizados do desafio** 
<hr/>
A Gabriel é uma startup focada em proteger pessoas. Com isso, buscamos talentos capazes de construir sistemas com foco em segurança e escalabilidade. Para descobrir se você é o próximo talento a integrar o nosso time, queremos propor o desafio a seguir.

#### Desafio

Implementar uma API web, utilizando o padrão REST, para gerenciamento de câmeras dos nossos clientes. Através de sua API deve ser possível:

- Adicionar novas câmeras [edit: OK]
- Desabilitar uma câmera [edit: OK]
- Listar as câmeras de um cliente [edit: OK]
- Registrar ocorrência de alertas [edit: OK]
- Obter ocorrências de alertas por intervalo de tempo [edit: OK]

#### Regras de Negócio

- Não é permitida mais de uma câmera com mesmo IP por cliente [edit: OK]
- Não há máscara de rede, porém o formato do IP precisa ser válido [edit: OK]
- Uma câmera está obrigatoriamente associada a um único cliente [edit: OK]
- Um alerta está obrigatoriamente associado a uma única câmera [edit: OK]

#### Critérios de Aceitação

- Deve ser possível filtrar câmeras por estado (hab./desabilitada) [edit: OK]
- Deve ser possível filtrar as ocorrências de alerta: [edit: OK]
	- Por cliente [edit: OK]
	- Por intervalo de tempo válido [edit: OK]
	- A partir de uma data/hora válida [edit: OK]
	- Se nenhum intervalo for passado, retorne as ocorrências do dia. [edit: OK]

Com exceção das regras de negócios citadas no Desafio, nenhum erro precisa de tratamento específico. Entretanto, a API não deve retornar informações técnicas sobre erros não tratados, tais como mensagens de exceções ou pilha de execução (stack trace).

#### Requisitos Técnicos

- Não há restrição quanto a framework/linguagem. [edit: NestJS]
- Qualquer engine de banco de dados relacional é permitida. [edit: Postgres]
- Somente deve ser possível ter acessos aos recursos na API de maneira autenticada. [edit: JWT através do endpoint \auth ]
- Deve ser possível recriar a base de dados automaticamente. [edit: TypeOrm faz isso automaticamente]
- Datas precisam ser armazenadas no formato UTC. [edit: OK]
- Deve ser possível executar a API a partir de um script ou comando. [edit: scripts padrões informados através do package.json]

#### Dicas e Sugestões

O domínio é muito importante para nós. Com isso, estruture sua aplicação para um cenário real típico de um microsserviço imaginando que novas entidades devem ser facilmente adicionadas ao seu domínio.

Atente-se às boas práticas do framework/linguagem escolhido. Por exemplo, se você optar por uma linguagem Orientada a Objetos, evite violações do princípio SOLID. 

Tente cobrir sua aplicação com testes unitários. Não é necessário uma cobertura de 100%, mas, ao menos, as regras de negócio essenciais devem estar cobertas.

Tente dividir a entrega da API em commits. Pelo menos um commit por funcionalidade seria uma boa referência.

Imagine que temos muitos processos para avaliar, logo quanto menos tempo de setup da sua API melhor. Considere usar docker compose para compilar/disponibilizar sua API e o banco de dados com alguns dados para testes. Os nomes de clientes e câmeras não precisam fazer sentido (podem ser UUIDs ou números sequenciais), apenas o IP precisa ser um valor válido, pois faz parte das regras de negócio.