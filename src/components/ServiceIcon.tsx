type Props = { icon: string }

const A = '#ff6a3d'
const N = '#22d3ee'
const V = '#a78bfa'

export default function ServiceIcon({ icon }: Props) {
  return (
    <svg viewBox="0 0 56 56" className="icon-svg" fill="none" aria-hidden="true">
      {icon === 'browser' && (
        <g strokeWidth="1.6" strokeLinecap="round">
          <rect x="8" y="12" width="40" height="32" rx="4" stroke={N} />
          <path d="M8 20h40" stroke={N} strokeOpacity="0.5" />
          <circle cx="13" cy="16" r="1.3" fill={A} stroke="none" />
          <circle cx="17.5" cy="16" r="1.3" fill={V} stroke="none" />
          <path d="M14 27h20" stroke={A} className="flow" />
          <path d="M14 33h28" stroke={N} strokeOpacity="0.7" className="flow" />
          <path d="M14 39h14" stroke={V} strokeOpacity="0.7" className="flow" />
        </g>
      )}

      {icon === 'cube' && (
        <g strokeWidth="1.6" strokeLinejoin="round">
          <path d="M28 8 46 18v20L28 48 10 38V18L28 8Z" stroke={N} />
          <path d="M28 8v20m0 0 18-10M28 28 10 18" stroke={N} strokeOpacity="0.55" />
          <path d="M28 28v20" stroke={N} strokeOpacity="0.3" />
          <g className="orbit">
            <circle cx="28" cy="28" r="21" stroke={A} strokeOpacity="0.35" strokeDasharray="3 6" />
            <circle cx="49" cy="28" r="2.4" fill={A} stroke="none" />
          </g>
        </g>
      )}

      {icon === 'agent' && (
        <g strokeWidth="1.6">
          <g className="orbit">
            <path d="M28 28 12 14" stroke={A} strokeOpacity="0.7" />
            <path d="M28 28 46 16" stroke={N} strokeOpacity="0.7" />
            <path d="M28 28 10 38" stroke={V} strokeOpacity="0.7" />
            <path d="M28 28 44 42" stroke={A} strokeOpacity="0.5" />
            <circle cx="12" cy="14" r="2.6" fill={A} stroke="none" className="blink" />
            <circle cx="46" cy="16" r="2.6" fill={N} stroke="none" className="blink" />
            <circle cx="10" cy="38" r="2.6" fill={V} stroke="none" className="blink" />
            <circle cx="44" cy="42" r="2.6" fill={A} stroke="none" className="blink" />
          </g>
          <circle cx="28" cy="28" r="7.5" stroke={N} />
          <circle cx="28" cy="28" r="3" fill={N} stroke="none" className="blink" />
        </g>
      )}

      {icon === 'dials' && (
        <g strokeWidth="1.6" strokeLinecap="round">
          <path d="M14 12v32M28 12v32M42 12v32" stroke={N} strokeOpacity="0.5" />
          <circle cx="14" cy="22" r="3.2" fill="#0a0a12" stroke={A} />
          <circle cx="28" cy="36" r="3.2" fill="#0a0a12" stroke={N} />
          <g>
            <circle cx="42" cy="20" r="3.2" fill="#0a0a12" stroke={V} className="blink" />
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 0 20; 0 0"
              dur="3.4s"
              repeatCount="indefinite"
            />
          </g>
        </g>
      )}

      {icon === 'workflow' && (
        <g strokeWidth="1.6">
          <rect x="7" y="22" width="10" height="10" rx="2.5" stroke={A} />
          <rect x="23" y="22" width="10" height="10" rx="2.5" stroke={N} />
          <rect x="39" y="22" width="10" height="10" rx="2.5" stroke={V} />
          <path d="M17 27h6M33 27h6" stroke={A} className="flow" />
          <circle cx="28" cy="27" r="1.6" fill={N} stroke="none" className="blink" />
          <path d="M28 12v6M28 36v8" stroke={N} strokeOpacity="0.4" className="flow" />
        </g>
      )}

      {icon === 'video' && (
        <g strokeWidth="1.6" strokeLinecap="round">
          <rect x="8" y="14" width="40" height="28" rx="4" stroke={N} />
          <path d="M24 22.5v11l9.5-5.5L24 22.5Z" fill={A} fillOpacity="0.25" stroke={A} strokeLinejoin="round" />
          <g stroke={V} strokeOpacity="0.85">
            <path d="M14 47v-4" className="blink" />
            <path d="M19 47v-7" className="blink" />
            <path d="M24 47v-5" className="blink" />
            <path d="M29 47v-8" className="blink" />
            <path d="M34 47v-4" className="blink" />
            <path d="M39 47v-6" className="blink" />
          </g>
        </g>
      )}

      {icon === 'spark' && (
        <g strokeWidth="1.6" strokeLinejoin="round">
          <rect x="6" y="14" width="30" height="24" rx="3.5" stroke={N} />
          <path d="M6 20.5h30" stroke={N} strokeOpacity="0.5" />
          <path d="M11 30h12" stroke={N} strokeOpacity="0.55" className="flow" />
          <path d="M34 32l2.6 6.2L43 41l-6.4 2.8L34 50l-2.6-6.2L25 41l6.4-2.8L34 32Z" stroke={A} fill={A} fillOpacity="0.12" className="blink" />
          <path d="M45 18l1.6 3.6L50 23l-3.4 1.5L45 28l-1.6-3.5L40 23l3.4-1.4L45 18Z" stroke={V} fill={V} fillOpacity="0.15" className="blink" />
        </g>
      )}

      {icon === 'link' && (
        <g strokeWidth="1.6" strokeLinecap="round">
          <path
            d="M24 20l4-4a8 8 0 0 1 11.3 11.3l-4 4M32 36l-4 4A8 8 0 0 1 16.7 28.7l4-4"
            stroke={N}
          />
          <path d="M22 34l12-12" stroke={A} className="flow" />
          <circle cx="16" cy="14" r="2.2" fill={V} stroke="none" className="blink" />
          <circle cx="42" cy="46" r="2.2" fill={A} stroke="none" className="blink" />
        </g>
      )}
    </svg>
  )
}
