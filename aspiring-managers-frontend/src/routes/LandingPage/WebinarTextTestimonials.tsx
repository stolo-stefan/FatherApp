import TestimonialTextCard from "./TestimonialTextCard";

export default function WebinarTextTestimonials() {
  return (
    <section
      id="testimoniale"
      aria-label="Testimoniale clienți"
      className="bg-[var(--am-white)] border border-[var(--am-border-gray)] rounded-2xl p-6 md:p-8"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--am-text-dark)]">
        Ce spun cei care au colaborat?
      </h2>

      <div className="grid gap-10 md:grid-cols-2">
        <TestimonialTextCard 
          text="Cu Florin am învățat ceva ce nu îți spune nimeni la promovare: cum să gestionezi oamenii dificili fără să intri în conflict. M-a ghidat cu exemple reale și soluții simple. Datorită lui, primele luni ca manager au fost o lecție de creștere, nu un haos."
          name="Darius Drăghiceanu"
          role="Regional Sales Manager"
        />

        <TestimonialTextCard
          text="Credeam că trebuie să știu totul ca să fiu un lider bun. Florin Stoleriu mi-a schimbat complet perspectiva. M-a ajutat să-mi găsesc stilul de conducere, să dau feedback fără teamă și să câștig respectul echipei. A contat enorm."
          name="Irinel Ilie"
          role="Regional Sales Manager"
        />

        <TestimonialTextCard 
          text="Lucrul cu Florin mi-a accelerat evoluția ca manager. De la delegare, la structură și la gestionarea momentelor tensionate — totul a devenit mai clar. M-a ajutat să trec pragul acesta cu calm, nu cu panică."
          name="Valentin Sasu"
          role="Sales Manager"
        />

        <TestimonialTextCard 
          text="Cea mai mare schimbare pentru mine? Încrederea. Florin m-a ghidat pas cu pas și m-a ajutat să-mi găsesc vocea ca lider. Fără el, primele luni ar fi fost un labirint."
          name="Ailenei Ionuț"
          role="Sales Manager"
        />
      </div>
    </section>
  );
}