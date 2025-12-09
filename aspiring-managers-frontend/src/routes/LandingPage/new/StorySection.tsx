import NewButon from "@/components/home/NewButton";
import type { ReadCourseDto } from "@/services/course";

interface WebinarHeroProps{
    course: ReadCourseDto | null
}


export default function StorySection({
  course
}: WebinarHeroProps) {
  return (
    <section className="w-full max-w-3xl mx-auto">
      {/* separator from previous section */}
      <div className="border-t border-[var(--am-border-gray)] mt-20 mb-6" />

      <h2 className="text-3xl font-bold text-[var(--am-text-dark)]">
        Sunt sigur că și tu ai trecut prin stări asemănătoare cu ale mele…
      </h2>

      <div className="mt-6 space-y-4 text-[var(--am-text-muted)] leading-relaxed">
        <p>
          Când am devenit pentru prima dată manager, acum 25 de ani, credeam că
          dacă ești un bun specialist, promovarea vine și restul curge de la
          sine. Realitatea a fost alta.
        </p>

        <p>
          Nu știam cum să vorbesc cu directorii fără să simt că sunt judecat la
          fiecare propoziție. Mă prindeam controlând tot și totuși aveam
          senzația că îmi scapă lucruri. Evitam conflictele și amânam
          feedback-urile dificile, doar ca să nu tensionez relațiile.
        </p>

        <p>Și poate că și tu simți același lucru acum.</p>

        <p>
          Adevărul este că majoritatea managerilor debutanți trec prin asta,
          doar că nimeni nu vorbește deschis. Toți „s-au descurcat”, cică…
        </p>

        <p>
          În webinarul gratuit de 1 oră, discutăm exact despre aceste lucruri și
          despre cum poți începe să le rezolvi cu claritate, încredere și
          structură reală, nu teorie din cărți.
        </p>

        <p>
          Este primul pas spre un rol managerial în care să nu te mai simți
          singur, nepregătit sau copleșit.
        </p>

        <p>Te aștept acolo.</p>
      </div>
        {/* CTA BUTTON – centered */}
        <div className="pt-4 flex justify-center">
            <NewButon course={course} />
        </div>
      {/* If you want the orange CTA under this block, drop your button here */}
      {/* <YourCtaButton className="mt-8" /> */}
    </section>
  )
}
