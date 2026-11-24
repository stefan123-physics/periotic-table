import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Element } from '../data/elements';

interface PeriodicTableProps {
  elements: Element[];
}

const tableStructure = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 7, 8, 9, 10],
  [11, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
  [55, 56, 57, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
  [87, 88, 89, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118],
  null, // spacer between main table and f-block
  [0, 0, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 0, 0],
  [0, 0, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 0, 0],
];

const categoryColors: Record<string, string> = {
  'nonmetal': 'bg-blue-200 hover:bg-blue-300 dark:bg-blue-800 dark:hover:bg-blue-700',
  'noble gas': 'bg-purple-200 hover:bg-purple-300 dark:bg-purple-800 dark:hover:bg-purple-700',
  'alkali metal': 'bg-red-200 hover:bg-red-300 dark:bg-red-800 dark:hover:bg-red-700',
  'alkaline earth metal': 'bg-orange-200 hover:bg-orange-300 dark:bg-orange-800 dark:hover:bg-orange-700',
  'metalloid': 'bg-green-200 hover:bg-green-300 dark:bg-green-800 dark:hover:bg-green-700',
  'halogen': 'bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-800 dark:hover:bg-yellow-700',
  'transition metal': 'bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600',
  'post-transition metal': 'bg-indigo-200 hover:bg-indigo-300 dark:bg-indigo-800 dark:hover:bg-indigo-700',
  'lanthanide': 'bg-pink-200 hover:bg-pink-300 dark:bg-pink-800 dark:hover:bg-pink-700',
  'actinide': 'bg-rose-200 hover:bg-rose-300 dark:bg-rose-800 dark:hover:bg-rose-700',
};

const getCategoryColor = (category: string): string =>
  categoryColors[category] || 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600';

const tileBase =
  'flex flex-col items-center rounded-md border border-black/5 dark:border-white/10 shadow-sm transition-colors ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-white';

const PeriodicTable: React.FC<PeriodicTableProps> = ({ elements }) => {
  const navigate = useNavigate();
  const byNumber = new Map(elements.map((e) => [e.atomicNumber, e]));
  const open = (n: number) => navigate(`/element/${n}`);

  const legend = (
    <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-xs text-slate-700 dark:text-slate-300 mb-4">
      {Object.keys(categoryColors).map((cat) => (
        <li key={cat} className="flex items-center gap-1.5 capitalize">
          <span className={`inline-block h-3 w-3 rounded-sm ${getCategoryColor(cat)}`} />
          {cat}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="container mx-auto px-3 sm:px-4">
      {legend}

      {/* Phones: compact grid in atomic-number order */}
      <div className="grid grid-cols-4 min-[400px]:grid-cols-5 sm:grid-cols-6 gap-2 md:hidden">
        {elements.map((el) => (
          <button
            key={el.atomicNumber}
            type="button"
            onClick={() => open(el.atomicNumber)}
            className={`${tileBase} aspect-square justify-between py-1.5 px-1 ${getCategoryColor(el.properties.category)}`}
          >
            <span className="self-start pl-1 text-[10px] leading-none font-medium text-gray-700 dark:text-gray-300">
              {el.atomicNumber}
            </span>
            <span className="text-xl font-bold leading-none dark:text-white">{el.symbol}</span>
            <span className="w-full truncate text-center text-[10px] leading-tight font-semibold text-gray-800 dark:text-gray-200">
              {el.name}
            </span>
          </button>
        ))}
      </div>

      {/* Tablet & desktop: the full table, scaling with the viewport */}
      <div className="hidden md:grid grid-cols-18 gap-1">
        {tableStructure.map((row, rowIndex) => {
          if (row === null) {
            return <div key={`spacer-${rowIndex}`} className="col-span-18 h-3" />;
          }
          return (
            <React.Fragment key={`row-${rowIndex}`}>
              {row.map((n, colIndex) => {
                const el = n ? byNumber.get(n) : undefined;
                if (!el) {
                  return <div key={`empty-${rowIndex}-${colIndex}`} className="aspect-square" />;
                }
                return (
                  <button
                    key={el.atomicNumber}
                    type="button"
                    title={el.name}
                    onClick={() => open(el.atomicNumber)}
                    className={`${tileBase} aspect-square justify-center lg:justify-between lg:py-1 ${getCategoryColor(el.properties.category)}`}
                  >
                    <span className="text-[9px] lg:text-xs leading-none font-medium text-gray-700 dark:text-gray-300">
                      {el.atomicNumber}
                    </span>
                    <span className="text-sm lg:text-lg font-bold leading-tight dark:text-white">{el.symbol}</span>
                    <span className="hidden xl:block w-full truncate px-1 text-center text-[10px] leading-none font-semibold text-gray-800 dark:text-gray-200">
                      {el.name}
                    </span>
                  </button>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default PeriodicTable;
