import { algebraParts, equationModels, phraseDictionary, rationalRules, signRules, translationSteps } from "./math-study-data";
import { evidenceChain, figurativeLanguage, keyTerms, mainIdeas } from "./study-data";

export type Flashcard = {
  id: string;
  front: string;
  back: string;
  hint?: string;
};

export type FlashcardSource = {
  id: string;
  subject: "English" | "Matemática" | "Ciências" | "Geografia" | "História" | "Português";
  title: string;
  description: string;
  cards: Flashcard[];
};

const cards = (prefix: string, rows: Array<[string, string, string?]>): Flashcard[] => rows.map(([front, back, hint], index) => ({
  id: `${prefix}-${index + 1}`,
  front,
  back,
  hint,
}));

const englishVocabulary: Flashcard[] = keyTerms.map(([number, term, definition]) => ({
  id: `en-vocab-${number}`,
  front: term,
  back: definition,
  hint: "Explain the word before flipping the card.",
}));

const englishIdeas: Flashcard[] = [
  ...mainIdeas.map((idea, index) => ({
    id: `en-idea-${index + 1}`,
    front: idea.title,
    back: `${idea.explanation} Think deeper: ${idea.reflection}`,
    hint: "Connect the idea to one event from William's story.",
  })),
  ...evidenceChain.map(([title, text], index) => ({
    id: `en-chain-${index + 1}`,
    front: `What happens at the “${title}” stage?`,
    back: text,
    hint: "Follow cause → effect → response → impact.",
  })),
];

const englishLanguage: Flashcard[] = figurativeLanguage.map(([expression, meaning], index) => ({
  id: `en-language-${index + 1}`,
  front: `What does “${expression}” mean in context?`,
  back: meaning,
  hint: "Do not interpret the weather expression literally.",
}));

const mathRationals: Flashcard[] = [
  ...rationalRules.map(([title, rule, example], index) => ({
    id: `math-rational-${index + 1}`,
    front: title,
    back: `${rule} Exemplo: ${example}`,
    hint: "Diga a regra antes de olhar o exemplo.",
  })),
  ...signRules.map(([title, rule, example], index) => ({
    id: `math-sign-${index + 1}`,
    front: title,
    back: `${rule} Exemplo: ${example}`,
    hint: "Primeiro identifique qual operação está sendo feita.",
  })),
  ...cards("math-rational-extra", [
    ["Qual número é maior: −2 ou −7?", "−2, porque está mais à direita na reta numérica."],
    ["O que é o módulo de −9?", "9. Módulo é a distância até o zero, sempre não negativa."],
    ["Qual é o oposto de −12?", "+12. Números opostos têm o mesmo módulo e sinais diferentes."],
    ["Como transformar 1/2 em decimal e porcentagem?", "1 ÷ 2 = 0,5 = 50%."],
  ]),
];

const mathParentheses: Flashcard[] = [
  ...translationSteps.map(([number, title, text]) => ({ id: `math-translation-${number}`, front: `${number}. ${title}`, back: text, hint: "Traduza a história um pedaço por vez." })),
  ...phraseDictionary.map(([phrase, expression], index) => ({ id: `math-phrase-${index + 1}`, front: phrase, back: expression, hint: "Escreva com x antes de virar." })),
  ...algebraParts.map(([title, rule, example], index) => ({ id: `math-algebra-${index + 1}`, front: title, back: `${rule} ${example}`, hint: "Dê um exemplo com letras." })),
];

const mathEquations: Flashcard[] = equationModels.map((model, index) => ({
  id: `math-equation-${index + 1}`,
  front: `Resolva: ${model.expression}`,
  back: `${model.steps.join(" → ")} Conferência: ${model.check}`,
  hint: "Desfaça as operações na ordem inversa e faça o mesmo nos dois lados.",
}));

const mathChapter9 = cards("math-chapter9", [
  ["O que é sentença aberta?", "Uma sentença cuja verdade depende do valor de uma ou mais incógnitas. Ex.: 3x+2=20."],
  ["O que é identidade?", "Uma igualdade verdadeira para todo valor permitido da variável. Ex.: 2(x+3)=2x+6."],
  ["O que é conjunto solução?", "O conjunto dos valores do universo que tornam a sentença verdadeira."],
  ["Como preservar uma igualdade?", "Faça exatamente a mesma operação nos dois membros da equação."],
  ["Como conferir uma raiz?", "Substitua o valor encontrado na equação original e verifique se os dois membros ficam iguais."],
  ["Primeira pergunta de uma historinha", "O que preciso descobrir? Defina x com nome e unidade."],
  ["Como traduzir ‘6 a mais que x’?", "x+6."],
  ["Como modelar duas quantidades que somam 30 e diferem por 6?", "Menor=x; maior=x+6; então x+(x+6)=30."],
  ["Perímetro de um retângulo com lados x e x+3", "2x+2(x+3)."],
  ["Preço fixo de 7 mais 3 por unidade", "7+3x."],
  ["O que representa uma equação com x e y?", "Uma relação que pode admitir vários pares ordenados (x,y)."],
  ["Quando um par ordenado é solução?", "Quando a substituição de x e y torna a equação verdadeira."],
  ["O que é sistema de equações?", "Duas equações que devem ser verdadeiras ao mesmo tempo para o mesmo par (x,y)."],
  ["Passo 1 da substituição", "Isole a incógnita mais fácil em uma das equações."],
  ["Passo 2 da substituição", "Troque essa incógnita, na outra equação, pela expressão equivalente."],
  ["Passo 3 da substituição", "Resolva a equação que agora possui apenas uma incógnita."],
  ["Passo 4 da substituição", "Volte à expressão isolada e descubra a segunda incógnita."],
  ["Passo 5 da substituição", "Confira o par solução nas duas equações."],
  ["Resolva: y=x+2 e 2x+y=11", "Substitua: 2x+(x+2)=11 → x=3; depois y=5. Solução: (3,5)."],
  ["Erro clássico em sistemas", "Parar depois de achar apenas uma incógnita. É preciso encontrar a outra e conferir as duas equações."],
]);

const scienceLiving = cards("science-living", [
  ["What is a biotic factor?", "A living or once-living part of an ecosystem, such as a plant, animal, bacterium, fungus or organic remains.", "Think: bio = life."],
  ["What is an abiotic factor?", "A nonliving condition or component, such as water, rocks, sunlight, air, soil, temperature, minerals or pH.", "Think: a-bio = without life."],
  ["How do biotic and abiotic factors interact?", "Abiotic conditions shape where organisms can live, and organisms can also change their environment."],
  ["Living thing clue 1: CELLS", "Every living thing is made of one or more cells."],
  ["Living thing clue 2: RESPIRATION", "Living things release energy from nutrients through respiration."],
  ["Living thing clue 3: ENERGY", "Living things need and use energy to carry out life processes."],
  ["Living thing clue 4: RESPONSE", "Living things respond to stimuli, such as light, temperature, sound or touch."],
  ["Living thing clue 5: GROWTH", "Living things grow and develop during their life cycle."],
  ["Living thing clue 6: REPRODUCTION", "Living things can produce new organisms."],
  ["Living thing clue 7: EXCRETION", "Living things remove metabolic waste."],
  ["Put the levels of organization in order.", "Cell → tissue → organ → organ system → organism.", "Start with the smallest unit."],
  ["Cell → tissue: what changes?", "Similar specialized cells work together to form a tissue."],
  ["Tissue → organ: what changes?", "Different tissues work together to form an organ."],
  ["Organ → organ system: what changes?", "Several organs cooperate to perform a major body function."],
  ["What example of Indigenous knowledge appears in the study material?", "Some Indigenous communities understand nature through relationship, spirituality and respect; a rock in a talking circle may connect and strengthen the speakers. Traditions differ among peoples."],
]);

const scienceTaxonomy = cards("science-taxonomy", [
  ["What is classification?", "Organizing things into groups based on selected characteristics."],
  ["What is taxonomy?", "The science of classifying, identifying and naming organisms using shared characteristics and evolutionary relationships."],
  ["What did Aristotle contribute to classification?", "About 2,300 years ago, he created an early system that grouped animals by habitat and plants by form."],
  ["What did Carl Linnaeus contribute?", "In the 18th century, he standardized classification and scientific naming using shared physical characteristics."],
  ["How did Darwin change classification?", "Evolution connected classification to common ancestry and relationships through time."],
  ["What evidence does modern taxonomy use?", "Observable traits plus evidence such as cell structure, fossils and DNA."],
  ["Order the eight taxonomic ranks.", "Domain → Kingdom → Phylum → Class → Order → Family → Genus → Species.", "D K P C O F G S"],
  ["Which rank is broadest? Which is most specific?", "Domain is the broadest; species is the most specific."],
  ["What is binomial nomenclature?", "A standardized two-word scientific name for a species."],
  ["Rule 1 for a scientific name", "The genus comes first and begins with a capital letter."],
  ["Rule 2 for a scientific name", "The species name comes second and is lowercase."],
  ["Rule 3 for a scientific name", "Both Latinized words are written in italics, for example Panthera tigris."],
  ["How does a taxonomic key work?", "At each step, choose between two contrasting statements until the organism is identified."],
  ["What do fossils show?", "They preserve evidence of past life and help reconstruct evolution and common ancestry."],
  ["Which vertebrate group appeared first in the PDF timeline?", "Fish, about 500 million years ago."],
  ["Approximate first appearance: amphibians", "About 370 million years ago, during the Devonian."],
  ["Approximate first appearance: reptiles", "About 320 million years ago, during the Carboniferous."],
  ["Approximate first appearance: mammals and birds", "Mammals: about 200 million years ago. Birds: about 150 million years ago."],
  ["Which two organisms are usually most closely related?", "The pair that shares the greatest number of taxonomic levels, especially the same genus."],
]);

const scienceMicroorganisms = cards("science-micro", [
  ["MONERA: cell type, body and nutrition", "Prokaryotic, unicellular, and either autotrophic or heterotrophic."],
  ["PROTIST · PROTOZOA: cell type, body and nutrition", "Eukaryotic, unicellular and heterotrophic."],
  ["PROTIST · ALGAE: cell type, body and nutrition", "Eukaryotic, unicellular or multicellular, and autotrophic."],
  ["FUNGI: cell type, body and nutrition", "Eukaryotic, unicellular or multicellular, and heterotrophic by absorption."],
  ["Why are fungi important decomposers?", "They break down organic matter and recycle nutrients in ecosystems."],
  ["How do people use fungi?", "To make foods and beverages such as bread, cheese, beer and wine, and as biocontrol agents in agriculture."],
  ["Why are algae important in aquatic ecosystems?", "They are primary producers: they photosynthesize, release oxygen and form the base of many aquatic food chains."],
  ["How can algae help with climate change?", "They absorb carbon dioxide, contributing to carbon sequestration."],
  ["What is a lichen?", "A mutualistic association between a fungus and a photosynthetic partner such as an alga."],
  ["What does the photosynthetic partner provide in a lichen?", "Sugars made by photosynthesis."],
  ["What does the fungus provide in a lichen?", "Protection, water and minerals."],
  ["What ecological roles can protozoa have?", "Consumers, predators and decomposers; many help control bacterial populations."],
  ["Malaria: agent and transmission", "Plasmodium; transmitted by the bite of an infected mosquito."],
  ["Chagas disease: agent and transmission", "Trypanosoma cruzi; transmitted by the kissing bug vector."],
  ["Amoebiasis: agent and transmission", "Entamoeba histolytica; usually acquired through contaminated food or water."],
  ["Giardiasis: agent and transmission", "Giardia lamblia; usually acquired through contaminated food or water."],
  ["What is binary fission?", "A bacterium copies its DNA and divides into two cells."],
  ["Is bacterial conjugation reproduction?", "No. It is the exchange of genetic material between bacteria and increases variation."],
  ["How does antibiotic resistance spread by natural selection?", "Antibiotics kill susceptible bacteria; resistant ones survive, reproduce and become more common."],
  ["How can conjugation affect antibiotic resistance?", "Resistance genes can move from one bacterium to another."],
  ["How does the gut microbiota help humans?", "Some bacteria digest complex carbohydrates and support metabolism and immune function."],
  ["How do bacteria make yogurt?", "They ferment lactose into lactic acid; the lower pH thickens milk and creates a sour taste."],
  ["How do bacteria cause cavities?", "They consume sugars and produce acids that corrode tooth enamel."],
  ["What do soil bacteria do?", "They decompose organic matter, recycle nutrients, may fix nitrogen and promote plant growth."],
  ["What is bioremediation?", "The use of microorganisms to help remove or break down pollutants."],
  ["Why are viruses outside the five kingdoms in this material?", "They are acellular and cannot reproduce or perform metabolism independently; they need a host cell."],
  ["Do antibiotics treat viruses?", "No. Antibiotics act against certain bacteria, not viruses."],
]);

const sciencePlants = cards("science-plants", [
  ["Three main characteristics of plants", "They are eukaryotic, multicellular and mostly autotrophic through photosynthesis."],
  ["Why are plants at the base of food chains?", "They transform sunlight into chemical energy stored in sugars, which enters the food chain."],
  ["Plant cell: cell wall", "Provides rigid shape, structural support and protection."],
  ["Plant cell: chloroplasts", "Contain chlorophyll and perform photosynthesis, converting light energy into chemical energy."],
  ["Plant cell: large central vacuole", "Stores water, nutrients and waste and helps keep the cell firm."],
  ["Plant cell × animal cell", "Plant cells have a cell wall, chloroplasts and a large central vacuole; animal cells do not and usually have smaller vacuoles."],
  ["Xylem × phloem", "Xylem moves water and mineral salts mainly upward; phloem transports sugars to the rest of the plant."],
  ["BRYOPHYTES", "No vascular vessels, seeds, flowers or fruits. They depend on water for reproduction. Example: moss."],
  ["PTERIDOPHYTES", "Have vascular vessels but no seeds, flowers or fruits. They depend on water for reproduction. Example: fern."],
  ["GYMNOSPERMS", "Have vascular vessels and seeds, but no flowers or fruits. They use pollen and do not depend on water for reproduction."],
  ["ANGIOSPERMS", "Have vascular vessels, seeds, flowers and fruits. They use pollen and do not depend on water for reproduction."],
  ["Which plant group first has seeds?", "Gymnosperms."],
  ["Which plant group first has flowers and fruits?", "Angiosperms."],
  ["Why can mosses be bioindicators?", "Many mosses are sensitive to pollution, so their presence can indicate good environmental quality."],
  ["What do roots do?", "They anchor the plant and absorb water and mineral salts."],
  ["What does the stem do?", "It supports branches, leaves, flowers and fruits and conducts sap."],
  ["What do leaves do?", "They perform most photosynthesis and exchange gases with the atmosphere."],
  ["What is the flower's main function?", "Sexual reproduction: it produces gametes, receives pollen and is where fertilization begins seed and fruit formation."],
  ["What is pollination?", "The transfer of pollen to the female reproductive structure of a flower."],
  ["What is fertilization?", "The meeting of male and female gametes."],
  ["What is inside a seed?", "An embryo and a reserve of nutrients."],
  ["What is germination?", "When suitable conditions allow the seed embryo to begin growing into a new plant."],
  ["What are the functions of a fruit?", "It protects seeds and can increase dispersal by attracting animals with color, scent or food."],
  ["Why are pollinators and seed dispersers important?", "They help angiosperms reproduce and spread to new places."],
]);

const geographyIndustry = cards("geo-industry", [
  ["Como industrialização e urbanização se relacionam?", "A indústria atrai trabalhadores, investimentos e serviços para as cidades; o crescimento urbano amplia mão de obra e mercado para a indústria."],
  ["O que é industrialização?", "Expansão da produção industrial e transformação da economia, com aumento de fábricas, infraestrutura e trabalho industrial."],
  ["O que é urbanização?", "Crescimento da população urbana e das cidades em relação ao campo."],
  ["O que é êxodo rural?", "Migração da população do campo para as cidades, estimulada pela mecanização rural e pela busca de trabalho e serviços urbanos."],
  ["Como a crise de 1929 impulsionou a indústria brasileira?", "A queda das exportações de café reduziu a capacidade de importar e estimulou a produção interna de bens antes comprados no exterior."],
  ["O que foi a industrialização por substituição de importações?", "Produzir no Brasil mercadorias que antes eram importadas."],
  ["Qual foi o papel do Estado na Era Vargas?", "Investiu em indústrias de base, energia, transportes e legislação trabalhista, intervindo mais diretamente na economia."],
  ["Por que a CSN simboliza a Era Vargas?", "Porque a siderurgia fornece aço, insumo básico para outras indústrias e obras de infraestrutura."],
  ["Por que a indústria se concentrou no Sudeste?", "Capital do café, ferrovias, portos, mão de obra, energia, infraestrutura e grande mercado consumidor."],
  ["Quando o Brasil se tornou predominantemente urbano?", "Na década de 1970, segundo o material de revisão."],
  ["O que é metropolização?", "Expansão das grandes cidades e de sua influência sobre municípios vizinhos."],
  ["O que é conurbação?", "União física das manchas urbanas de cidades vizinhas, formando uma área contínua."],
  ["O que é uma região metropolitana?", "Agrupamento oficial de municípios ao redor de uma metrópole para planejamento de problemas e serviços comuns."],
  ["O que é hierarquia urbana?", "Organização das cidades segundo sua influência, funções e oferta de bens e serviços."],
  ["Metrópole nacional × centro local", "A metrópole nacional influencia grande parte do país e concentra funções complexas; o centro local atende necessidades básicas próximas."],
  ["O que são funções urbanas?", "Papéis desempenhados pelas cidades, como funções industriais, comerciais, administrativas, financeiras, turísticas ou portuárias."],
  ["O que é segregação socioespacial?", "Separação desigual dos grupos sociais no espaço urbano, com acesso diferente a moradia, serviços e infraestrutura."],
  ["Cite quatro problemas urbanos ligados ao crescimento sem planejamento.", "Déficit habitacional, favelização, trânsito, saneamento insuficiente, poluição, violência e trabalho informal — quaisquer quatro."],
]);

const geographyRegions = cards("geo-regions", [
  ["O que é região?", "Uma parte do território agrupada por características comuns definidas por determinados critérios."],
  ["O que é regionalização?", "Divisão de um território em regiões para facilitar análise, comparação, estatísticas, planejamento e políticas públicas."],
  ["Quantas grandes regiões há na regionalização oficial do IBGE?", "Cinco: Norte, Nordeste, Centro-Oeste, Sudeste e Sul."],
  ["A regionalização do IBGE respeita limites estaduais?", "Sim. Cada estado pertence inteiramente a uma das cinco grandes regiões."],
  ["Para que serve a regionalização do IBGE?", "Para produzir estatísticas, comparar áreas, planejar ações e orientar políticas públicas."],
  ["Quem propôs as Regiões Geoeconômicas?", "Pedro Pinchas Geiger."],
  ["Quais são as três Regiões Geoeconômicas?", "Amazônia, Nordeste e Centro-Sul."],
  ["Quais critérios orientam as Regiões Geoeconômicas?", "A formação histórica e as características socioeconômicas do território."],
  ["As Regiões Geoeconômicas precisam respeitar limites estaduais?", "Não. Um estado pode ter partes em complexos regionais diferentes."],
  ["Quem propôs os Quatro Brasis?", "Milton Santos e Maria Laura Silveira."],
  ["Quais são os Quatro Brasis?", "Amazônia, Nordeste, Centro-Oeste e Região Concentrada."],
  ["O que forma a Região Concentrada?", "As regiões Sudeste e Sul."],
  ["Quais critérios orientam os Quatro Brasis?", "Tecnologia, economia, infraestrutura e densidade do meio técnico-científico-informacional."],
  ["Por que diferentes regionalizações produzem mapas diferentes?", "Porque usam critérios, objetivos e escalas de análise diferentes para o mesmo território."],
  ["Como comparar duas regionalizações?", "Identifique autor, número e nome das regiões, critérios, respeito ou não aos limites estaduais e finalidade."],
]);

const geographyNortheast = cards("geo-northeast", [
  ["Quais são as quatro sub-regiões do Nordeste?", "Zona da Mata, Agreste, Sertão e Meio-Norte."],
  ["Zona da Mata: localização e características", "Faixa litorânea úmida, mais urbanizada, com Mata Atlântica, cana-de-açúcar, indústria, portos e turismo."],
  ["Agreste: por que é uma faixa de transição?", "Porque fica entre a úmida Zona da Mata e o semiárido Sertão, combinando características e atividades das duas áreas."],
  ["Sertão: clima e vegetação", "Clima semiárido, chuvas escassas e irregulares e predomínio da Caatinga."],
  ["Meio-Norte: localização e vegetação marcante", "Faixa de transição entre Sertão e Amazônia, sobretudo em Maranhão e Piauí, com destaque para a Mata dos Cocais."],
  ["O que é chuva orográfica?", "Chuva provocada quando o ar úmido sobe uma barreira de relevo, esfria e condensa."],
  ["Qual relevo influencia as chuvas entre litoral e Sertão?", "O Planalto da Borborema."],
  ["Como a Borborema contribui para a secura do Sertão?", "Favorece chuva no lado voltado ao oceano; depois da barreira, o ar chega mais seco ao interior."],
  ["Quais formas de relevo se destacam no Nordeste?", "Planaltos, planícies, depressões e chapadas, incluindo o Planalto da Borborema e a Depressão Sertaneja."],
  ["Como varia o clima nordestino?", "Predominam temperaturas elevadas; o litoral é mais úmido e o interior semiárido tem chuvas irregulares."],
  ["Quais vegetações aparecem no Nordeste?", "Caatinga, Mata Atlântica, Mata dos Cocais, Cerrado e vegetações litorâneas."],
  ["O que é um rio intermitente?", "Rio cujo fluxo diminui muito ou desaparece em parte do ano."],
  ["Por que o Rio São Francisco é tão importante?", "É perene e contribui para abastecimento, irrigação, geração de energia, transporte e integração regional."],
  ["A questão hídrica do Sertão é causada apenas pela falta de chuva?", "Não. Também envolve irregularidade das chuvas, evaporação, distribuição, infraestrutura, acesso e gestão da água."],
  ["Qual é o objetivo da transposição do São Francisco?", "Levar água por canais a áreas do semiárido para aumentar a segurança hídrica."],
  ["Benefícios e cuidados da transposição", "Pode ampliar abastecimento e produção, mas exige gestão, manutenção e avaliação de impactos sociais e ambientais."],
  ["Como a água influencia a economia nordestina?", "A disponibilidade hídrica condiciona agricultura, irrigação, pecuária, produção de energia e ocupação do território."],
  ["Quais domínios morfoclimáticos aparecem no Nordeste?", "Caatingas, Mares de Morros, Cerrado e áreas de transição."],
]);

const geographySoutheast = cards("geo-southeast", [
  ["Quais estados formam o Sudeste e quais são suas capitais?", "Minas Gerais—Belo Horizonte; São Paulo—São Paulo; Rio de Janeiro—Rio de Janeiro; Espírito Santo—Vitória."],
  ["Qual domínio morfoclimático é típico das áreas úmidas do Sudeste?", "O domínio dos Mares de Morros."],
  ["Como é o relevo dos Mares de Morros?", "Colinas arredondadas, vales encaixados e vertentes íngremes, formados por intenso intemperismo químico."],
  ["Qual era a cobertura vegetal original dos Mares de Morros?", "Principalmente Mata Atlântica."],
  ["Quais serras se destacam no Sudeste?", "Serra do Mar e Serra da Mantiqueira."],
  ["Quais tipos climáticos aparecem no Sudeste?", "Tropical, tropical de altitude, tropical litorâneo, subtropical e semiárido no norte de Minas Gerais."],
  ["Quais formações vegetais aparecem no Sudeste?", "Mata Atlântica, Cerrado e ecossistemas costeiros, além de áreas de transição."],
  ["Quais bacias hidrográficas se destacam no Sudeste?", "Paraná, São Francisco e bacias do Atlântico Sudeste, como Doce e Paraíba do Sul."],
  ["Por que muitos rios do Sudeste têm potencial hidrelétrico?", "Porque são rios de planalto, com desníveis e quedas d'água."],
  ["Onde nasce o Rio São Francisco?", "Na Serra da Canastra, em Minas Gerais."],
  ["Qual foi a importância histórica da mineração no Sudeste?", "Gerou riqueza, caminhos, infraestrutura e núcleos urbanos, sobretudo em Minas Gerais."],
  ["O que é o Quadrilátero Ferrífero?", "Importante área mineral de Minas Gerais, especialmente produtora de minério de ferro."],
  ["Quais impactos podem ser causados pela mineração?", "Desmatamento, alteração do relevo, poluição da água, rejeitos e riscos para comunidades."],
  ["Como o café contribuiu para a industrialização?", "Acumulou capital, ampliou ferrovias, cidades, mercado consumidor e disponibilidade de mão de obra."],
  ["Qual é a sequência econômica destacada no material?", "Mineração → cafeicultura → industrialização."],
  ["Por que enchentes urbanas não são apenas fenômenos naturais?", "Impermeabilização do solo, ocupação de várzeas, canalização, lixo e falta de drenagem aumentam seus impactos."],
  ["Por que ocorrem deslizamentos em áreas urbanas?", "Chuvas intensas se combinam com encostas íngremes, retirada da vegetação, ocupação precária e falta de infraestrutura."],
  ["O que é ilha de calor?", "Aumento da temperatura nas áreas urbanizadas devido a concreto, asfalto, pouca vegetação e calor gerado pelas atividades humanas."],
  ["Quais problemas ambientais marcam o Sudeste?", "Desmatamento, poluição, enchentes, deslizamentos, ilhas de calor, resíduos e crise hídrica."],
  ["Quais questões socioeconômicas marcam o Sudeste?", "Desigualdade, déficit habitacional, favelização, trabalho informal e segregação socioespacial."],
  ["Como formular uma resposta forte sobre risco socioambiental?", "Relacione ameaça natural, ocupação vulnerável, falta de infraestrutura, desigualdade e consequências para diferentes grupos sociais."],
]);

const historyIndigenous = cards("history-indigenous", [
  ["Por que devemos falar em povos indígenas, no plural?", "Porque existem centenas de povos com línguas, histórias, organizações, crenças e modos de vida próprios."],
  ["O que são Tupi, Macro-Jê e Aruaque?", "Famílias linguísticas que reúnem diferentes línguas e povos; não são um único povo."],
  ["Onde viviam muitos povos de línguas tupi no século XVI?", "Principalmente no litoral, embora ocupassem uma área muito extensa e diversa."],
  ["Como funcionava, em geral, a divisão de tarefas entre muitos povos tupi?", "Homens se dedicavam mais à caça, pesca, guerra e abertura das roças; mulheres cuidavam sobretudo do plantio, colheita, preparo de alimentos e utensílios."],
  ["O que era a Terra sem Mal?", "Uma crença tupi sobre um lugar de abundância, sem sofrimento e morte, com dimensão espiritual e influência sobre deslocamentos."],
  ["Por que Daniel Munduruku critica o termo “índio”?", "Porque ele generaliza e apaga as diferenças entre muitos povos. Prefira indígena ou o nome específico do povo."],
  ["O que é biopirataria?", "Apropriação e exploração de conhecimentos ou recursos biológicos sem autorização, reconhecimento ou repartição justa de benefícios."],
  ["Quem eram os Xokleng e Kaingang no material?", "Povos de línguas macro-jês do Sul do atual Brasil, com modos de vida e organizações próprios."],
  ["Por que os Xokleng foram chamados de botocudos?", "Por causa do botoque usado no lábio; era um nome dado pelos portugueses, não o nome do próprio povo."],
  ["Para que serviam as casas subterrâneas Kaingang?", "Ajudavam a proteger do frio, da chuva e do vento no Sul."],
  ["Como se organizavam os clãs Kaingang?", "Em dois clãs, Kamé e Kairu; o pertencimento orientava relações sociais e casamentos entre clãs diferentes."],
  ["Quem eram os Maiapures do Alto Xingu?", "Povos de língua aruaque que chegaram por volta de 800–900 d.C. e formaram aldeias fortificadas ligadas por estradas."],
  ["Como funcionavam as chefias entre povos arauaques do Alto Xingu?", "Tinham base familiar e hereditária, mas não eram rígidas; chefes podiam ser substituídos conforme seu desempenho."],
  ["Qual é a importância do Parque Indígena do Xingu?", "Protege território e favorece a continuidade de línguas, rituais e modos de vida de diferentes povos."],
  ["Cite influências indígenas na cultura brasileira.", "Mandioca, milho, conhecimentos de plantas, maracá, flauta, reco-reco, técnicas de pesca, alimentação e saberes ambientais."],
]);

const historyColonization = cards("history-colonization", [
  ["Por que Portugal passou da exploração do pau-brasil ao povoamento?", "A costa era difícil de defender e outros europeus, sobretudo franceses, também exploravam o território."],
  ["O que eram feitorias?", "Postos litorâneos usados para armazenar pau-brasil, apoiar o comércio e marcar presença portuguesa."],
  ["O que fez Martim Afonso de Sousa?", "Liderou a expedição de povoamento e fundou São Vicente, em 1532, estimulando engenhos e distribuição de terras."],
  ["O que eram capitanias hereditárias?", "Faixas de terra entregues a donatários com obrigações de povoar, defender, administrar e explorar."],
  ["O que eram sesmarias?", "Terras distribuídas para estimular ocupação e produção dentro das capitanias."],
  ["Por que várias capitanias fracassaram?", "Altos custos, distância, falta de recursos, abandono de donatários e resistência indígena, entre outros fatores."],
  ["Quais capitanias prosperaram mais no início?", "Pernambuco e São Vicente, especialmente ligadas à produção de açúcar."],
  ["O que foi o Governo-Geral?", "Sistema criado em 1548 para centralizar administração, defesa, justiça, impostos e apoio à colonização."],
  ["Quem foi o primeiro governador-geral e qual cidade fundou?", "Tomé de Sousa; fundou Salvador em 1549, primeira capital da colônia."],
  ["O que foram França Antártica e França Equinocial?", "Tentativas francesas de colonização na Guanabara, em 1555, e no Maranhão, em 1612."],
  ["Como os povos indígenas resistiram à colonização?", "Por fugas, guerras, ataques, alianças e confederações, como Tamoios e Cariris."],
  ["Qual era o objetivo central dos jesuítas na América?", "Catequizar e converter os povos indígenas ao catolicismo."],
  ["O que eram missões, aldeamentos ou reduções?", "Povoados organizados por jesuítas, com rotina de oração, trabalho e ensino sob controle missionário."],
  ["O que é aculturação?", "Mudanças culturais resultantes do contato entre grupos, muitas vezes sob relações desiguais de poder."],
  ["Qual foi a contradição das missões jesuíticas?", "Podiam proteger indígenas da escravização por colonos, mas impunham religião, rotina e valores europeus."],
  ["O que era o nheengatu?", "Língua geral derivada principalmente do tupi e usada na comunicação em partes da colônia."],
]);

const historyEnslavement = cards("history-enslavement", [
  ["Por que usar a expressão “pessoa escravizada”?", "Porque mostra que a escravidão foi uma condição imposta por violência, não uma característica natural da pessoa."],
  ["O que era o tráfico negreiro atlântico?", "Comércio forçado de africanos capturados e transportados em navios para serem vendidos e explorados nas Américas."],
  ["Como eram as condições nos navios negreiros?", "Superlotação, fome, pouca água, doenças, violência e alta mortalidade durante a travessia."],
  ["Quais efeitos o tráfico teve na África?", "Perda de milhões de pessoas, guerras, capturas e desorganização de sociedades e economias."],
  ["Quais efeitos o tráfico teve na América?", "Forneceu trabalho forçado para agricultura, mineração e cidades e aprofundou a violência e desigualdade racial."],
  ["Quais efeitos o tráfico teve na Europa?", "Gerou lucros para comerciantes, portos, Estados e grupos envolvidos no comércio colonial."],
  ["O que acontecia nos leilões após o desembarque?", "Pessoas eram avaliadas e vendidas; famílias e vínculos comunitários eram frequentemente rompidos."],
  ["Quais trabalhos eram feitos nos engenhos?", "Plantio, corte, transporte e moagem da cana, caldeiras, produção do açúcar, criação e serviços domésticos."],
  ["Como eram as senzalas?", "Alojamentos coletivos, geralmente abafados, precários, sem privacidade e vigiados para evitar fugas."],
  ["Como era o trabalho escravizado nas minas?", "Escavações, tanques, represas e garimpo nos rios, em condições perigosas, frias e exaustivas."],
  ["O que eram escravizados de ganho?", "Pessoas que trabalhavam nas ruas e entregavam parte do que recebiam ao senhor, podendo guardar uma parcela."],
  ["Maior mobilidade urbana significava liberdade?", "Não. Persistiam controle, exploração, punições, jornadas pesadas e violência."],
  ["Quais formas de resistência aparecem no capítulo?", "Fugas, revoltas, sabotagem, preservação cultural e religiosa, redes comunitárias, negociação e busca de alforria."],
  ["Como surgiu a capoeira no contexto da escravidão?", "Como prática afro-brasileira que reunia luta, defesa, música, dança, convivência e resistência cultural."],
  ["Qual diferença básica entre candomblé e umbanda?", "O candomblé tem raízes africanas e culto aos orixás; a umbanda surgiu no Brasil e combina diferentes matrizes religiosas."],
  ["O que a taipa mostra sobre heranças africanas?", "Técnicas construtivas africanas foram adaptadas e difundidas no Brasil, formando parte do patrimônio cultural."],
]);

const historySugar = cards("history-sugar", [
  ["Quais são os quatro elementos do plantation?", "Latifúndio, monocultura, trabalho escravizado e produção voltada para exportação."],
  ["O que o termo engenho podia significar?", "A moenda onde a cana era esmagada e, depois, todo o conjunto da fazenda açucareira."],
  ["O que a casa-grande simbolizava?", "O poder do senhor de engenho e uma sociedade patriarcal, hierarquizada e baseada na exploração."],
  ["Quais instalações compunham um engenho?", "Canaviais, moenda, casa das caldeiras, casa de purgar, casa-grande, senzala, capela, oficinas e áreas de criação."],
  ["Qual é a primeira etapa da fabricação do açúcar?", "Plantio, crescimento e corte da cana, geralmente durante a estiagem."],
  ["O que acontecia na moagem?", "Moendas movidas por animais ou água esmagavam a cana para extrair o caldo."],
  ["O que acontecia nas caldeiras?", "O caldo era fervido, limpo e concentrado até formar melaço, sob temperaturas muito elevadas."],
  ["O que era purgar o açúcar?", "Deixar o melaço em formas cônicas para escorrer impurezas e separar tipos de açúcar."],
  ["Como o açúcar chegava ao mercado externo?", "Era moldado ou colocado em caixas, transportado em carros de boi até os portos e embarcado para a Europa."],
  ["Quais trabalhadores especializados havia no engenho?", "Mestres de açúcar, ferreiros, carpinteiros, tanoeiros, pedreiros e outros técnicos."],
  ["Como eram as jornadas nas caldeiras?", "Podiam chegar a 18 ou 20 horas na época de moagem, com calor extremo, exaustão e muitos acidentes."],
  ["Como a pecuária se relacionava ao açúcar?", "O gado movia moendas, transportava cargas e fornecia carne, couro e sebo."],
  ["Por que a pecuária ajudou a ocupar o interior?", "Precisava de grandes áreas e foi afastada do litoral açucareiro, formando rotas, fazendas e povoações interiores."],
  ["O que era a quarta recebida por vaqueiros?", "Parte do rebanho entregue após alguns anos de trabalho, permitindo a alguns formar criação própria."],
  ["O que motivou a Revolta de Beckman?", "Insatisfação no Maranhão com monopólio, preços, abastecimento e fornecimento insuficiente de pessoas escravizadas pela Companhia de Comércio."],
  ["Qual foi o desfecho da Revolta de Beckman?", "A Coroa reprimiu o movimento, puniu e executou líderes e extinguiu a Companhia, mantendo o controle colonial."],
]);

const portuguesePredicates = cards("portuguese-predicates", [
  ["O que é predicado?", "Tudo o que se declara a respeito do sujeito; inclui o verbo e os demais termos ligados a ele."],
  ["Como separar sujeito e predicado?", "Localize o verbo, pergunte quem/o que se relaciona a ele para achar o sujeito; o restante da oração forma o predicado."],
  ["O que é verbo significativo ou nocional?", "Verbo que expressa ação, acontecimento, fenômeno, desejo ou atividade mental e funciona como núcleo."],
  ["O que é verbo de ligação?", "Verbo que conecta o sujeito a um estado, qualidade ou identificação; não é o núcleo do predicado nominal."],
  ["Cite verbos de ligação frequentes.", "Ser, estar, parecer, permanecer, continuar, ficar e tornar-se — sempre confirmando o sentido no contexto."],
  ["Predicado verbal", "Tem como núcleo um verbo significativo. Ex.: Os estudantes resolveram o desafio."],
  ["Predicado nominal", "Tem como núcleo um nome/predicativo do sujeito, ligado por verbo de ligação. Ex.: A turma estava animada."],
  ["Predicado verbo-nominal", "Tem dois núcleos: um verbo significativo e um nome. Ex.: A turma saiu animada."],
  ["O que é predicativo do sujeito?", "Termo que atribui estado, qualidade ou identificação ao sujeito."],
  ["“Ela ficou cansada” × “Ela ficou em casa”", "Na primeira, ficou é de ligação e cansada é predicativo; na segunda, ficou indica permanência/localização."],
  ["“Os atletas chegaram exaustos”: núcleos", "Chegaram = núcleo verbal; exaustos = núcleo nominal/predicativo do sujeito. Predicado verbo-nominal."],
  ["Pergunta-chave para classificar o predicado", "A informação principal é ação, característica ou as duas? Ação=verbal; característica=nominal; ambas=verbo-nominal."],
]);

const portugueseTransitivity = cards("portuguese-transitivity", [
  ["Verbo intransitivo (VI)", "Tem sentido completo e não exige complemento. Ex.: O bebê nasceu."],
  ["Verbo transitivo direto (VTD)", "Exige complemento sem preposição obrigatória: objeto direto. Ex.: Li o manual."],
  ["Verbo transitivo indireto (VTI)", "Exige complemento com preposição: objeto indireto. Ex.: Preciso de ajuda."],
  ["Verbo transitivo direto e indireto (VTDI)", "Exige dois complementos, OD e OI. Ex.: Entreguei a prova à professora."],
  ["Objeto direto", "Completa VTD sem preposição obrigatória; costuma responder o quê? ou quem?"],
  ["Objeto indireto", "Completa VTI com preposição exigida; pode responder de quê?, em quê?, a quem? etc."],
  ["“Ela enviou uma mensagem ao amigo”", "Enviou = VTDI; uma mensagem = OD; ao amigo = OI."],
  ["O que é predicativo do objeto?", "Termo que atribui estado, qualidade ou identificação ao objeto."],
  ["“Consideraram Pedro inteligente”", "Pedro = objeto direto; inteligente = predicativo do objeto."],
  ["Predicativo do sujeito × do objeto", "Descubra a quem a característica se refere: ao sujeito ou ao complemento verbal."],
  ["A transitividade de um verbo é sempre a mesma?", "Não. Depende do sentido e da construção: Sonhei com você (VTI) / Faz anos que não sonho (VI)."],
  ["Circunstância é sempre complemento?", "Não. Em “O bebê chorou durante a noite”, o verbo já é completo; a expressão só indica tempo."],
]);

const portuguesePronouns = cards("portuguese-pronouns", [
  ["Quais pronomes átonos aparecem na colocação pronominal?", "me, te, se, o, a, lhe, nos, vos, os, as, lhes."],
  ["Próclise", "Pronome antes do verbo. Ex.: Não me avisaram."],
  ["Ênclise", "Pronome depois do verbo, unido por hífen. Ex.: Avisaram-me."],
  ["Mesóclise", "Pronome no meio do verbo no futuro, sem palavra atrativa. Ex.: Entregar-lhe-ei."],
  ["Principais palavras atrativas", "Negativas, advérbios sem vírgula, pronomes relativos/indefinidos/demonstrativos, interrogativos, exclamativos e conjunções subordinativas."],
  ["Por que “Não me avisaram” está correto?", "A palavra negativa não atrai o pronome e exige próclise."],
  ["Quando a ênclise é obrigatória?", "Quando o verbo inicia a oração ou vem após pausa, sem palavra atrativa: Entregaram-me os documentos."],
  ["Quando usar mesóclise?", "No futuro do presente ou do pretérito, sem atrator: contar-te-ei; contar-te-ia. É muito formal."],
  ["Função de o, a, os, as", "Substituem somente objeto direto."],
  ["Função de lhe, lhes", "Substituem somente objeto indireto."],
  ["Função de me, te, nos, vos, se", "Podem funcionar como objeto direto ou indireto, conforme o verbo e o contexto."],
  ["“Hoje me contaram” × “Hoje, contaram-me”", "Sem vírgula, o advérbio atrai; isolado por vírgula, deixa de atrair o pronome."],
  ["Fala × norma-padrão no início da oração", "“Me avise” é comum na fala brasileira; a norma-padrão escrita prefere “Avise-me”."],
  ["Acento em formas com pronome", "A forma verbal pode receber acento para preservar a pronúncia: entregá-la, vê-lo, construí-lo."],
]);

const portugueseReading = cards("portuguese-reading", [
  ["Informação explícita", "Está declarada no texto e pode ser localizada diretamente."],
  ["Informação implícita", "Não está escrita literalmente; é inferida a partir de pistas e relações do texto."],
  ["O que é inferir?", "Chegar a uma conclusão usando pistas textuais e raciocínio coerente, sem inventar."],
  ["Como começar a leitura de uma questão?", "Identifique o verbo de comando e determine exatamente qual operação ele pede."],
  ["O que significa identificar/localizar?", "Encontrar e apontar a informação pedida."],
  ["O que significa explicar?", "Apresentar como ou por que algo ocorre, deixando clara a relação entre ideias."],
  ["O que significa analisar/relacionar?", "Examinar partes, efeitos e conexões entre elementos do texto."],
  ["O que significa justificar?", "Sustentar uma resposta com trecho, pista, dado ou raciocínio baseado no texto."],
  ["O que significa comparar?", "Apresentar semelhanças e diferenças segundo um critério."],
  ["O que observar em texto multimodal?", "Título, fonte, imagens, cores, símbolos, balões, gestos, tipografia e a relação entre linguagem verbal e visual."],
  ["Fórmula de resposta forte", "Resposta direta + trecho ou pista + explicação de como a evidência sustenta a conclusão."],
  ["Quatro armadilhas de interpretação", "Copiar sem explicar, opinar sem evidência, ignorar o comando e responder apenas sim/não."],
  ["Checklist antes de entregar", "Reler questão e resposta; conferir o comando; verificar evidência, clareza e completude."],
]);

const portugueseNominal = cards("portuguese-nominal", [
  ["O que é complemento nominal?", "Termo preposicionado que completa o sentido de um nome, adjetivo ou advérbio."],
  ["O que é adjunto adnominal?", "Termo que determina, caracteriza ou especifica um substantivo."],
  ["Quais classes podem ser adjunto adnominal?", "Artigo, adjetivo, pronome adjetivo, numeral e locução adjetiva."],
  ["A preposição basta para identificar complemento nominal?", "Não. Complemento nominal e adjunto adnominal podem ter preposição; é preciso analisar a relação de sentido."],
  ["Que relação o complemento nominal costuma indicar?", "Alvo ou paciente da ideia expressa pelo nome."],
  ["Que relações o adjunto adnominal costuma indicar?", "Agente, posse, origem, matéria, finalidade ou característica."],
  ["“Respeito aos professores”", "“Aos professores” é complemento nominal: indica o alvo do respeito."],
  ["“Amor de mãe”", "“De mãe” é adjunto adnominal: indica quem sente ou origina o amor."],
  ["“Amor à mãe”", "“À mãe” é complemento nominal: indica o alvo do sentimento."],
  ["“Ela estava favorável à mudança”", "“À mudança” é complemento nominal do adjetivo “favorável”."],
  ["“Os dois alunos atentos”", "Os, dois e atentos são adjuntos adnominais de alunos."],
  ["Roteiro de classificação", "Ache o núcleo; localize o termo ligado; pergunte se completa ou caracteriza; analise agente/alvo; justifique."],
]);

export const flashcardSources: FlashcardSource[] = [
  { id: "english-vocabulary", subject: "English", title: "Harnessing the Storm · Vocabulary", description: "20 context-based terms from the passage.", cards: englishVocabulary },
  { id: "english-ideas", subject: "English", title: "Main ideas, evidence & sequence", description: "Themes, evidence and the cause-to-impact chain.", cards: englishIdeas },
  { id: "english-language", subject: "English", title: "Figurative language", description: "Weather metaphors, symbolism and meaning in context.", cards: englishLanguage },
  { id: "math-rationals", subject: "Matemática", title: "Racionais e números negativos", description: "Frações, sinais, módulo, oposto e equivalências.", cards: mathRationals },
  { id: "math-parentheses", subject: "Matemática", title: "Linguagem e expressões algébricas", description: "Tradução, coeficiente, parte literal e termos semelhantes.", cards: mathParentheses },
  { id: "math-equations", subject: "Matemática", title: "Equações do 1º grau", description: "Princípios da igualdade, distributiva, frações e conferência.", cards: mathEquations },
  { id: "math-chapter9", subject: "Matemática", title: "Capítulo 9 · Equações e sistemas", description: "Sentenças, historinhas, duas incógnitas e substituição.", cards: mathChapter9 },
  { id: "science-living", subject: "Ciências", title: "Ecosystems & living things", description: "Biotic/abiotic factors, life processes and levels of organization.", cards: scienceLiving },
  { id: "science-taxonomy", subject: "Ciências", title: "Taxonomy, keys & fossils", description: "Classification ranks, scientific names, evolution and fossil evidence.", cards: scienceTaxonomy },
  { id: "science-microorganisms", subject: "Ciências", title: "Microorganisms & human health", description: "Monera, Protist, Fungi, ecological roles, disease and resistance.", cards: scienceMicroorganisms },
  { id: "science-plants", subject: "Ciências", title: "Plant Kingdom", description: "Plant cells, vascular system, groups, organs and reproduction.", cards: sciencePlants },
  { id: "geo-industry", subject: "Geografia", title: "Industrialização e urbanização", description: "Crise de 1929, Era Vargas, êxodo rural, metrópoles e problemas urbanos.", cards: geographyIndustry },
  { id: "geo-regions", subject: "Geografia", title: "Regionalizações do Brasil", description: "IBGE, Regiões Geoeconômicas e os Quatro Brasis.", cards: geographyRegions },
  { id: "geo-northeast", subject: "Geografia", title: "Nordeste", description: "Sub-regiões, aspectos físicos, chuva orográfica, água e economia.", cards: geographyNortheast },
  { id: "geo-southeast", subject: "Geografia", title: "Sudeste", description: "Paisagens, ciclos econômicos, urbanização e questões socioambientais.", cards: geographySoutheast },
  { id: "history-indigenous", subject: "História", title: "Cap. 9 · Povos indígenas do Brasil", description: "Diversidade, famílias linguísticas, organizações, Xingu e permanências.", cards: historyIndigenous },
  { id: "history-colonization", subject: "História", title: "Cap. 10 · Início da colonização", description: "Pau-brasil, capitanias, Governo-Geral, resistência e jesuítas.", cards: historyColonization },
  { id: "history-enslavement", subject: "História", title: "Cap. 11 · Escravização africana", description: "Tráfico, trabalho rural, minas, cidades, resistência e heranças.", cards: historyEnslavement },
  { id: "history-sugar", subject: "História", title: "Cap. 12 · Economia açucareira", description: "Plantation, engenho, pecuária, interiorização e Beckman.", cards: historySugar },
  { id: "portuguese-predicates", subject: "Português", title: "Predicados e predicativo do sujeito", description: "Predicados verbal, nominal e verbo-nominal; núcleos e verbos de ligação.", cards: portuguesePredicates },
  { id: "portuguese-transitivity", subject: "Português", title: "Transitividade e predicativo do objeto", description: "VI, VTD, VTI, VTDI, objetos direto e indireto e predicativos.", cards: portugueseTransitivity },
  { id: "portuguese-pronouns", subject: "Português", title: "Colocação pronominal", description: "Próclise, ênclise, mesóclise, palavras atrativas e funções dos pronomes.", cards: portuguesePronouns },
  { id: "portuguese-nominal", subject: "Português", title: "Complemento nominal × adjunto adnominal", description: "Núcleo, preposição, agente, alvo e relação de sentido.", cards: portugueseNominal },
  { id: "portuguese-reading", subject: "Português", title: "Interpretação e verbos de comando", description: "Explícito, implícito, inferência, multimodalidade e respostas justificadas.", cards: portugueseReading },
];
