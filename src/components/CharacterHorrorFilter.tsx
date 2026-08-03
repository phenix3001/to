export function CharacterHorrorFilter() {
  return (
    <svg className="character-horror-filter" aria-hidden="true">
      <filter id="character-horror" x="-12%" y="-8%" width="124%" height="116%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.012 0.045"
          numOctaves="2"
          seed="17"
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="3.5"
          xChannelSelector="R"
          yChannelSelector="B"
          result="warped"
        />
        <feColorMatrix
          in="warped"
          type="matrix"
          values="
            0.58 0.24 0.08 0 0.03
            0.24 0.42 0.08 0 0.02
            0.08 0.16 0.22 0 0.01
            0    0    0    1 0
          "
          result="agedAmber"
        />
        <feComponentTransfer in="agedAmber">
          <feFuncR type="discrete" tableValues="0 .10 .23 .38 .55 .71 .86 1" />
          <feFuncG type="discrete" tableValues="0 .07 .16 .28 .42 .57 .72 .88" />
          <feFuncB type="discrete" tableValues="0 .04 .10 .18 .28 .40 .55 .72" />
          <feFuncA type="identity" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}
