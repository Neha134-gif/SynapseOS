export default function SynapseIcon({
  className = "h-10 w-10",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-[13px] bg-gradient-to-br from-[#6d63ff] via-[#635bff] to-[#8b5cf6] shadow-[0_7px_22px_rgba(99,91,255,0.28)] ${className}`}
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[70%] w-[70%]"
      >
        {/* Outer neural orbit */}
        <path
          d="M20 5.5C27.8 5.5 34.5 11.9 34.5 20C34.5 28.1 27.8 34.5 20 34.5C12.2 34.5 5.5 28.1 5.5 20C5.5 11.9 12.2 5.5 20 5.5Z"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.35"
        />

        {/* Synapse connections */}
        <path
          d="M20 20L12 12M20 20L28 12M20 20L12 28M20 20L28 28"
          stroke="white"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeOpacity="0.9"
        />

        {/* Horizontal + vertical connections */}
        <path
          d="M20 7.5V14M20 26V32.5M7.5 20H14M26 20H32.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.75"
        />

        {/* Outer nodes */}
        <circle cx="11" cy="11" r="2.4" fill="white" />
        <circle cx="29" cy="11" r="2.4" fill="white" />
        <circle cx="11" cy="29" r="2.4" fill="white" />
        <circle cx="29" cy="29" r="2.4" fill="white" />

        {/* Cardinal nodes */}
        <circle cx="20" cy="7" r="1.9" fill="white" />
        <circle cx="20" cy="33" r="1.9" fill="white" />
        <circle cx="7" cy="20" r="1.9" fill="white" />
        <circle cx="33" cy="20" r="1.9" fill="white" />

        {/* Center */}
        <circle cx="20" cy="20" r="5" fill="white" />
        <circle cx="20" cy="20" r="2.2" fill="#635BFF" />
      </svg>
    </div>
  );
}