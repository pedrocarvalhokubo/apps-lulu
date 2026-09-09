"use client";

import { useState } from "react";

type ScienceModule = "living" | "taxonomy" | "micro" | "plants";

type Props = {
  onBack: () => void;
  onGenerateFlashcards: (sourceId: string) => void;
};

const modules: Array<{ id: ScienceModule; number: string; title: string; subtitle: string; icon: string }> = [
  { id: "living", number: "01", title: "Ecosystems & living things", subtitle: "Biotic, abiotic and levels of organization", icon: "◉" },
  { id: "taxonomy", number: "02", title: "Taxonomy & fossils", subtitle: "Classification, scientific names and evolution", icon: "⌘" },
  { id: "micro", number: "03", title: "Microorganisms", subtitle: "Monera, Protist, Fungi and human health", icon: "✣" },
  { id: "plants", number: "04", title: "Plant Kingdom", subtitle: "Cells, vascular system, groups and reproduction", icon: "⌁" },
];

const livingCharacteristics = [
  ["Cells", "All living things are made of one or more cells."],
  ["Respiration", "They release energy from nutrients."],
  ["Energy", "They need and use energy to stay alive."],
  ["Sensitivity", "They respond to stimuli in the environment."],
  ["Growth", "They grow and develop during their life cycle."],
  ["Reproduction", "They can produce new organisms."],
  ["Excretion", "They remove metabolic waste."],
] as const;

const taxonomyRanks = ["Domain", "Kingdom", "Phylum", "Class", "Order", "Family", "Genus", "Species"];

const fossilTimeline = [
  ["Fish", "~500 mya", "Cambrian / Ordovician"],
  ["Amphibians", "~370 mya", "Devonian"],
  ["Reptiles", "~320 mya", "Carboniferous"],
  ["Mammals", "~200 mya", "Triassic"],
  ["Birds", "~150 mya", "Jurassic"],
] as const;

const microorganismGroups = [
  { name: "Monera", badge: "BACTERIA", cell: "Prokaryotic", number: "Unicellular", nutrition: "Autotroph or heterotroph", color: "mint" },
  { name: "Protist · Protozoa", badge: "PROTOZOA", cell: "Eukaryotic", number: "Unicellular", nutrition: "Heterotroph", color: "blue" },
  { name: "Protist · Algae", badge: "ALGAE", cell: "Eukaryotic", number: "Uni- or multicellular", nutrition: "Autotroph", color: "gold" },
  { name: "Fungi", badge: "FUNGI", cell: "Eukaryotic", number: "Uni- or multicellular", nutrition: "Heterotroph by absorption", color: "coral" },
] as const;

const protozoanDiseases = [
  ["Malaria", "Plasmodium", "Bite of an infected mosquito"],
  ["Chagas disease", "Trypanosoma cruzi", "Kissing bug vector"],
  ["Amoebiasis", "Entamoeba histolytica", "Contaminated food or water"],
  ["Giardiasis", "Giardia lamblia", "Contaminated food or water"],
] as const;

const plantGroups = [
  ["Bryophytes", "No", "No", "No", "No", "Need water", "Moss"],
  ["Pteridophytes", "Yes", "No", "No", "No", "Need water", "Fern"],
  ["Gymnosperms", "Yes", "Yes", "No", "No", "Pollen", "Pine / araucaria"],
  ["Angiosperms", "Yes", "Yes", "Yes", "Yes", "Pollen", "Orchid / sunflower"],
] as const;

export default function ScienceReview({ onBack, onGenerateFlashcards }: Props) {
  const [activeModule, setActiveModule] = useState<ScienceModule>("living");
  const activeIndex = modules.findIndex((item) => item.id === activeModule);

  const chooseModule = (module: ScienceModule) => {
    setActiveModule(module);
    window.requestAnimationFrame(() => document.querySelector(".science-module-panel")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const goNext = () => {
    const next = modules[(activeIndex + 1) % modules.length];
    chooseModule(next.id);
  };

  return (
    <div className="page science-page">
      <button className="back-button" onClick={onBack}>← Voltar para trimestres</button>

      <section className="science-hero science-assessment-hero">
        <div>
          <span className="eyebrow light">SCIENCE · END-OF-TERM ASSESSMENT</span>
          <h1>Life, microbes<br />& plants</h1>
          <p>Revisão refeita a partir do material de estudo: ecossistemas, taxonomia, fósseis, microrganismos, saúde e Reino Plantae.</p>
          <div className="science-source-badge"><span>✓</span><b>Aligned with the 71-slide assessment resource</b></div>
        </div>
        <div className="science-hero-orbit science-hero-cells" aria-hidden="true"><span>cell</span><i /><b>life</b><em>DNA</em></div>
      </section>

      <section className="science-assessment-map">
        <div className="section-heading">
          <div><span className="eyebrow teal">MAPA DA AVALIAÇÃO</span><h2>Quatro blocos para dominar</h2></div>
          <p>Escolha um bloco. Os termos cobrados aparecem em inglês, com explicações diretas.</p>
        </div>
        <nav className="science-module-nav" aria-label="Blocos de revisão de Ciências">
          {modules.map((item) => (
            <button className={activeModule === item.id ? `active module-${item.id}` : `module-${item.id}`} key={item.id} onClick={() => chooseModule(item.id)}>
              <span className="science-module-icon">{item.icon}</span>
              <small>{item.number}</small><strong>{item.title}</strong><em>{item.subtitle}</em><b>{activeModule === item.id ? "ESTUDANDO AGORA" : "ABRIR BLOCO"} →</b>
            </button>
          ))}
        </nav>
      </section>

      <section className={`science-module-panel science-panel-${activeModule}`}>
        {activeModule === "living" && (
          <>
            <header className="science-module-header"><div><span>01 · ECOSYSTEMS</span><h2>Living things & their environment</h2><p>Identify the characteristics of living things and distinguish biotic from abiotic factors.</p></div><button onClick={() => onGenerateFlashcards("science-living")}>✦ Flashcards deste bloco</button></header>

            <div className="biotic-comparison">
              <article><span aria-hidden="true">♧</span><small>BIOTIC FACTORS</small><h3>Living or once-living</h3><p>Plants, animals, bacteria, fungi and organic remains. They interact in habitats.</p><b>Examples: grass · ant · tree · bacteria</b></article>
              <div className="biotic-link" aria-hidden="true"><i /><span>INTERACT</span><i /></div>
              <article><span aria-hidden="true">◇</span><small>ABIOTIC FACTORS</small><h3>Nonliving conditions</h3><p>Water, rocks, sunlight, air, soil, temperature, minerals and pH shape ecosystems.</p><b>Examples: sunlight · water · rocks · clouds</b></article>
            </div>

            <div className="science-subsection-heading"><span className="eyebrow coral">WHAT MAKES IT ALIVE?</span><h3>Seven clues scientists look for</h3></div>
            <div className="living-clue-grid">{livingCharacteristics.map(([title, text], index) => <article key={title}><span>{index + 1}</span><div><h4>{title}</h4><p>{text}</p></div></article>)}</div>

            <div className="organization-card">
              <div><span className="eyebrow light">LEVELS OF ORGANIZATION</span><h3>Small structures build larger systems</h3><p>This sequence works for animals and plants.</p></div>
              <div className="organization-ladder">{["Cell", "Tissue", "Organ", "Organ system", "Organism"].map((level, index) => <span key={level}><i>{index + 1}</i><b>{level}</b>{index < 4 && <em>→</em>}</span>)}</div>
            </div>

            <aside className="indigenous-knowledge-note"><span aria-hidden="true">◎</span><div><small>ANOTHER WAY OF KNOWING</small><h3>Relationship, respect and spirituality</h3><p>The study material presents an example in which some Indigenous communities understand everything in nature as related and sacred. A rock passed in a talking circle can connect the group and give strength to the speaker. Traditions differ among peoples, so this is one example rather than a rule for every Indigenous culture.</p></div></aside>
          </>
        )}

        {activeModule === "taxonomy" && (
          <>
            <header className="science-module-header"><div><span>02 · CLASSIFICATION</span><h2>Taxonomy, keys & fossils</h2><p>Classify organisms using shared characteristics and evolutionary relationships.</p></div><button onClick={() => onGenerateFlashcards("science-taxonomy")}>✦ Flashcards deste bloco</button></header>

            <div className="taxonomy-definition"><span>taxonomy</span><div><h3>The science of naming and grouping life</h3><p>Taxonomy classifies, identifies and names organisms by shared characteristics and evolutionary relationships — evidence of a common ancestor.</p></div></div>

            <div className="science-history-line">
              <article><small>~2,300 YEARS AGO</small><strong>Aristotle</strong><p>One of the earliest classification systems; grouped animals by where they lived and plants by form.</p></article>
              <article><small>18TH CENTURY</small><strong>Carl Linnaeus</strong><p>Standardized classification using physical characteristics and scientific names.</p></article>
              <article><small>19TH CENTURY</small><strong>Charles Darwin</strong><p>Evolution linked classification to common ancestry and relationships over time.</p></article>
              <article><small>TODAY</small><strong>Modern taxonomy</strong><p>Uses visible traits plus evidence such as cells, fossils and DNA.</p></article>
            </div>

            <div className="taxonomy-workbench">
              <article className="taxonomy-ranks"><span className="eyebrow teal">BROAD → SPECIFIC</span><h3>Eight taxonomic levels</h3><div>{taxonomyRanks.map((rank, index) => <p key={rank} style={{ width: `${100 - index * 7}%` }}><b>{rank[0]}</b><span>{rank}</span></p>)}</div><small>Memory route: D → K → P → C → O → F → G → S</small></article>
              <article className="binomial-card"><span className="eyebrow coral">BINOMIAL NOMENCLATURE</span><h3>Two words, one species</h3><p className="scientific-name"><i>Panthera</i> <em>tigris</em></p><ol><li><b>Genus</b> comes first and starts with a capital letter.</li><li><b>Species</b> comes second and uses lowercase.</li><li>Both words are Latinized and written in <i>italics</i>.</li></ol></article>
              <article className="taxonomic-key-card"><span className="eyebrow gold">TAXONOMIC KEY</span><h3>Choose between two clues</h3><div><p><b>1a</b> Has legs → go to step 2</p><p><b>1b</b> Has no legs → go to step 5</p><p><b>2a</b> One oval body region → go to step 3</p><p><b>2b</b> Two body regions → go to step 4</p></div><small>At each step, observe the organism and select the statement that matches.</small></article>
            </div>

            <div className="fossil-section"><header><div><span className="eyebrow light">FOSSIL EVIDENCE</span><h3>Life changes through geological time</h3></div><p>Fossils preserve evidence of organisms from the past and help scientists reconstruct evolutionary relationships.</p></header><div className="fossil-timeline">{fossilTimeline.map(([group, age, period]) => <article key={group}><span>{age}</span><i /><strong>{group}</strong><small>{period}</small></article>)}</div></div>
          </>
        )}

        {activeModule === "micro" && (
          <>
            <header className="science-module-header"><div><span>03 · MICROORGANISMS</span><h2>Monera, Protist & Fungi</h2><p>Compare their cells and nutrition, then connect each group to ecosystems and human health.</p></div><button onClick={() => onGenerateFlashcards("science-microorganisms")}>✦ Flashcards deste bloco</button></header>

            <div className="micro-compare-grid">{microorganismGroups.map((group) => <article className={`micro-${group.color}`} key={group.name}><span>{group.badge}</span><h3>{group.name}</h3><p><small>CELL</small><b>{group.cell}</b></p><p><small>BODY</small><b>{group.number}</b></p><p><small>NUTRITION</small><b>{group.nutrition}</b></p></article>)}</div>

            <div className="micro-role-grid">
              <article><span className="role-icon fungi-icon">◌</span><small>FUNGI</small><h3>Decomposers & makers</h3><p>Fungi digest externally and absorb nutrients. They recycle organic matter, help make bread, cheese, beer and wine, and can protect crops through biocontrol.</p></article>
              <article><span className="role-icon algae-icon">≋</span><small>ALGAE</small><h3>Aquatic producers</h3><p>Algae photosynthesize, release oxygen, feed aquatic food chains, absorb CO₂ and may be used in fertilizers, medicines and biofuels.</p></article>
              <article><span className="role-icon proto-icon">✧</span><small>PROTOZOA</small><h3>Consumers & predators</h3><p>Protozoa help control bacterial populations and recycle matter. Some are parasites that cause disease.</p></article>
              <article><span className="role-icon bacteria-icon">⋯</span><small>BACTERIA</small><h3>Everywhere — and essential</h3><p>Bacteria decompose, recycle nutrients, fix nitrogen, support digestion, ferment food and can help clean pollutants.</p></article>
            </div>

            <div className="lichen-card"><span>ALGAE</span><b>＋</b><span>FUNGI</span><b>→</b><strong>LICHEN</strong><p><b>Mutualism:</b> both partners benefit. The photosynthetic partner supplies sugars; the fungus offers protection, water and minerals.</p></div>

            <div className="micro-health-layout">
              <article className="proto-disease-card"><span className="eyebrow coral">PROTOZOAN DISEASES</span><h3>Agent and transmission</h3>{protozoanDiseases.map(([disease, agent, route]) => <p key={disease}><strong>{disease}</strong><i>{agent}</i><span>{route}</span></p>)}</article>
              <article className="bacteria-health-card"><span className="eyebrow teal">BACTERIA + HUMANS</span><h3>Helpful and harmful interactions</h3><ul><li><b>Gut microbiota:</b> helps digest complex carbohydrates and supports metabolism.</li><li><b>Yogurt:</b> bacteria turn lactose into lactic acid, lowering pH and thickening milk.</li><li><b>Oral health:</b> bacteria consume sugars and produce acids that damage enamel, causing cavities.</li><li><b>Soil:</b> decomposes matter, recycles nutrients and can fix nitrogen.</li><li><b>Bioremediation:</b> microorganisms help remove pollutants.</li></ul></article>
            </div>

            <div className="bacteria-process-grid">
              <article><span>1 → 2 → 4</span><h3>Binary fission</h3><p>One bacterial cell copies its DNA and divides into two cells. Under ideal conditions, some populations can grow very quickly.</p></article>
              <article><span>DNA ⇄ DNA</span><h3>Conjugation</h3><p>Two bacteria exchange genetic material. It increases variation, but it is not the same as producing new cells.</p></article>
              <article><span>💊 → ✓ ✓</span><h3>Antibiotic resistance</h3><p>An antibiotic kills susceptible bacteria; resistant ones survive and reproduce. Resistance genes may also spread between bacteria.</p></article>
            </div>

            <aside className="virus-note"><span aria-hidden="true">!</span><div><small>VIRUSES</small><h3>Outside the five kingdoms in this material</h3><p>Viruses are acellular: they are not made of cells and cannot reproduce or carry out metabolism independently. They use a host cell to make new viruses. Antibiotics do not treat viral infections.</p></div></aside>
          </>
        )}

        {activeModule === "plants" && (
          <>
            <header className="science-module-header"><div><span>04 · PLANT KINGDOM</span><h2>Cells, groups & reproduction</h2><p>Analyze plant characteristics and how structures help plants survive and reproduce.</p></div><button onClick={() => onGenerateFlashcards("science-plants")}>✦ Flashcards deste bloco</button></header>

            <div className="plant-big-three"><article><span>1</span><h3>Eukaryotic</h3><p>Their cells have a nucleus that protects DNA.</p></article><article><span>2</span><h3>Multicellular</h3><p>Plants are formed by many specialized cells.</p></article><article><span>3</span><h3>Autotrophic</h3><p>Most plants make sugars by photosynthesis and begin food chains.</p></article></div>

            <div className="plant-cell-lab">
              <div className="plant-cell-visual" aria-label="Diagrama simplificado de uma célula vegetal"><span className="cell-wall-label">Cell wall</span><span className="chloroplast-label">Chloroplasts</span><span className="vacuole-label">Large vacuole</span><span className="nucleus-label">Nucleus</span><i className="plant-nucleus" /><i className="plant-vacuole" /><b className="plant-chloroplast one" /><b className="plant-chloroplast two" /><b className="plant-chloroplast three" /></div>
              <div><span className="eyebrow light">VEGETAL CELL</span><h3>Three structures to recognize</h3><p><b>Cell wall:</b> rigid support, shape and protection.</p><p><b>Chloroplasts:</b> contain chlorophyll and perform photosynthesis.</p><p><b>Large central vacuole:</b> stores water, nutrients and waste and helps keep the cell firm.</p><aside><strong>Plant × animal cell</strong><span>Animal cells do not have a cell wall or chloroplasts and usually have smaller vacuoles. Plant cells are often more rectangular.</span></aside></div>
            </div>

            <div className="vascular-card"><div><span className="eyebrow teal">PLANT VASCULAR SYSTEM</span><h3>Two transport routes</h3><p>Conductive vessels connect roots, stems and leaves.</p></div><article className="xylem"><span>↑</span><div><strong>XYLEM</strong><p>Moves water and mineral salts mainly from roots upward.</p></div></article><article className="phloem"><span>↕</span><div><strong>PHLOEM</strong><p>Transports sugars made in the leaves to the rest of the plant.</p></div></article></div>

            <div className="plant-table-wrap"><span className="eyebrow coral">TREE CLASSIFICATION OF PLANTS</span><h3>Use vessels, seeds, flowers and fruits</h3><div className="plant-comparison-table" role="table" aria-label="Comparação dos principais grupos de plantas"><header role="row"><b role="columnheader">Group</b><b role="columnheader">Vessels</b><b role="columnheader">Seeds</b><b role="columnheader">Flowers</b><b role="columnheader">Fruits</b><b role="columnheader">Reproduction</b><b role="columnheader">Example</b></header>{plantGroups.map((row) => <p role="row" key={row[0]}>{row.map((value, index) => <span role="cell" key={`${row[0]}-${index}`} className={value === "Yes" ? "yes" : value === "No" ? "no" : ""}>{value}</span>)}</p>)}</div><small>Bryophytes are non-vascular. The other three groups have conductive vessels. Seeds first appear in gymnosperms.</small></div>

            <div className="plant-organs-grid"><article><span>ROOTS</span><h3>Fixation + absorption</h3><p>Anchor the plant and absorb water and mineral salts.</p></article><article><span>STEM</span><h3>Support + transport</h3><p>Supports branches, leaves, flowers and fruits and conducts sap.</p></article><article><span>LEAVES</span><h3>Photosynthesis + gas exchange</h3><p>Contain chloroplasts and exchange gases with the atmosphere.</p></article></div>

            <div className="plant-reproduction-route"><header><span className="eyebrow light">ANGIOSPERM LIFE CYCLE</span><h3>From flower to a new plant</h3></header><div>{[["Flower","Produces gametes and attracts pollinators"],["Pollination","Pollen reaches the female structure"],["Fertilization","Male and female gametes meet"],["Seed","Embryo + nutrient reserve"],["Fruit","Protects the seed and helps dispersal"],["Germination","The embryo begins a new plant"]].map(([title,text],index) => <article key={title}><span>{index + 1}</span><strong>{title}</strong><p>{text}</p>{index < 5 && <b>→</b>}</article>)}</div></div>

            <aside className="plant-role-note"><span aria-hidden="true">♧</span><div><small>CONNECT STRUCTURE TO SURVIVAL</small><h3>Every feature has a function</h3><p>Mosses can indicate clean environments and help prevent erosion. Ferns contribute to soil and habitats. Gymnosperms and angiosperms provide food and shelter, capture carbon and produce oxygen. Flowers attract pollinators; fruits attract dispersers.</p></div></aside>
          </>
        )}

        <footer className="science-module-footer"><div><small>MÉTODO DE REVISÃO</small><strong>Veja → cubra → explique em voz alta → confira</strong></div><button onClick={goNext}>{activeIndex === modules.length - 1 ? "Voltar ao bloco 1" : "Próximo bloco"} <span>→</span></button></footer>
      </section>
    </div>
  );
}
