// src/components/LogoCarousel.tsx
interface LogoCarouselProps {
  logos: string[] // array of image URLs (imports or /public paths)
}

export function LogoCarousel({ logos }: LogoCarouselProps) {
  if (logos.length < 5) {
    console.warn("LogoCarousel is designed for at least 5 logos.")
  }

  const firstRow = logos.slice(0, 3)
  const secondRow = logos.slice(3, 5)

  return (
    <>
      {/* MOBILE / SMALL SCREENS: 3 up, 2 down */}
      <div className="mt-4 flex flex-col items-center gap-y-6 md:hidden">
        {/* 1st row – 3 logos */}
        <div className="grid grid-cols-3 gap-x-6 gap-y-4">
          {firstRow.map((src, idx) => (
            <div key={`m-row1-${idx}`} className="flex items-center justify-center">
              <img
                src={src}
                alt={`Logo ${idx + 1}`}
                className="h-10 max-w-[110px] object-contain"
              />
            </div>
          ))}
        </div>

        {/* 2nd row – 2 logos */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-4">
          {secondRow.map((src, idx) => (
            <div key={`m-row2-${idx}`} className="flex items-center justify-center">
              <img
                src={src}
                alt={`Logo ${idx + 4}`}
                className="h-10 max-w-[110px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP (md+): all logos in a single row */}
      <div className="hidden md:flex mt-4 items-center justify-center gap-10">
        {logos.map((src, idx) => (
          <div key={`d-row-${idx}`} className="flex items-center justify-center">
            <img
              src={src}
              alt={`Logo ${idx + 1}`}
              className="h-12 max-w-[130px] object-contain"
            />
          </div>
        ))}
      </div>
    </>
  )
}