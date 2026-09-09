export const learningObjectives = [
  {
    verb: "JUSTIFY",
    text: "textual evaluations by identifying false statements and supporting reasoning with direct evidence and paraphrased details from the passage.",
  },
  {
    verb: "ANALYZE",
    text: "figurative language, structural connections, and character motivations across informational and literary text examples.",
  },
  {
    verb: "MATCH",
    text: "vocabulary terms to their accurate, context-based definitions.",
  },
  {
    verb: "ARGUE",
    text: "a clear stance on a real-world dilemma by evaluating personal drive versus formal institutional support and defending claims with text evidence.",
  },
  {
    verb: "SYNTHESIZE",
    text: "thematic concepts regarding adversity, resilience, and human ingenuity to compose a two-paragraph analytical response.",
  },
] as const;

export const passage = [
  {
    number: 1,
    title: "Weather as a bridge",
    role: "Introduces the connection between literal weather and figurative language.",
    text: `We talk about weather every single day, but often without realizing that our language is full of atmospheric metaphors. When a friend says they are feeling “under the weather,” they are not actually standing in a rainstorm. When someone encourages you to “weather the storm,” they are not handing you an umbrella, but rather asking you to show strength during a difficult trial. Weather expressions permeate human language because meteorological forces are universal; everyone understands the difference between a bright, sunny day and a sudden, destructive hurricane. However, bridging the gap between literal weather patterns and figurative expressions becomes especially powerful when we look at real-world stories of human survival.`,
  },
  {
    number: 2,
    title: "The crisis",
    role: "Shows how one climate event creates cascading human consequences.",
    text: `In 2001, the Southeast African nation of Malawi faced a devastating crisis caused by extreme weather. Severe droughts scorched the earth, leaving crops withered and the soil bone-dry. Fourteen-year-old William Kamkwamba, living in the small village of Masitala, experienced the immediate, literal consequences of this climate disaster. Without rain, his family’s maize crops failed, leading to a widespread famine. Unable to pay his annual school fees, William was forced to drop out of 7th grade. A metaphorical “dark cloud” hung over his future, threatening to freeze his educational dreams before they could even begin.`,
  },
  {
    number: 3,
    title: "A different path",
    role: "Reveals William's initiative and introduces wind as an untapped resource.",
    text: `Instead of succumbing to despair, William turned to his local community library. Despite struggling with the English vocabulary in science textbooks, he painstakingly studied the diagrams, fascinated by how simple machines could transform energy. He noticed that while the rains had completely abandoned his village, the wind remained a constant, powerful force in the atmosphere. People often speak of “fair-weather friends”—people who stay by your side during easy times but disappear when troubles blow in. The wind, however, was no fair-weather friend; it was an untapped resource waiting to be harnessed.`,
  },
  {
    number: 4,
    title: "Vision becomes action",
    role: "Provides concrete evidence of ingenuity, resilience, and impact.",
    text: `Gathering rusted tractor parts, plastic pipes, car batteries, and discarded bicycle frames from scrap yards, William began assembling a crude wind turbine. His neighbors mocked his efforts, assuming the strange tower was useless junk. Yet, William understood the physics of kinetic energy—the energy an object possesses due to its motion. When his homemade windmill finally spun in the Malawian breeze, it generated enough electricity to illuminate lightbulbs in his family's home and eventually run an electric pump to draw groundwater. William had taken a literal meteorological phenomenon and transformed it into a tangible solution for his village's survival.`,
  },
  {
    number: 5,
    title: "A new meaning for adversity",
    role: "Moves from the real event to the passage's larger thematic meaning.",
    text: `William’s remarkable achievement, immortalized in his memoir The Boy Who Harnessed the Wind, redefines how we view adversity. In literature, weather is frequently used as a symbolic device: a sudden downpour represents sadness, while a clearing sky signifies hope. But William’s story proves that nature's elements are neither inherently good nor evil. While severe climate events can devastate communities, human innovation can repurpose those same natural forces to create a figurative “silver lining” out of total ruin. Rather than waiting passively for a storm to pass, William adapted to his environment through science and ingenuity.`,
  },
  {
    number: 6,
    title: "The challenge to the reader",
    role: "Invites readers to apply William's response to their own adversity.",
    text: `Ultimately, weather is both a physical reality that dictates life on Earth and a rich lens for human expression. Whether we are analyzing climate patterns or using figurative idioms to express our feelings, weather connects us to the world around us. William Kamkwamba’s journey challenges us to reflect on our own responses to life's unpredictable seasons. When the literal or metaphorical winds of adversity blow across your path, will you let them knock you down, or will you build a windmill to harness their power?`,
  },
] as const;

export const keyTerms = [
  [1, "Permeate", "To spread, flow, or diffuse throughout every part of a space, language, or system."],
  [2, "Succumbing", "Giving in, surrendering, or failing to resist a negative force, temptation, or severe hardship."],
  [3, "Untapped", "Available and present, but not yet used, exploited, or turned to advantage."],
  [4, "Kinetic", "Relating to or produced by the movement of physical objects and energy."],
  [5, "Ingenuity", "The quality of being clever, creative, original, and inventive when solving tough problems."],
  [6, "Adversity", "Hardships, severe obstacles, or difficult circumstances that test a person's strength."],
  [7, "Meteorological", "Relating to weather, atmospheric conditions, and climate phenomena."],
  [8, "Idiom / Metaphor", "Figurative language where words represent abstract ideas or feelings rather than literal facts."],
  [9, "Symbolism", "Using a concrete object, event, or natural force to represent a deeper, abstract idea."],
  [10, "Famine", "An extreme, widespread shortage of food causing hunger and crisis across a region."],
  [11, "Tangible", "Something real, concrete, and physical that can be touched, seen, or measured."],
  [12, "Despair", "A complete loss of hope or belief that a difficult situation can ever get better."],
  [13, "Passively", "Accepting or allowing things to happen without taking active initiative or fighting back."],
  [14, "Resilience", "The capacity to recover quickly from setbacks, failure, or major life difficulties."],
  [15, "Doubt", "A feeling of uncertainty or lack of belief in someone's abilities or ideas."],
  [16, "Vision", "The ability to see future possibilities and solutions before they physically exist."],
  [17, "Phenomenon", "A remarkable, observable fact or event in nature or society."],
  [18, "Adaptability", "The ability to adjust easily to new conditions, environments, or sudden changes."],
  [19, "Immortalized", "Recorded or preserved in literature or art so that a story or person is remembered forever."],
  [20, "Initiative", "Taking the first step or personal charge of a problem without waiting for others to tell you what to do."],
] as const;

export const mainIdeas = [
  {
    number: "01",
    title: "Weather connects physical reality to human emotion",
    explanation: "Weather is universally experienced, making idioms like “under the weather” or “weathering the storm” easy for people everywhere to understand.",
    reflection: "Language uses nature as a lens because humans can feel as powerless against emotional problems as they do against a sudden storm.",
  },
  {
    number: "02",
    title: "Climate disasters cause immediate and cascading hardships",
    explanation: "The 2001 drought caused crop failure, severe famine, and forced William out of 7th grade because his family could not pay the fees.",
    reflection: "Environmental crises hit vulnerable communities hardest and can directly affect human rights such as education.",
  },
  {
    number: "03",
    title: "Natural forces are neutral; human purpose defines their impact",
    explanation: "The wind that remained during the drought was harnessed by William to generate kinetic energy and pump water.",
    reflection: "Obstacles in nature or life gain their ultimate value through how people choose to adapt and use them.",
  },
  {
    number: "04",
    title: "Innovation begins with vision in the face of public doubt",
    explanation: "Neighbors mocked William's scrap-built tower, but the windmill successfully lit his home and drew groundwater.",
    reflection: "Vision requires testing ideas through science and evidence even when public opinion is doubtful.",
  },
  {
    number: "05",
    title: "Resilience turns adversity into a silver lining",
    explanation: "Instead of giving up when formal school ended, William used the library to build a solution for his community.",
    reflection: "Weathering the storm can mean using its energy to build something better, not merely waiting for it to pass.",
  },
] as const;

export const evidenceChain = [
  ["Drought", "Crops fail and famine spreads."],
  ["School ends", "William's family cannot pay the annual fee."],
  ["Learning continues", "He studies science diagrams in the community library."],
  ["Vision survives doubt", "He transforms scrap parts into a wind turbine."],
  ["Wind becomes power", "The machine provides electricity and helps draw groundwater."],
] as const;

export const figurativeLanguage = [
  ["under the weather", "feeling unwell"],
  ["weather the storm", "remain strong through a difficult experience"],
  ["dark cloud", "a threat to William's future and education"],
  ["fair-weather friend", "someone present only when life is easy"],
  ["silver lining", "a hopeful result that emerges from hardship"],
  ["winds of adversity", "difficulties that test a person's resilience"],
] as const;
