import React from "react";
import {
  AbsoluteFill,
  Composition,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const FPS = 30;
const DURATION = 12 * FPS;

const confirmationWindows = [
  {left: 1160, top: 422, width: 415, height: 430, start: 40},
  {left: 785, top: 335, width: 340, height: 380, start: 98},
  {left: 455, top: 380, width: 285, height: 300, start: 150},
];

export const ReverseTrace: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{backgroundColor: "#061115", overflow: "hidden"}}>
      <Img
        src={staticFile("reverse-trace-base.png")}
        style={{
          position: "absolute",
          inset: "-4%",
          width: "108%",
          height: "108%",
          objectFit: "cover",
          objectPosition: "center",
          opacity: interpolate(frame, [0, 14, 342, 359], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [0, 180, 359], [1.035, 1.085, 1.055], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          }),
          translate: interpolate(frame, [0, 180, 359], ["0px 0px", "-24px -7px", "-8px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          }),
          filter: `brightness(${interpolate(frame, [0, 80, 230, 359], [0.82, 0.94, 1.02, 0.86], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}) saturate(0.92)`,
        }}
      />

      {confirmationWindows.map((window, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: window.left,
            top: window.top,
            width: window.width,
            height: window.height,
            border: "1px solid rgba(37, 199, 183, 0.42)",
            backgroundColor: "rgba(37, 199, 183, 0.07)",
            boxShadow: "inset 0 0 70px rgba(37, 199, 183, 0.12), 0 0 28px rgba(37, 199, 183, 0.10)",
            opacity: interpolate(
              frame,
              [window.start, window.start + 16, window.start + 55, window.start + 82],
              [0, 0.72, 0.48, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
            clipPath: `inset(0 ${interpolate(
              frame,
              [window.start, window.start + 24],
              [100, 0],
              {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
            )}% 0 0)`,
            mixBlendMode: "screen",
          }}
        />
      ))}

      <svg
        viewBox="0 0 1920 1080"
        style={{position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible"}}
        aria-hidden="true"
      >
        <defs>
          <filter id="amberGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="tealGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M 1680 970 C 1580 895 1500 835 1390 795 S 1240 732 1148 670 S 960 628 842 632 S 652 656 524 645 S 300 570 106 526"
          pathLength="1"
          fill="none"
          stroke="#F3C84B"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1"
          strokeDashoffset={interpolate(frame, [18, 215], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.45, 0, 0.2, 1),
          })}
          opacity={interpolate(frame, [8, 24, 250, 325], [0, 1, 0.82, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          filter="url(#amberGlow)"
        />

        <path
          d="M 1680 970 C 1580 895 1500 835 1390 795 S 1240 732 1148 670 S 960 628 842 632 S 652 656 524 645 S 300 570 106 526"
          pathLength="1"
          fill="none"
          stroke="#25C7B7"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1"
          strokeDashoffset={interpolate(frame, [90, 275], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.45, 0, 0.2, 1),
          })}
          opacity={interpolate(frame, [88, 115, 290, 332], [0, 0.7, 0.5, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          filter="url(#tealGlow)"
        />

        <circle
          cx={interpolate(frame, [18, 65, 112, 159, 206], [1680, 1390, 1148, 842, 106], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.45, 0, 0.2, 1),
          })}
          cy={interpolate(frame, [18, 65, 112, 159, 206], [970, 795, 670, 632, 526], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.45, 0, 0.2, 1),
          })}
          r={interpolate(frame, [18, 28, 200, 224], [0, 10, 10, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          fill="#FFFFFF"
          stroke="#F3C84B"
          strokeWidth="5"
          filter="url(#amberGlow)"
        />
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(6,17,21,0.18) 0%, transparent 32%, transparent 62%, rgba(6,17,21,0.42) 100%)",
          opacity: interpolate(frame, [0, 18, 330, 359], [1, 0.72, 0.72, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};

export const MyComposition: React.FC = () => (
  <Composition
    id="KiloTraceReverseTrace"
    component={ReverseTrace}
    durationInFrames={DURATION}
    fps={FPS}
    width={1920}
    height={1080}
  />
);
