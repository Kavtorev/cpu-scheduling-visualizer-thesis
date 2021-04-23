export default function Timeline({ start, finish }) {
  return (
    <svg
      width="168"
      height="12"
      viewBox="0 0 168 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="168" height="12" fill="#E5E5E5" />
      <g id="Page">
        <rect
          width="1440"
          height="1024"
          transform="translate(-241 -774)"
          fill="white"
        />
        <g id="Body">
          <g id="Player">
            <g id="Animation panel">
              <rect
                id="Container"
                x="-217"
                y="-169"
                width="1045"
                height="264"
                fill="#E9E9E9"
              />
              <g id="Animated Part">
                <g id="Chain of processes">
                  <g id="Process 2">
                    <rect
                      id="Rectangle 6"
                      x="-10"
                      y="-74"
                      width="182"
                      height="88"
                      fill="#C4C4C4"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
        <g id="GOODTIMELINE">
          <line
            id="Line 13"
            x1="21"
            y1="6.5"
            x2="137"
            y2="6.5"
            stroke="#777777"
          />
          <text
            id="finish"
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Open Sans"
            fontSize="9"
            letterSpacing="0em"
          >
            <tspan x="147" y="9.49146">
              {finish}
            </tspan>
          </text>
          <text
            id="start"
            fill="black"
            xmlSpace="preserve"
            style={{ whiteSpace: "pre" }}
            fontFamily="Open Sans"
            fontSize="9"
            letterSpacing="0em"
          >
            <tspan x="0" y="9.49146">
              {start}
            </tspan>
          </text>
          <path
            id="arrow left"
            d="M19.1702 6.34067L22.4602 5.06607C22.6876 4.97798 23.0553 4.97798 23.2803 5.06607L23.827 5.27788C24.0544 5.36598 24.0544 5.50843 23.827 5.5956L21.4974 6.5L23.8295 7.40347C24.0568 7.49156 24.0568 7.63402 23.8295 7.72118L23.2827 7.93393C23.0553 8.02202 22.6876 8.02202 22.4627 7.93393L19.1727 6.65933C18.9428 6.57123 18.9428 6.42877 19.1702 6.34067V6.34067Z"
            fill="#575555"
          />
          <path
            id="arrow right"
            d="M138.83 6.65933L135.54 7.93393C135.312 8.02202 134.945 8.02202 134.72 7.93393L134.173 7.72212C133.946 7.63402 133.946 7.49157 134.173 7.4044L136.503 6.5L134.171 5.59653C133.943 5.50844 133.943 5.36598 134.171 5.27882L134.717 5.06607C134.945 4.97798 135.312 4.97798 135.537 5.06607L138.827 6.34067C139.057 6.42877 139.057 6.57123 138.83 6.65933V6.65933Z"
            fill="#575555"
          />
        </g>
      </g>
    </svg>
  );
}
