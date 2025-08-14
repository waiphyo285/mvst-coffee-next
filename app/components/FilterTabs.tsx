interface FilterTabsProps {
  activeFilter: "all" | "espresso" | "arabica";
  onFilterChange: (filter: "all" | "espresso" | "arabica") => void;
}

export default function FilterTabs({
  activeFilter,
  onFilterChange,
}: FilterTabsProps) {
  const filters = [
    { key: "all" as const, label: "All" },
    { key: "espresso" as const, label: "Espresso" },
    { key: "arabica" as const, label: "Arabica" },
  ];

  return (
    <div className="flex justify-center mb-12">
      <div className="bg-gray-800 rounded-full p-1 flex">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeFilter === filter.key
                ? "bg-white text-black"
                : "text-white hover:bg-gray-700"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
