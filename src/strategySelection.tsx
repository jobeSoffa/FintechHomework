import React, { useState, KeyboardEvent } from "react";

export type Strategy = {
  id: string;
  name: string;
  tagline?: string;
  apy?: string; // display-friendly (e.g. "6.2%")
  riskLevel?: "Low" | "Medium" | "High";
  description?: string;
};

type Props = {
  strategies?: Strategy[];
  value?: string | null;
  onChange?: (id: string) => void;
  columns?: number; // grid columns
};

// Default demo strategies
const DEFAULT: Strategy[] = [
  {
    id: "income",
    name: "Income",
    tagline: "Stable yield",
    apy: "4.1%",
    riskLevel: "Low",
    description: "Conservative portfolio focused on recurring income and low volatility.",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Long-term upside",
    apy: "8.6%",
    riskLevel: "Medium",
    description: "Aggressive allocation to growth assets for higher long-term returns.",
  },
  {
    id: "opportunistic",
    name: "Opportunistic",
    tagline: "Active opportunities",
    apy: "12.4%",
    riskLevel: "High",
    description: "Tactical, opportunistic plays that target short-term alpha.",
  },
];

export default function StrategySelectionCard({
  strategies = DEFAULT,
  value = null,
  onChange,
  columns = 3,
}: Props) {
  const [selected, setSelected] = useState<string | null>(value ?? null);

  function handleSelect(id: string) {
    setSelected(id);
    onChange?.(id);
  }

  function onKey(e: KeyboardEvent<HTMLButtonElement>, id: string) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(id);
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Choose a strategy</h3>

      <div
        className={`grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns}`}
        role="list"
        aria-label="Strategy options"
      >
        {strategies.map((s) => {
          const isSelected = selected === s.id;
          return (
            <button
              key={s.id}
              role="listitem"
              aria-pressed={isSelected}
              className={`relative text-left rounded-2xl p-4 transition-shadow transition-transform transform border  
                ${isSelected ? "border-blue-500 shadow-lg scale-100" : "border-gray-200 hover:shadow-md hover:-translate-y-0.5"}
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 bg-white`}
              onClick={() => handleSelect(s.id)}
              onKeyDown={(e) => onKey(e, s.id)}
            >
              {/* Selected badge */}
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <h4 className="text-md font-medium">{s.name}</h4>
                        <span className="text-sm text-muted-foreground">{s.tagline}</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{s.description}</p>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-sm text-gray-500">Est. APY</span>
                      <span className={`text-lg font-semibold ${isSelected ? "text-blue-600" : "text-gray-800"}`}>
                        {s.apy}
                      </span>
                      <span
                        className={`mt-2 inline-flex items-center px-2 py-0.5 text-xs rounded-full font-medium 
                        ${s.riskLevel === "Low" ? "bg-green-100 text-green-800" : s.riskLevel === "Medium" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                      >
                        {s.riskLevel}
                      </span>
                    </div>
                  </div>

                  {/* subtle footer when selected */}
                  {isSelected && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-blue-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Selected</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Focus ring overlay (keeps rounded corners) */}
              <span className="sr-only">{isSelected ? `${s.name} selected` : `Choose ${s.name}`}</span>
            </button>
          );
        })}
      </div>

      {/* Example: show selected id */}
      <div className="mt-4 text-sm text-gray-600">
        {selected ? (
          <>
            Current selection: <span className="font-medium">{selected}</span>
          </>
        ) : (
          "No strategy selected"
        )}
      </div>
    </div>
  );
}
