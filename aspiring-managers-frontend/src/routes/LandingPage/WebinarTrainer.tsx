// src/features/webinar/WebinarTrainer.tsx
import FlorinStoleriuTrainer from "@/assets/Florin Stoleriu - Trainer.jpeg"

export default function WebinarTrainer() {
  return (
    <section
      id="despre-trainer"
      aria-label="Despre trainer"
      className="bg-[var(--am-white)] border border-[var(--am-border-gray)]
                 rounded-2xl p-8 md:p-12"
    >
        <div className="
  flex flex-col 
  md:flex-row md:items-start
  gap-4 md:gap-10
">
        {/* LEFT SIDE — TEXT */}
        <div className="md:flex-1 space-y-6 text-[1.125rem] leading-relaxed">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--am-text-dark)]">
            Despre mine
          </h2>

          <p>
            Sunt Florin Stoleriu, fondatorul programului Aspiring Managers 1 to 1.
            <br />De peste 25 de ani fac management, dezvolt oameni, formez caractere și
            perfecționez sisteme de lucru.
          </p>

          <p>
            Am colaborat cu zeci de manageri debutanți pe care i-am ajutat să
            traverseze cu succes perioada de haos de la începutul mandatului lor.
            <br />Am condus echipe care gestionau afaceri de sute de milioane de euro.
          </p>

          <p>
            Te invit în călătoria de transformare: de la „Ce se așteaptă de la mine?”
            <br />la „Am analizat, am prioritizat și am decis”, sigur și fără emoții.
          </p>
        </div>

        {/* RIGHT SIDE — IMAGE */}
        <div className="flex items-start justify-center md:justify-end mt-6 md:mt-10">
          <img
            src={FlorinStoleriuTrainer}
            alt="Florin Stoleriu"
            className="
    h-[460px]
    w-auto max-w-[380px]
    rounded-xl object-cover shadow-md
    md:-ml-8        /* THIS NOW WORKS */
  "

          />
        </div>


      </div>
    </section>
  )
}
