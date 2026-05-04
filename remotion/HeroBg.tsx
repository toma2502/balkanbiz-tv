import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const FLAGS = ["🇭🇷", "🇷🇸", "🇧🇦", "🇸🇮", "🇲🇪", "🇲🇰"];
const WORDS = [
  "PODUZETNIŠTVO",
  "MARKETING",
  "FINANCIJE",
  "TEHNOLOGIJA",
  "LIDERSTVO",
  "EDUKACIJA",
  "STRATEGIJA",
  "INVESTIRANJE",
  "BRENDING",
  "PRODAJA",
];

export const HeroBg: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  const t = frame / durationInFrames; // 0..1

  return (
    <AbsoluteFill style={{ background: "#08080b", overflow: "hidden" }}>
      {/* Ambient orbs */}
      <div
        style={{
          position: "absolute",
          width: width * 0.7,
          height: width * 0.7,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(251,191,36,0.45), transparent 60%)",
          filter: "blur(80px)",
          left: interpolate(t, [0, 0.5, 1], [-width * 0.3, width * 0.5, -width * 0.3]),
          top: interpolate(t, [0, 0.5, 1], [-height * 0.2, height * 0.4, -height * 0.2]),
        }}
      />
      <div
        style={{
          position: "absolute",
          width: width * 0.6,
          height: width * 0.6,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.25), transparent 60%)",
          filter: "blur(100px)",
          right: interpolate(t, [0, 0.5, 1], [-width * 0.2, -width * 0.4, -width * 0.2]),
          bottom: interpolate(t, [0, 0.5, 1], [-height * 0.3, height * 0.2, -height * 0.3]),
        }}
      />
      <div
        style={{
          position: "absolute",
          width: width * 0.4,
          height: width * 0.4,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.18), transparent 65%)",
          filter: "blur(70px)",
          left: interpolate(t, [0, 0.5, 1], [width * 0.6, width * 0.1, width * 0.6]),
          top: interpolate(t, [0, 0.5, 1], [height * 0.6, height * 0.1, height * 0.6]),
        }}
      />

      {/* Drifting words */}
      {WORDS.map((word, i) => {
        const offset = (i / WORDS.length + t) % 1;
        const y = (offset * height * 1.4) - height * 0.2;
        const opacity = interpolate(offset, [0, 0.1, 0.9, 1], [0, 0.07, 0.07, 0]);
        return (
          <div
            key={word}
            style={{
              position: "absolute",
              left: ((i * 137) % width) - width * 0.1,
              top: y,
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#fff",
              opacity,
              fontFamily: "Inter, ui-sans-serif, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            {word}
          </div>
        );
      })}

      {/* Country flags drifting horizontally */}
      {FLAGS.map((flag, i) => {
        const speed = 0.5 + (i % 3) * 0.2;
        const x = ((t * speed * width * 1.5) + i * (width / FLAGS.length)) % (width + 200) - 100;
        const y = (height * 0.15) + (i % 2) * (height * 0.55);
        return (
          <div
            key={flag + i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              fontSize: 80,
              opacity: 0.18,
              filter: "blur(0.3px)",
            }}
          >
            {flag}
          </div>
        );
      })}

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
