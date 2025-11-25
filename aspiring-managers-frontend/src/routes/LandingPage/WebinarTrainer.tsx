// src/features/webinar/WebinarTrainer.tsx
export default function WebinarTrainer() {
  return (
    <section
      id="despre-trainer"
      aria-label="Despre trainer"
      className="bg-[var(--am-white)] border border-[var(--am-border-gray)] 
                 rounded-2xl p-8 md:p-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

        {/* LEFT SIDE — TEXT */}
        <div className="space-y-6 text-[1.125rem] leading-relaxed">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--am-text-dark)]">
            Despre mine
          </h2>

          <p>
            Sunt Florin Stoleriu, fondatorul programului Aspiring Managers 1 to 1.
            De peste 25 de ani fac management, dezvolt oameni, formez caractere și
            perfecționez sisteme de lucru.
          </p>

          <p>
            Am colaborat cu zeci de manageri debutanți pe care i-am ajutat să
            traverseze cu succes perioada de haos de la începutul mandatului lor.
            Am condus echipe care gestionau afaceri de sute de milioane de euro.
          </p>

          <p>
            Te invit în călătoria de transformare: de la „Ce se așteaptă de la mine?”
            la „Am analizat, am prioritizat și am decis”, sigur și fără emoții.
          </p>
        </div>

        {/* RIGHT SIDE — IMAGE */}
        <div className="flex items-center justify-center">
          <div className="
            w-full min-h-[260px] md:min-h-[320px]
            border border-dashed border-[var(--am-border-gray)]
            rounded-xl bg-[var(--am-bg-light)]
            flex items-center justify-center
            text-sm text-[var(--am-text-muted)] text-center px-4
          ">
            Poză / ilustrație Florin Stoleriu
            <br />
            (placeholder imagine)
          </div>
        </div>

      </div>
    </section>
  )
}
