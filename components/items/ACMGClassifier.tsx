import { useState } from "react";
import { Checkbox } from "../ui/checkbox";

// Define valid keys for the selections state
type SelectionKeys =
  | "veryStrong"
  | "strong"
  | "moderate"
  | "supporting"
  | "benignStrong"
  | "benignSupporting";

// Kriteria ACMG dan kategori untuk Pathogenic dan Benign
const criteria = {
  pathogenic: {
    veryStrong: ["PVS1"],
    strong: ["PS1", "PS2", "PS3", "PS4"],
    moderate: ["PM1", "PM2", "PM3", "PM4", "PM5", "PM6"],
    supporting: ["PP1", "PP2", "PP3", "PP4", "PP5"],
  },
  benign: {
    standAlone: ["BA1"],
    strong: ["BS1", "BS2", "BS3", "BS4"],
    supporting: ["BP1", "BP2", "BP3", "BP4", "BP5", "BP6", "BP7"],
  },
};

// Fungsi untuk menghitung klasifikasi berdasarkan checklist yang dipilih
const classifyVariant = (selections: Record<SelectionKeys, number>) => {
  const {
    veryStrong,
    strong,
    moderate,
    supporting,
    benignStrong,
    benignSupporting,
  } = selections;

  if (veryStrong >= 1 && (strong >= 1 || moderate >= 2)) return "Pathogenic";
  if (strong >= 2) return "Pathogenic";
  if (strong >= 1 && moderate >= 3) return "Pathogenic";
  if (moderate >= 4) return "Pathogenic";
  if (moderate >= 3 && supporting >= 2) return "Pathogenic";
  if (veryStrong >= 1 && moderate >= 1) return "Likely Pathogenic";
  if (strong >= 1 && moderate >= 2) return "Likely Pathogenic";
  if (moderate >= 2 && supporting >= 2) return "Likely Pathogenic";
  if (benignStrong >= 1 && benignSupporting >= 1) return "Likely Benign";
  if (benignStrong >= 2) return "Benign";

  return "Uncertain Significance";
};

const ACMGClassifier = () => {
  const [selections, setSelections] = useState<Record<SelectionKeys, number>>({
    veryStrong: 0,
    strong: 0,
    moderate: 0,
    supporting: 0,
    benignStrong: 0,
    benignSupporting: 0,
  });

  // Menghitung klasifikasi berdasarkan checklist yang dipilih
  const classification = classifyVariant(selections);

  // Fungsi untuk mengubah jumlah checklist yang dipilih
  const handleChange = (key: SelectionKeys, checked: boolean) => {
    setSelections((prev) => ({
      ...prev,
      [key]: checked ? prev[key] + 1 : prev[key] - 1,
    }));
  };

  return (
    <div className="w-full flex-col gap-2">
      <h1 className="text-2xl font-bold mb-6">ACMG Variant Classification</h1>
      <div className="flex flex-col w-[1000px] bg-rose-50 rounded-sm border-solid border-2 border-purple-100 p-5 mb-5">
        <p className="font-sans font-bold mb-5 text-xl">Pathogenic Criteria</p>
        <div className="flex flex-row gap-2 items-baseline">
          <Checkbox value={"Halo"}></Checkbox>
          <p className="text-wrap items-baseline">
            PVS1 null variant (nonsense, frameshift, canonical ±1 or 2 splice
            sites, initiation codon, single or multiexon deletion) in a gene
            where LOF is a known mechanism of disease
          </p>
        </div>
      </div>

      <div className="flex flex-col w-[1000px]   bg-gray-100 rounded-sm border-solid border-2 border-purple-100 p-5">
        <p className="font-sans font-bold mb-5 text-xl">Pathogenic Criteria</p>
        <div className="flex flex-row gap-2 items-baseline">
          <Checkbox value={"Halo"}></Checkbox>
          <p className="text-wrap items-baseline">
            PS1 Same amino acid change as a previously established pathogenic
            variant regardless of nucleotide change
          </p>
        </div>
      </div>

      {/* Checklist untuk Pathogenic */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Pathogenic Criteria</h2>
        <div className="grid grid-cols-2 gap-4">
          {(
            Object.keys(criteria.pathogenic) as Array<
              keyof typeof criteria.pathogenic
            >
          ).map((category) => (
            <div
              key={category}
              className="bg-gray-100 p-4 rounded-md shadow-md"
            >
              <h3 className="font-semibold capitalize mb-2">{category}</h3>
              {criteria.pathogenic[category].map((item: string) => (
                <label key={item} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleChange(category as SelectionKeys, e.target.checked)
                    }
                    className="form-checkbox h-4 w-4 text-indigo-600"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Checklist untuk Benign */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Benign Criteria</h2>
        <div className="grid grid-cols-2 gap-4">
          {(
            Object.keys(criteria.benign) as Array<keyof typeof criteria.benign>
          ).map((category) => (
            <div
              key={category}
              className="bg-gray-100 p-4 rounded-md shadow-md"
            >
              <h3 className="font-semibold capitalize mb-2">{category}</h3>
              {criteria.benign[category].map((item: string) => (
                <label key={item} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleChange(category as SelectionKeys, e.target.checked)
                    }
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Hasil Klasifikasi */}
      <div className="p-4 bg-blue-100 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">
          Variant Classification Result
        </h2>
        <p className="text-lg">{classification}</p>
      </div>
    </div>
  );
};

export default ACMGClassifier;
