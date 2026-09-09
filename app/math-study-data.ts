export const mathStudyTabs = [
  { id: "negative" as const, title: "Sentenças e igualdades", description: "Expressão, sentença aberta, sentença fechada, identidade e conjunto solução.", detail: "PÁG. 170–175" },
  { id: "parentheses" as const, title: "Equações do 1º grau", description: "A balança da igualdade, princípios e resolução com conferência.", detail: "PÁG. 176–183" },
  { id: "order" as const, title: "Historinhas com uma incógnita", description: "Como descobrir a operação, definir x e montar a equação certa.", detail: "PÁG. 184–188" },
  { id: "equations" as const, title: "Duas incógnitas", description: "Representar relações entre x e y e encontrar pares que satisfazem uma equação.", detail: "PÁG. 189–192" },
  { id: "strategy" as const, title: "Sistemas por substituição", description: "Isole, substitua, resolva e retorne para encontrar a segunda incógnita.", detail: "PÁG. 193–197" },
];

export const mathLearningObjectives = [
  ["RECONHECER", "expressões, sentenças abertas e fechadas, identidades e equações."],
  ["RESOLVER", "equações do 1º grau preservando a igualdade e conferindo a raiz."],
  ["MODELAR", "historinhas por meio de uma equação ou de um sistema com duas incógnitas."],
  ["REPRESENTAR", "relações com duas incógnitas e testar pares ordenados."],
  ["APLICAR", "somente o método da substituição para resolver sistemas de equações."],
] as const;

export const sentenceKinds = [
  ["Expressão", "Não afirma igualdade ou desigualdade.", "4x + 7"],
  ["Sentença fechada", "Pode ser julgada verdadeira ou falsa sem descobrir uma letra.", "18 - 5 = 13"],
  ["Sentença aberta", "Depende do valor da incógnita.", "3x + 2 = 20"],
  ["Identidade", "É verdadeira para todo valor permitido da variável.", "2(x + 3) = 2x + 6"],
] as const;

export const equationBalanceSteps = [
  ["1", "Organize", "Elimine parênteses e reduza termos semelhantes."],
  ["2", "Preserve a balança", "Faça a mesma operação nos dois membros."],
  ["3", "Isole x", "Deixe a incógnita sozinha em um dos membros."],
  ["4", "Confira", "Substitua o valor encontrado na equação original."],
] as const;

export const storyQuestionRoute = [
  ["1", "O que preciso descobrir?", "Defina x com unidade: reais, anos, itens, quilômetros…"],
  ["2", "Que relações o texto dá?", "Marque total, diferença, dobro, metade, preço fixo e preço por unidade."],
  ["3", "Como escrevo cada personagem?", "Traduza uma informação por vez antes de montar a igualdade."],
  ["4", "O que forma o total?", "Some ou compare as partes exatamente como a história descreve."],
  ["5", "A resposta serve à história?", "Confira a conta, a unidade e responda com uma frase completa."],
] as const;

export const chapter9StoryModels = [
  { title: "Idades", text: "A mãe tem 4 vezes a idade da filha. Daqui a 8 anos terá o dobro.", model: "Filha = x; mãe = 4x. Daqui a 8 anos: 4x + 8 = 2(x + 8).", result: "2x = 8 → x = 4. Hoje: filha 4 anos e mãe 16 anos." },
  { title: "Preço fixo + uso", text: "Uma corrida custa R$ 7 de bandeirada e R$ 3 por quilômetro. O total foi R$ 31.", model: "Quilômetros = x; então 7 + 3x = 31.", result: "3x = 24 → x = 8 quilômetros." },
  { title: "Perímetro", text: "Um retângulo tem largura x, comprimento x + 3 e perímetro 26 cm.", model: "2x + 2(x + 3) = 26.", result: "4x + 6 = 26 → x = 5. Medidas: 5 cm e 8 cm." },
] as const;

export const twoVariableRules = [
  ["Uma equação, muitos pares", "x + y = 10 aceita (0,10), (1,9), (2,8)…"],
  ["Par ordenado", "A ordem importa: (x,y). Substitua x no lugar de x e y no lugar de y."],
  ["Sistema", "Duas equações devem ser verdadeiras ao mesmo tempo para o mesmo par."],
] as const;

export const substitutionSteps = [
  ["1", "Isole uma incógnita", "Escolha a equação em que x ou y fica sozinha com menos trabalho."],
  ["2", "Substitua na outra", "Troque a incógnita isolada pela expressão equivalente."],
  ["3", "Resolva a equação", "Agora haverá apenas uma incógnita."],
  ["4", "Volte e descubra a outra", "Use o valor encontrado na expressão isolada."],
  ["5", "Confira nas duas", "O par precisa tornar verdadeiras as duas equações do sistema."],
] as const;

export const substitutionModels = [
  { system: "y = x + 2  e  2x + y = 11", steps: ["Substitua y por x + 2: 2x + (x + 2) = 11.", "3x + 2 = 11 → 3x = 9 → x = 3.", "Volte: y = 3 + 2 = 5."], answer: "S = {(3,5)}" },
  { system: "x = 2y + 1  e  x + y = 10", steps: ["Substitua x por 2y + 1: (2y + 1) + y = 10.", "3y + 1 = 10 → 3y = 9 → y = 3.", "Volte: x = 2·3 + 1 = 7."], answer: "S = {(7,3)}" },
] as const;

export const signRules = [
  ["Soma com sinais iguais", "Some os módulos e mantenha o sinal.", "−7 + (−4) = −11"],
  ["Soma com sinais diferentes", "Subtraia os módulos e use o sinal do maior módulo.", "−9 + 5 = −4"],
  ["Subtração", "Troque a subtração pela soma do oposto.", "6 − (−3) = 6 + 3 = 9"],
  ["Multiplicação e divisão", "Sinais iguais dão +; sinais diferentes dão −.", "(−4) × 3 = −12"],
] as const;

export const rationalRules = [
  ["Frações equivalentes", "Multiplique ou divida numerador e denominador pelo mesmo número não nulo.", "3/4 = 6/8 = 9/12"],
  ["Somar e subtrair", "Use denominador comum; depois opere os numeradores e conserve o denominador.", "2/3 + 1/6 = 4/6 + 1/6 = 5/6"],
  ["Multiplicar", "Multiplique numeradores e denominadores; simplifique antes ou depois.", "(−3/5) × (10/9) = −2/3"],
  ["Dividir", "Conserve a primeira fração e multiplique pelo inverso da segunda.", "3/4 ÷ 2/5 = 3/4 × 5/2 = 15/8"],
] as const;

export const rationalOrder = [
  ["1", "Potências e raízes"], ["2", "Multiplicações e divisões"], ["3", "Adições e subtrações"],
] as const;

export const translationSteps = [
  ["1", "Descubra o desconhecido", "Pergunte: o que a questão quer descobrir? Dê uma letra a essa quantidade, normalmente x."],
  ["2", "Sublinhe as relações", "Marque palavras como dobro, metade, mais, diferença, total, excede e igual."],
  ["3", "Traduza um pedaço por vez", "Escreva primeiro cada relação. Só depois junte tudo em uma expressão ou equação."],
  ["4", "Decida: expressão ou equação", "Sem igualdade, é expressão. Se o texto diz que dois valores são iguais, use = e forme uma equação."],
  ["5", "Leia de volta", "Fale a expressão em voz alta e confira se ela conta exatamente a mesma história do enunciado."],
] as const;

export const phraseDictionary = [
  ["um número", "x"], ["o dobro de um número", "2x"], ["o triplo da soma de x com 5", "3(x + 5)"],
  ["a soma do triplo de x com 5", "3x + 5"], ["a metade de um número", "x/2"],
  ["x excede y em 8", "x = y + 8"], ["a diferença entre x e 7", "x − 7"], ["o total é 34", "… = 34"],
] as const;

export const algebraParts = [
  ["Coeficiente", "É o número que multiplica a letra.", "Em −4x², o coeficiente é −4."],
  ["Parte literal", "É a letra com seus expoentes.", "Em 7ab², a parte literal é ab²."],
  ["Termo independente", "Não possui letra e não depende da variável.", "Em 3x + 8, o 8 é independente."],
  ["Termos semelhantes", "Têm exatamente a mesma parte literal.", "5x e −2x são; 3x e 3x² não são."],
] as const;

export const simplificationModels = [
  { expression: "4x + 3x − 2x", groups: "(4 + 3 − 2)x", answer: "5x", note: "Some apenas os coeficientes e conserve x." },
  { expression: "3x + 4y − 2x − 6y", groups: "(3x − 2x) + (4y − 6y)", answer: "x − 2y", note: "Agrupe x com x e y com y." },
  { expression: "4(a + 0,5)", groups: "4·a + 4·0,5", answer: "4a + 2", note: "A distributiva multiplica todos os termos do parêntese." },
] as const;

export const equationSteps = [
  ["1", "Elimine parênteses e denominadores", "Use a distributiva e, com frações, multiplique todos os termos pelo m.m.c."],
  ["2", "Agrupe os termos com x", "Deixe os termos com incógnita no primeiro membro e os números no segundo."],
  ["3", "Reduza cada membro", "Some algebricamente os termos semelhantes."],
  ["4", "Isole x", "Divida os dois membros pelo coeficiente de x, que deve ser diferente de zero."],
  ["5", "Confira", "Substitua a resposta na equação original: os dois membros precisam ter o mesmo valor."],
] as const;

export const equationModels = [
  { level: "1 · PRINCÍPIO ADITIVO", expression: "x − 4 = 7", steps: ["Some 4 aos dois membros.", "x = 7 + 4", "x = 11"], check: "11 − 4 = 7 ✓" },
  { level: "2 · PRINCÍPIO MULTIPLICATIVO", expression: "3x = −21", steps: ["Divida os dois membros por 3.", "x = −21 ÷ 3", "x = −7"], check: "3(−7) = −21 ✓" },
  { level: "3 · DUAS ETAPAS", expression: "3x + 4 = 19", steps: ["Subtraia 4: 3x = 15.", "Divida por 3.", "x = 5"], check: "3(5) + 4 = 19 ✓" },
  { level: "4 · DISTRIBUTIVA", expression: "4(x + 1) = 20", steps: ["Distribua: 4x + 4 = 20.", "Subtraia 4: 4x = 16.", "x = 4"], check: "4(4 + 1) = 20 ✓" },
  { level: "5 · x NOS DOIS LADOS", expression: "5x + 2 = 3x + 14", steps: ["Subtraia 3x: 2x + 2 = 14.", "Subtraia 2: 2x = 12.", "x = 6"], check: "32 = 32 ✓" },
  { level: "6 · FRAÇÕES", expression: "(x + 2)/2 − (2x − 3)/4 = (3x + 1)/3", steps: ["Use o m.m.c. 12 e multiplique todos os termos.", "Elimine os denominadores e reduza.", "Isole x e confira na original."], check: "Nunca multiplique apenas um termo pelo m.m.c." },
] as const;

export const problemSteps = [
  ["1", "O que eu preciso descobrir?", "Defina x com unidade: idade, reais, centímetros, acertos…"],
  ["2", "O que o texto informa?", "Separe os dados e escreva a relação entre eles em frases curtas."],
  ["3", "Qual é a história matemática?", "Traduza as relações e monte uma única equação."],
  ["4", "Resolva linha por linha", "Mantenha a igualdade e registre a operação aplicada."],
  ["5", "A resposta faz sentido?", "Substitua, confira a unidade e responda com uma frase completa."],
] as const;

export const problemModels = [
  { title: "Idades", text: "A soma das idades de Pedro e Paulo é 34. Pedro tem 2 anos a mais.", model: "Paulo = x; Pedro = x + 2; então x + (x + 2) = 34.", result: "2x + 2 = 34 → x = 16. Paulo: 16; Pedro: 18." },
  { title: "Perímetro", text: "Base e altura são números consecutivos e o perímetro é 14 cm.", model: "Altura = x; base = x + 1; então 2x + 2(x + 1) = 14.", result: "4x + 2 = 14 → x = 3. Medidas: 3 e 4; área = 12 cm²." },
  { title: "Acertos e erros", text: "Ganha R$ 5 por acerto, perde R$ 3 por erro e fez 50 exercícios, ficando com R$ 130.", model: "Acertos = x; erros = 50 − x; então 5x − 3(50 − x) = 130.", result: "8x − 150 = 130 → x = 35 acertos." },
] as const;

export const justificationFrame = [
  ["MODELEI", "Defini x como… e representei a situação por…"],
  ["RESOLVI", "Apliquei … nos dois membros para manter a igualdade…"],
  ["CONFERI", "Substituindo x = … na equação original, os dois lados resultam em…"],
  ["CONCLUÍ", "Portanto, …, com a unidade pedida."],
] as const;

export const workedExamples = [
  { expression: "−8/7 + (−1/6)", steps: ["Use denominador comum 42.", "−8/7 = −48/42 e −1/6 = −7/42.", "Some os numeradores: −48 + (−7) = −55."], answer: "−55/42" },
  { expression: "3/4 ÷ 2/5", steps: ["Mantenha 3/4.", "Troque a divisão por multiplicação.", "Inverta 2/5 para 5/2 e multiplique."], answer: "15/8" },
] as const;

export const examChecklist = [
  "Defini claramente o que x representa?", "Traduzi cada expressão na mesma ordem do texto?", "Diferenciei 3x + 5 de 3(x + 5)?",
  "Juntei somente termos com a mesma parte literal?", "Fiz a mesma operação nos dois membros da equação?",
  "Substituí a resposta na equação original?", "Respondi com frase completa e unidade?",
] as const;

export const commonTraps = [
  ["Dobro da soma ≠ soma do dobro", "O dobro da soma de x com 5 é 2(x + 5). A soma do dobro de x com 5 é 2x + 5."],
  ["Nem todo termo com letra é semelhante", "3x e 5x são semelhantes; 3x e 5x² não são, porque as partes literais diferem."],
  ["“Passar para o outro lado” não é mágica", "A troca de sinal é um atalho para aplicar a mesma operação nos dois membros."],
  ["Encontrar x não encerra um problema", "Ainda é preciso conferir, interpretar o valor e responder exatamente o que foi perguntado."],
] as const;
