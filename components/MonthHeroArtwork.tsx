type HeroMotif =
  | "snow"
  | "aurora"
  | "petals"
  | "sun"
  | "rain"
  | "storm"
  | "leaves"
  | "mist"
  | "stars";

export type MonthHeroTheme = {
  alt: string;
  edition: string;
  temperatureLabel: string;
  weatherLabel: string;
  accentStart: string;
  accentEnd: string;
  glowColor: string;
  skyTop: string;
  skyBottom: string;
  orbColor: string;
  orbX: number;
  orbY: number;
  orbRadius: number;
  ridgeFar: string;
  ridgeMid: string;
  ridgeNear: string;
  slopeLight: string;
  slopeDark: string;
  figureJacket: string;
  figureX: number;
  figureY: number;
  figureRotate: number;
  motif: HeroMotif;
  motifColor: string;
};

const MONTH_HEROES: MonthHeroTheme[] = [
  {
    alt: "Snowy alpine climbing scene for January",
    edition: "Frost Trail Edition",
    temperatureLabel: "2°C",
    weatherLabel: "Snowy",
    accentStart: "#47A4EA",
    accentEnd: "#2388D9",
    glowColor: "rgba(186, 220, 246, 0.42)",
    skyTop: "#E6EEF8",
    skyBottom: "#B7C8DB",
    orbColor: "#FFFFFF",
    orbX: 916,
    orbY: 118,
    orbRadius: 82,
    ridgeFar: "#597089",
    ridgeMid: "#213850",
    ridgeNear: "#D9E7F3",
    slopeLight: "#95A9BF",
    slopeDark: "#23394F",
    figureJacket: "#E2533F",
    figureX: 734,
    figureY: 296,
    figureRotate: -16,
    motif: "snow",
    motifColor: "#FFFFFF",
  },
  {
    alt: "Moonlit icy ridge with aurora tones for February",
    edition: "Winter Sky Edition",
    temperatureLabel: "5°C",
    weatherLabel: "Cold",
    accentStart: "#4CB6E6",
    accentEnd: "#237BCE",
    glowColor: "rgba(93, 200, 213, 0.32)",
    skyTop: "#DCE6F3",
    skyBottom: "#99B5D1",
    orbColor: "#F5FBFF",
    orbX: 220,
    orbY: 120,
    orbRadius: 70,
    ridgeFar: "#536A84",
    ridgeMid: "#1E3147",
    ridgeNear: "#C6D8E7",
    slopeLight: "#8CA3BD",
    slopeDark: "#21364D",
    figureJacket: "#F15F4B",
    figureX: 712,
    figureY: 308,
    figureRotate: -18,
    motif: "snow",
    motifColor: "#F7FCFF",
  },
  {
    alt: "Thawing mountain scene with early spring petals for March",
    edition: "Thaw Line Edition",
    temperatureLabel: "12°C",
    weatherLabel: "Breezy",
    accentStart: "#68BDAF",
    accentEnd: "#2E9E98",
    glowColor: "rgba(123, 214, 193, 0.28)",
    skyTop: "#E8F2F2",
    skyBottom: "#BAD4D5",
    orbColor: "#FFF7E8",
    orbX: 866,
    orbY: 126,
    orbRadius: 74,
    ridgeFar: "#5D7B7B",
    ridgeMid: "#27504D",
    ridgeNear: "#DCE9E3",
    slopeLight: "#9AB1A8",
    slopeDark: "#274843",
    figureJacket: "#E9634D",
    figureX: 720,
    figureY: 304,
    figureRotate: -14,
    motif: "petals",
    motifColor: "#F5C5C8",
  },
  {
    alt: "High mountain blooms and bright spring light for April",
    edition: "Bloom Path Edition",
    temperatureLabel: "18°C",
    weatherLabel: "Fresh",
    accentStart: "#6CC4A4",
    accentEnd: "#279A82",
    glowColor: "rgba(115, 204, 164, 0.28)",
    skyTop: "#EDF7F5",
    skyBottom: "#BEDFD4",
    orbColor: "#FFF3D6",
    orbX: 958,
    orbY: 132,
    orbRadius: 78,
    ridgeFar: "#648476",
    ridgeMid: "#2B584A",
    ridgeNear: "#E2EFE6",
    slopeLight: "#A7BCB0",
    slopeDark: "#2C4E45",
    figureJacket: "#ED694F",
    figureX: 736,
    figureY: 296,
    figureRotate: -15,
    motif: "petals",
    motifColor: "#F3C7D9",
  },
  {
    alt: "Clear alpine lake and green ascent for May",
    edition: "Summit Meadow Edition",
    temperatureLabel: "24°C",
    weatherLabel: "Sunny",
    accentStart: "#64C6B1",
    accentEnd: "#1C9A8A",
    glowColor: "rgba(98, 198, 177, 0.26)",
    skyTop: "#E6F7FA",
    skyBottom: "#B1DCE5",
    orbColor: "#FFF7D8",
    orbX: 205,
    orbY: 126,
    orbRadius: 68,
    ridgeFar: "#5C7E77",
    ridgeMid: "#214E4C",
    ridgeNear: "#D5F0EE",
    slopeLight: "#95B9B4",
    slopeDark: "#24514E",
    figureJacket: "#E85C45",
    figureX: 746,
    figureY: 292,
    figureRotate: -15,
    motif: "sun",
    motifColor: "#FFF0B1",
  },
  {
    alt: "Monsoon clouds rolling across the mountain for June",
    edition: "Monsoon Arrival Edition",
    temperatureLabel: "27°C",
    weatherLabel: "Rainy",
    accentStart: "#58B8D7",
    accentEnd: "#227EAF",
    glowColor: "rgba(88, 184, 215, 0.2)",
    skyTop: "#DEEAF3",
    skyBottom: "#92B4C9",
    orbColor: "#EEF6FB",
    orbX: 962,
    orbY: 126,
    orbRadius: 62,
    ridgeFar: "#4C687C",
    ridgeMid: "#1F384D",
    ridgeNear: "#C8D9E3",
    slopeLight: "#8FA8B9",
    slopeDark: "#223A4F",
    figureJacket: "#E25D42",
    figureX: 734,
    figureY: 300,
    figureRotate: -16,
    motif: "rain",
    motifColor: "#D7E8F6",
  },
  {
    alt: "Deep rainy season storm over the climb for July",
    edition: "Peak Storm Edition",
    temperatureLabel: "25°C",
    weatherLabel: "Stormy",
    accentStart: "#54B6D8",
    accentEnd: "#216E9F",
    glowColor: "rgba(84, 182, 216, 0.18)",
    skyTop: "#D4E1EC",
    skyBottom: "#718EA7",
    orbColor: "#E8F0F5",
    orbX: 214,
    orbY: 112,
    orbRadius: 56,
    ridgeFar: "#455F72",
    ridgeMid: "#1B3144",
    ridgeNear: "#B6C7D5",
    slopeLight: "#7F98AA",
    slopeDark: "#1F3548",
    figureJacket: "#EA6846",
    figureX: 736,
    figureY: 304,
    figureRotate: -17,
    motif: "storm",
    motifColor: "#D9E6F2",
  },
  {
    alt: "Stormy monsoon climb with rain streaks for August",
    edition: "Storm Track Edition",
    temperatureLabel: "24°C",
    weatherLabel: "Rainy",
    accentStart: "#4FB2D6",
    accentEnd: "#227DB5",
    glowColor: "rgba(79, 178, 214, 0.22)",
    skyTop: "#D7E9F6",
    skyBottom: "#87AEC7",
    orbColor: "#EAF4FF",
    orbX: 216,
    orbY: 110,
    orbRadius: 64,
    ridgeFar: "#4F6C84",
    ridgeMid: "#20384C",
    ridgeNear: "#C9D9E5",
    slopeLight: "#90A7BB",
    slopeDark: "#23384D",
    figureJacket: "#EB5A43",
    figureX: 724,
    figureY: 304,
    figureRotate: -17,
    motif: "storm",
    motifColor: "#D8E8F5",
  },
  {
    alt: "Retreating rain and mist around the ridge for September",
    edition: "Mist Retreat Edition",
    temperatureLabel: "21°C",
    weatherLabel: "Misty",
    accentStart: "#59B4C8",
    accentEnd: "#2479A7",
    glowColor: "rgba(89, 180, 200, 0.22)",
    skyTop: "#E7EFF3",
    skyBottom: "#A7BEC9",
    orbColor: "#F5FAFD",
    orbX: 928,
    orbY: 126,
    orbRadius: 72,
    ridgeFar: "#60727B",
    ridgeMid: "#31464E",
    ridgeNear: "#D7E0E3",
    slopeLight: "#A4B2B5",
    slopeDark: "#405159",
    figureJacket: "#D66946",
    figureX: 732,
    figureY: 302,
    figureRotate: -15,
    motif: "mist",
    motifColor: "#F5FBFF",
  },
  {
    alt: "Autumn mountain slope with copper leaves for October",
    edition: "Copper Leaf Edition",
    temperatureLabel: "17°C",
    weatherLabel: "Crisp",
    accentStart: "#5FB3C4",
    accentEnd: "#257CA7",
    glowColor: "rgba(95, 179, 196, 0.22)",
    skyTop: "#F1EEE9",
    skyBottom: "#D3C7BB",
    orbColor: "#FFD6A0",
    orbX: 240,
    orbY: 124,
    orbRadius: 72,
    ridgeFar: "#80695E",
    ridgeMid: "#4E3D37",
    ridgeNear: "#E9D8C4",
    slopeLight: "#C0A58F",
    slopeDark: "#654C3D",
    figureJacket: "#C95532",
    figureX: 724,
    figureY: 300,
    figureRotate: -16,
    motif: "leaves",
    motifColor: "#D67D3D",
  },
  {
    alt: "Foggy highland climb with mist for November",
    edition: "Mist Line Edition",
    temperatureLabel: "11°C",
    weatherLabel: "Cool",
    accentStart: "#58AFC4",
    accentEnd: "#236E97",
    glowColor: "rgba(88, 175, 196, 0.2)",
    skyTop: "#E8ECEF",
    skyBottom: "#B4C0C7",
    orbColor: "#F2F7FA",
    orbX: 954,
    orbY: 124,
    orbRadius: 68,
    ridgeFar: "#70808A",
    ridgeMid: "#34464F",
    ridgeNear: "#D7DFE2",
    slopeLight: "#AAB5BA",
    slopeDark: "#435058",
    figureJacket: "#CF5E41",
    figureX: 736,
    figureY: 302,
    figureRotate: -16,
    motif: "mist",
    motifColor: "#F9FDFF",
  },
  {
    alt: "Snow-filled winter ascent under a cold sky for December",
    edition: "Snow Camp Edition",
    temperatureLabel: "4°C",
    weatherLabel: "Cold",
    accentStart: "#5AB9E2",
    accentEnd: "#2384CE",
    glowColor: "rgba(90, 185, 226, 0.24)",
    skyTop: "#D7E3F2",
    skyBottom: "#8EA8C4",
    orbColor: "#F8FCFF",
    orbX: 940,
    orbY: 114,
    orbRadius: 72,
    ridgeFar: "#566E86",
    ridgeMid: "#1F344B",
    ridgeNear: "#D5E1ED",
    slopeLight: "#90A7BE",
    slopeDark: "#24394F",
    figureJacket: "#E65A48",
    figureX: 742,
    figureY: 300,
    figureRotate: -17,
    motif: "snow",
    motifColor: "#FFFFFF",
  },
];

export function getMonthHero(monthIndex: number) {
  return MONTH_HEROES[monthIndex];
}

function renderMotif(theme: MonthHeroTheme) {
  switch (theme.motif) {
    case "snow":
      return (
        <>
          {Array.from({ length: 18 }, (_, index) => (
            <circle
              key={`snow-${index}`}
              cx={180 + index * 46}
              cy={92 + (index % 4) * 28}
              r={(index % 3) + 2}
              fill={theme.motifColor}
              opacity={0.82}
            />
          ))}
          {Array.from({ length: 10 }, (_, index) => {
            const x = 144 + index * 92;
            const y = 88 + (index % 3) * 34;

            return (
              <g
                key={`flake-${index}`}
                opacity="0.6"
                transform={`translate(${x} ${y})`}
              >
                <path d="M0 -8L0 8" stroke={theme.motifColor} strokeWidth="1.8" />
                <path d="M-8 0L8 0" stroke={theme.motifColor} strokeWidth="1.8" />
              </g>
            );
          })}
        </>
      );
    case "aurora":
      return (
        <>
          <path
            d="M74 160C208 40 380 92 522 58C675 22 824 78 1020 34"
            stroke={theme.motifColor}
            strokeWidth="26"
            strokeLinecap="round"
            opacity="0.28"
          />
          <path
            d="M104 126C252 56 396 92 560 70C726 48 860 80 1060 42"
            stroke="#D7FFF8"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.2"
          />
        </>
      );
    case "petals":
      return Array.from({ length: 14 }, (_, index) => (
        <ellipse
          key={index}
          cx={150 + index * 58}
          cy={110 + ((index + 1) % 4) * 24}
          rx="8"
          ry="4"
          fill={theme.motifColor}
          opacity={0.64}
          transform={`rotate(${index % 2 === 0 ? -18 : 16} ${150 + index * 58} ${
            110 + ((index + 1) % 4) * 24
          })`}
        />
      ));
    case "sun":
      return Array.from({ length: 9 }, (_, index) => (
        <rect
          key={index}
          x={theme.orbX - 2}
          y={theme.orbY - theme.orbRadius - 18}
          width="4"
          height="18"
          rx="99"
          fill={theme.motifColor}
          opacity={0.62}
          transform={`rotate(${index * 20} ${theme.orbX} ${theme.orbY})`}
        />
      ));
    case "rain":
      return (
        <>
          <ellipse
            cx="252"
            cy="124"
            fill="#EEF5FB"
            opacity="0.58"
            rx="118"
            ry="42"
          />
          <ellipse
            cx="372"
            cy="136"
            fill="#E4EEF7"
            opacity="0.56"
            rx="146"
            ry="48"
          />
          <ellipse
            cx="850"
            cy="132"
            fill="#ECF4FB"
            opacity="0.52"
            rx="168"
            ry="46"
          />
          {Array.from({ length: 13 }, (_, index) => (
            <path
              key={index}
              d={`M${160 + index * 64} ${126 + (index % 3) * 14}L${
                146 + index * 64
              } ${172 + (index % 3) * 14}`}
              stroke={theme.motifColor}
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.68"
            />
          ))}
        </>
      );
    case "storm":
      return (
        <>
          <ellipse
            cx="282"
            cy="124"
            fill="#DDE7F1"
            opacity="0.7"
            rx="156"
            ry="50"
          />
          <ellipse
            cx="454"
            cy="136"
            fill="#C8D6E3"
            opacity="0.66"
            rx="188"
            ry="58"
          />
          <ellipse
            cx="880"
            cy="126"
            fill="#D3DFEA"
            opacity="0.68"
            rx="198"
            ry="54"
          />
          {Array.from({ length: 15 }, (_, index) => (
            <path
              key={`storm-rain-${index}`}
              d={`M${150 + index * 62} ${134 + (index % 2) * 18}L${
                136 + index * 62
              } ${188 + (index % 2) * 18}`}
              stroke={theme.motifColor}
              strokeWidth="5.5"
              strokeLinecap="round"
              opacity="0.66"
            />
          ))}
          <path
            d="M616 120L592 172H628L602 232"
            fill="none"
            opacity="0.78"
            stroke="#FFF2BF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
          />
        </>
      );
    case "leaves":
      return Array.from({ length: 12 }, (_, index) => (
        <path
          key={index}
          d={`M${140 + index * 66} ${116 + (index % 3) * 18}C${
            150 + index * 66
          } ${100 + (index % 3) * 18}, ${162 + index * 66} ${
            118 + (index % 3) * 18
          }, ${150 + index * 66} ${132 + (index % 3) * 18}C${
            138 + index * 66
          } ${120 + (index % 3) * 18}, ${134 + index * 66} ${
            112 + (index % 3) * 18
          }, ${140 + index * 66} ${116 + (index % 3) * 18}Z`}
          fill={theme.motifColor}
          opacity="0.68"
        />
      ));
    case "mist":
      return (
        <>
          <rect
            x="98"
            y="126"
            width="1024"
            height="34"
            rx="999"
            fill={theme.motifColor}
            opacity="0.32"
          />
          <rect
            x="164"
            y="168"
            width="908"
            height="26"
            rx="999"
            fill={theme.motifColor}
            opacity="0.24"
          />
        </>
      );
    case "stars":
      return Array.from({ length: 12 }, (_, index) => {
        const x = 150 + index * 74;
        const y = 88 + (index % 4) * 24;

        return (
          <g key={index} opacity="0.82" transform={`translate(${x} ${y})`}>
            <path d="M0 -8L0 8" stroke={theme.motifColor} strokeWidth="2.5" />
            <path d="M-8 0L8 0" stroke={theme.motifColor} strokeWidth="2.5" />
          </g>
        );
      });
    default:
      return null;
  }
}

function renderFigure(theme: MonthHeroTheme) {
  return (
    <g
      transform={`translate(${theme.figureX} ${theme.figureY}) rotate(${theme.figureRotate})`}
    >
      <ellipse
        cx="36"
        cy="84"
        fill="rgba(17, 26, 35, 0.18)"
        rx="50"
        ry="16"
        transform="rotate(-12 36 84)"
      />
      <path
        d="M22 16C28 8 42 8 50 16L52 40C46 50 34 54 22 48L16 30C17 24 19 19 22 16Z"
        fill={theme.figureJacket}
      />
      <path
        d="M38 18L58 12L66 22L49 34L59 58L47 60L35 37L38 18Z"
        fill={theme.figureJacket}
      />
      <path
        d="M18 24C10 32 6 42 7 53L18 48L26 30L18 24Z"
        fill="#263340"
      />
      <path
        d="M26 15C19 18 15 26 16 36C18 31 24 28 29 28L28 18L26 15Z"
        fill="#314253"
      />
      <path
        d="M46 15C54 18 59 25 60 35C55 28 49 25 43 24L44 17L46 15Z"
        fill="#C84F3B"
        opacity="0.72"
      />
      <path
        d="M24 49L18 79L20 114"
        fill="none"
        stroke="#18222D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
      />
      <path
        d="M41 47L55 76L80 106"
        fill="none"
        stroke="#22303C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
      />
      <path
        d="M15 113L28 113L30 120L16 122L15 113Z"
        fill="#101820"
      />
      <path
        d="M77 104L91 104L94 111L80 113L77 104Z"
        fill="#131D27"
      />
      <path
        d="M17 30L6 55"
        fill="none"
        stroke="#25313D"
        strokeLinecap="round"
        strokeWidth="8"
      />
      <path
        d="M45 28L63 6"
        fill="none"
        stroke="#25313D"
        strokeLinecap="round"
        strokeWidth="8"
      />
      <path
        d="M63 5L80 -13"
        fill="none"
        stroke="#25313D"
        strokeLinecap="round"
        strokeWidth="6"
      />
      <path
        d="M72 -15L92 -7L79 0"
        fill="none"
        stroke="#25313D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
      />
      <path
        d="M28 18C28 9 35 3 44 3C51 3 57 9 57 17C57 24 51 29 43 29C35 29 28 24 28 18Z"
        fill="#24313C"
      />
    </g>
  );
}

type MonthHeroArtworkProps = {
  className?: string;
  monthIndex: number;
};

export function MonthHeroArtwork({
  className,
  monthIndex,
}: MonthHeroArtworkProps) {
  const theme = getMonthHero(monthIndex);
  const skyId = `hero-sky-${monthIndex}`;
  const ridgeFarId = `hero-ridge-far-${monthIndex}`;
  const ridgeMidId = `hero-ridge-mid-${monthIndex}`;
  const slopeId = `hero-slope-${monthIndex}`;

  return (
    <svg
      aria-label={theme.alt}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      viewBox="0 0 1200 720"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={skyId} x1="140" x2="1010" y1="40" y2="640">
          <stop offset="0%" stopColor={theme.skyTop} />
          <stop offset="100%" stopColor={theme.skyBottom} />
        </linearGradient>
        <linearGradient id={ridgeFarId} x1="120" x2="920" y1="520" y2="320">
          <stop offset="0%" stopColor={theme.ridgeFar} />
          <stop offset="100%" stopColor={theme.slopeLight} />
        </linearGradient>
        <linearGradient id={ridgeMidId} x1="200" x2="1110" y1="650" y2="250">
          <stop offset="0%" stopColor={theme.ridgeMid} />
          <stop offset="100%" stopColor={theme.slopeDark} />
        </linearGradient>
        <linearGradient id={slopeId} x1="640" x2="1120" y1="500" y2="280">
          <stop offset="0%" stopColor={theme.ridgeNear} />
          <stop offset="100%" stopColor={theme.slopeLight} />
        </linearGradient>
      </defs>

      <rect fill={`url(#${skyId})`} height="720" width="1200" />
      <circle
        cx={theme.orbX}
        cy={theme.orbY}
        fill={theme.orbColor}
        opacity="0.82"
        r={theme.orbRadius}
      />

      <g opacity="0.34">
        <circle cx="248" cy="128" fill="#FFFFFF" r="126" />
        <circle cx="922" cy="176" fill="#EEF5FA" r="132" />
        <circle cx="742" cy="96" fill="#FFFFFF" opacity="0.45" r="70" />
      </g>

      <g>{renderMotif(theme)}</g>

      <path
        d="M0 590L220 472L402 505L622 392L1200 184V720H0V590Z"
        fill={`url(#${ridgeFarId})`}
      />
      <path
        d="M0 664L230 494L482 618L1200 205V720H0V664Z"
        fill={`url(#${ridgeMidId})`}
      />
      <path
        d="M258 455L362 417L416 432L515 394L605 346L748 319L690 376L551 453L480 469L420 522L258 455Z"
        fill={theme.slopeDark}
        opacity="0.56"
      />
      <path
        d="M647 342L1200 150V257L884 412L760 428L687 386L647 342Z"
        fill={theme.slopeLight}
        opacity="0.54"
      />
      <path
        d="M616 420L1200 132V197L907 349L842 353L760 410L687 431L616 420Z"
        fill={`url(#${slopeId})`}
        opacity="0.72"
      />
      <path d="M0 720V545L182 668L0 720Z" fill={theme.accentStart} />
      <path d="M770 720L1200 422V720H770Z" fill={theme.accentEnd} />

      {renderFigure(theme)}
    </svg>
  );
}
