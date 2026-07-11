import { AlertTriangle, ArrowRight, CheckCircle2, ClipboardList, Download, HelpCircle, Layers3, SlidersHorizontal } from "lucide-react"

type ToolKind = "lyrics" | "poem" | "story"

interface ToolContentGuideProps {
  toolName: string
  kind: ToolKind
  style?: string
}

const copy = {
  lyrics: {
    noun: "lyrics",
    problem: "Turn a rough song idea into structured verses, choruses, and bridges without getting stuck on the first line.",
    inputs: ["A genre or musical style", "The mood and central theme", "A topic, phrase, scene, or keyword", "Preferred length and output language"],
    uses: ["Develop a songwriting draft", "Explore hooks, verses, and rhyme directions", "Edit into lyrics for a demo or performance", "Export as text or an image for collaboration"],
    weak: ["The prompt only says “write a song”", "Too many unrelated themes are combined", "A living artist’s exact style is requested", "The result is published without human editing or a similarity check"],
    difference: "A rhyme dictionary finds matching words and a general chatbot needs a carefully written prompt. This tool collects songwriting decisions in dedicated controls and returns a labeled song structure.",
  },
  poem: {
    noun: "poem",
    problem: "Move from a theme or emotion to a complete poetic draft with a deliberate form, tone, and length.",
    inputs: ["A poetic form such as haiku or free verse", "The mood and central theme", "An image, phrase, subject, or keyword", "Preferred length and output language"],
    uses: ["Start a personal poem", "Explore imagery and alternative phrasing", "Create a draft for a card, class, or creative project", "Edit and export the result for later use"],
    weak: ["The theme is too broad to suggest concrete imagery", "The requested form conflicts with the chosen length", "Too many keywords must appear literally", "The first draft is used without checking rhythm and voice"],
    difference: "A thesaurus improves individual words and a general chatbot expects you to describe the form yourself. This tool makes form, mood, theme, and length explicit before generation.",
  },
  story: {
    noun: "story",
    problem: "Turn a premise into a usable short-story draft with characters, setting, conflict, and a clear narrative arc.",
    inputs: ["A genre and setting", "The mood or intended audience", "Characters, conflict, or a key event", "Preferred story length and output language"],
    uses: ["Draft short fiction or a writing exercise", "Test a premise before writing a longer story", "Generate scenes for lessons or content projects", "Edit the draft into your own narrative voice"],
    weak: ["The premise has no character goal or conflict", "Too many characters are requested in a short length", "The prompt contains contradictory events", "The generated facts or continuity are not reviewed"],
    difference: "A plot generator usually returns isolated ideas, while a general chatbot requires detailed narrative instructions. This tool collects story choices and produces a connected, editable draft.",
  },
} as const

export function ToolContentGuide({ toolName, kind, style }: ToolContentGuideProps) {
  const c = copy[kind]
  const label = style || toolName

  return (
    <section className="tool-manual" aria-labelledby="tool-guide-title">
      <div className="tool-manual-shell">
        <header className="tool-manual-intro">
          <span className="tool-manual-kicker">A PRACTICAL GUIDE</span>
          <h2 id="tool-guide-title">Everything you need to get a useful first draft.</h2>
          <p>Use this guide before and after generating with {toolName}. Better inputs produce a stronger draft, and a quick review turns that draft into work you can actually use.</p>
        </header>

        <div className="tool-manual-map" aria-label="Guide sections">
          <a href="#problem">Problem</a><a href="#inputs">Inputs</a><a href="#steps">Steps</a><a href="#uses">Uses</a><a href="#limitations">Limitations</a><a href="#comparison">Comparison</a><a href="#troubleshooting">FAQ</a>
        </div>

        <div className="tool-manual-grid">
          <article id="problem" className="tool-manual-card tool-manual-lead">
            <div className="tool-card-label"><Layers3 size={18} /> What problem does it solve?</div>
            <h3>Get past the blank page without giving up creative control.</h3>
            <p>{c.problem} {style ? `The generator starts with ${label} conventions so the first draft fits the intended direction.` : "You remain the editor: every result can be revised, regenerated, copied, and exported."}</p>
          </article>

          <article id="inputs" className="tool-manual-card">
            <div className="tool-card-label"><ClipboardList size={18} /> What should you prepare?</div>
            <h3>Four decisions are enough.</h3>
            <ul>{c.inputs.map((item) => <li key={item}><CheckCircle2 size={16} />{item}</li>)}</ul>
          </article>

          <article id="steps" className="tool-manual-card tool-manual-wide">
            <div className="tool-card-label"><SlidersHorizontal size={18} /> How does it work?</div>
            <h3>From idea to editable {c.noun} in four steps.</h3>
            <ol className="tool-steps">
              <li><span>1</span><div><strong>Choose the direction</strong><p>Select the style, mood, theme, length, and language.</p></div></li>
              <li><span>2</span><div><strong>Add useful detail</strong><p>Describe the subject, scene, phrase, character, or idea that must shape the result.</p></div></li>
              <li><span>3</span><div><strong>Generate the draft</strong><p>Review the structure and keep the lines or ideas that match your intention.</p></div></li>
              <li><span>4</span><div><strong>Edit and export</strong><p>Revise in the editor, regenerate when needed, then copy or download the finished draft.</p></div></li>
            </ol>
          </article>

          <article id="uses" className="tool-manual-card">
            <div className="tool-card-label"><Download size={18} /> What can you do with the result?</div>
            <h3>A draft that is ready to develop.</h3>
            <ul>{c.uses.map((item) => <li key={item}><ArrowRight size={16} />{item}</li>)}</ul>
          </article>

          <article id="limitations" className="tool-manual-card tool-manual-warning">
            <div className="tool-card-label"><AlertTriangle size={18} /> When will results be weaker?</div>
            <h3>Specific direction matters more than extra words.</h3>
            <ul>{c.weak.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>

          <article id="comparison" className="tool-manual-card tool-manual-wide tool-comparison">
            <div className="tool-card-label"><Layers3 size={18} /> How is it different?</div>
            <h3>Purpose-built controls, not an empty prompt box.</h3>
            <p>{c.difference}</p>
            <div className="comparison-row"><span>{toolName}</span><span>Guided inputs · structured output · edit and export</span></div>
            <div className="comparison-row"><span>Related tools</span><span>Useful for research or isolated tasks, but require more setup</span></div>
          </article>

          <article id="troubleshooting" className="tool-manual-card tool-manual-wide">
            <div className="tool-card-label"><HelpCircle size={18} /> Common questions and fixes</div>
            <div className="tool-fixes">
              <details><summary>The result feels generic. What should I change?</summary><p>Add one concrete scene, image, phrase, character goal, or emotional turn. Avoid relying on genre and mood alone.</p></details>
              <details><summary>The result does not follow my idea.</summary><p>Shorten the input to one main direction, remove conflicting keywords, and state the most important requirement first.</p></details>
              <details><summary>Can I edit or regenerate the output?</summary><p>Yes. Edit directly when the structure works, or regenerate after changing one control at a time so you can see what improves the result.</p></details>
              <details><summary>Can I use the generated result commercially?</summary><p>You can develop the generated draft for commercial work. Review, substantially edit, fact-check where relevant, and run a similarity check before publication.</p></details>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
