// src/global.d.ts

export {};

declare global {
  interface OrphaRow {
    Conditions: string;
    "ICD-10": string;
    "ICD-11": string;
  }
  interface OrphanettaRow {
    index:number;Conditions:string;Uniprot:string;Residue:string;Position:string;Mutated:string;Effects:string;PDB:string;"ICD-11":string;"ICD-10":string
  }
}
