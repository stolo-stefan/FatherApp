// src/features/webinar/WebinarBenefits.tsx
export default function WebinarBenefits() {
  return (
    <section
      id="beneficii"
      aria-label="Beneficii și conținut webinar"
      className="bg-[var(--am-white)] border border-[var(--am-border-gray)] rounded-2xl p-6 md:p-8"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-3">
        Ce vei afla concret
      </h2>
      <p className="text-base md:text-lg leading-relaxed mb-4">
        Acesta NU este un curs teoretic. Este un ghid de acțiune și gândire, alături de un set de instrumente care te ajută să decizi și să acționezi cu claritate și hotărâre în primele tale zile ca manager.
      </p>
      <p className="text-base md:text-lg leading-relaxed mb-4">
        Vei afla:
      </p>
      <ul className="pl-5 list-disc space-y-1 text-base md:text-lg">
        <li><span className="text-xl md:text-2xl font-semibold">Care</span> sunt cele mai mari frici ale tale ca manager debutant?</li>
        <li><span className="text-xl md:text-2xl font-semibold">Cum</span> sa gestionezi presiunea din primele saptamani?</li>
        <li><span className="text-xl md:text-2xl font-semibold">Ce</span> așteaptă organizația de la tine?</li>
        <li>Ce e bine să faci în primele zile în relația cu echipa?</li>
        <li>Cum să conduci o ședință eficient?</li>
        <li>Cum să dai un feedback constructiv?</li>
      </ul>
    </section>
  )
}
