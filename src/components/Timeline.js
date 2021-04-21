export default function Timeline({ start, finish }) {
  return (
    <svg
      width="180"
      height="11"
      viewBox="0 0 180 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Page">
        <g id="Group 1">
          <line
            id="Line 11"
            x1="7"
            y1="5.5"
            x2="173"
            y2="5.5"
            stroke="#777777"
          />
          <path id="Line 12" d="M7.5 3V8M172.5 3V8" stroke="#8B8282" />
          <text
            id="0"
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inconsolata"
            fontSize="12"
            letterSpacing="0em"
          >
            <tspan x="0" y="9.345">
              {start}
            </tspan>
          </text>
          <text
            id="5"
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Inconsolata"
            fontSize="10"
            letterSpacing="0em"
          >
            <tspan x="175" y="8.345">
              {finish}
            </tspan>
          </text>
        </g>
      </g>
    </svg>
  );
}
