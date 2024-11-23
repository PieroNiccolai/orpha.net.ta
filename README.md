Abbiamo due file excel. Uno contenente tutte le informazioni generali sulle malattie rare (Orphanet.csv), l’altro contenente tutte le informazioni riguardo il nostro lavoro (Orphanetta.csv)

L’utente inserisce in “Enter name of rare diseases” una malattia (aiutato da suggerimenti via via che scrive)
presence in Orphanet (Y/N)  Orphanet[‘Conditions’] se presente Y altrimenti N. Se Y allora appariranno anche l’ICD-11 (Se esiste) e l’ ICD-10.
disease code from ICD-11  Orphanet[ICD-11] 
disease code from ICD-10  Orphanet [ICD-10]

POI, PER OGNI GENE RIFERITO A QUELLA MALATTIA (Orphanetta[Genes]) appariranno:
UniProtKB ID (code)   Orphanetta[Uniprot]
PDB ID (code)  Orphanetta[PDB] : Se manca inserire la frase: “Structure predicted by AlphaFold.”
Mutations possibly inhibiting folding nucleus formation (list mutations)  mostrare le colonne Residue, Position, Mutated  concatenate con la condizione che Orphanetta[‘Effect’]==3
Mutations possibly creating new surface cavities (list mutations)  mostrare le colonne Residue, Position, Mutated  concatenate  con la condizione che Orphanetta[‘Effect’]==1 o Orphanetta[‘Effect’]==2
