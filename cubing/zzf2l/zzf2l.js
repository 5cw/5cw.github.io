
import { TwistyPlayer } from "https://cdn.cubing.net/v0/js/cubing/twisty";
import {
    ExperimentalCommonMetric,
    experimentalCountMetricMoves,
  } from "https://cdn.cubing.net/v0/js/cubing/notation";
const CASES = {
    FR: `(U) R U' R'	LAST SLOT CASES
R U2' R' U' R U R'	
(U') R U' R' U R U R'	
"R' D' R U' R' D R U R U' R'
R U R' U2 R U' R' U R U' R'
(U2) R U R' U R' D' R U' R' D R"	"(U') R' U R U' R U R' (BR free)
(U) L' U L U R U R' (FL free)"
"R U' R' U R U2 R' U R U R'
(U) R U' R' U' R U' R' U R U' R'
R U' R' U R' D' R U R' D R
(U2) R2 U2 R' U' R U' R2
(U2) R' U2 R U R' U R2 U R'"	"D R U' R2' U R D' (FL and BR free)
R U' R' D R' U R D' (BR free)"
"R' U2 R2 U R2 U R
R U' R' U R U' R' U2 R U' R'"	R' U2 R2 U R' (BR free)
(U') R U2 R' U2 R U' R'	
"R U' R' U2 R U R'
(U2) R U R' U R U' R'"	
"(U') R U R' U R U R'
(U2) R U' R' U' R U R' "	R' U R2 U R' (BR free)
(U') R U R' U2 R U' R'	
(U) R U2 R' U R U' R'	
R U R'	
"R' F' R U R U' R' F
(U') F' R U R' U' R' F R

"	Keyhole
R U' R' U R U' R'	
R U R' U' R U R'	
"(U) R U' R' U R U' R' U R U' R'
(U2) R2' U2 R2 U' R2 U' R2
R2 U R2 U R2 U2 R2"	
"(U) R' D' R U' R' D R
(U) R U R' U2 R U R'
(U') R' D' R U R' D R 
(U2) R' D' R U2 R' D R"	Keyhole
(U') R U' R' U2 R U' R'	Keyhole
R U' R' U' R U R' U2 R U' R'	"D R' U' R U R' U' R D' (BR free)
D' L' U' L U L' U' L D (FL free)"
"R U' R' U R U2 R' U R U' R'
R U R' U2 R U' R' U R U R'"	"D R' U R U' R' U R D' (BR free)
D' L' U L U' L' U L D (FL free)"
(U) L' U2 L U R U' R'	EDGE IN SLOT CASES
R2 u R2 u' R2	
(U') R' U R2 U' R' 	
(U') L' U' L R U' R'	
"(U') L U L' R U R' 
(U) L U2 L' U' R U R'"	
R' U' R2 U R'	
L F2 L' F2 	
(U) L U' L' R U' R'	
"R U' R' U R' U R2 U' R'
(U2) R U R2 U' R2 U R'"	
L' U L R U' R'	CORNER IN SLOT CASES
(U) L' U' L U R U' R' 	
"(U') L' U L U' R U R' 
"	
"R' D2 R U R' D2 R2 U' R' 
(U2) L U' L' U R U' R' U R U R'"	
"(U2) L U L' U R U R'
(U) L U2 L' R U R' "	
"(U2) L U' L' U' R U' R'
"	
"(U2) R' U R U2 R U' R'
R' U2 R U' R U R' "	
(U') R' U2 R2 U' R'	
(U) R' U R U R U R' 	
L' U' L D R U' R' D'	BOTH CORNER AND EDGE IN SLOT CASES
"L' U2 L R U' R' U R U' R'
R U L' U2 L R'"	
"L' U2 L R U R' U' R U R'
R U' L' U' L U' R'"	
R U L U' L' U' R'	
"R U' R' U L U' L' R U' R'
L U' L' U' R U' R' U R U' R'"	
R U' R u R2 u' R2	
R2 U' R2 U R2	
"R U2 R' U R' U R2 U' R'
R' U' R U R U' R' U R U' R'"	
R U' R' U' R' U R2 U' R'	
D R U R' D' R U' R'	
L' U L U'D' L' U L D	
"R U L' U' L R'
L' U' L U D' L' U' L D"	
L' U' L R U' R' U R U' R' U2 R U' R'	"L' U' L R' U2 R2 U R' (BR free)
L' U L2 U2 L' R U' R' (BL free)"
L' U L U R U R' U R U' R'	
"L' U L U' L' U' L U R U R' 
L' U L U R U' R' U' R U R'"	L' U L2 U L' U' R U R' (BL free)
L' U L2 U' L' R U' R'	
L U' L2 U' L U R U' R'	
"L U L2 U L U' R U R' 
"	
L' U' L R' U' R2 U R'	
L' U' L U' R' U R2 U' R'	
L' U L U2 R' U R2 U' R'	
D2 R U R' D2 R U' R'	
L2 D' L' U' L D L2 	
"R U2 L U' L' U2 R'
R U'D' R' U2 R U'D R'"	
L U2 F2 L' F2	
L U L2 U' L R U' R' 	
L U2 L2 U2 L U' R U R'	
"L R U2 R' L'
L U2 L' U R U' R'"	
L U L' R U' R' U R U R'	
L U' L' U' L U L' R U' R'	
L U' L' U2 R' U' R2 U R'	
L U' L' U R' U R2 U' R' 	
L U L' R' U R2 U' R'	
"D' R U R' D R U' R'
R' U' R D R' U R D'"	
"R' U D' R U R' D R
R' U R U' D R' U R D'"	
"R' U' R UD R' U' R D' 
R U' R2 U2 R2 U' R'"	
"R' U' R U L' U' L R U' R' 
"	
R' U R L' U' L R U' R'	
L' U L R' U' R2 U2 R'	
D L U L' U' D' R U2 R'	Edge is in BL.
L U' L' R' U R U R U R'	Edge is in BL.
L U L' R' U2 R2 U' R'	Edge is in BL.
R' U R2 U2 R' U2 R U' R'  	
R' U R U' R U R' U R U' R'	
R' U R2 U R' U R U R' 	`,
    FL: `(U') L' U L
(U2) L' U2 L"	LAST SLOT CASES
L' U' L	
(U) L' U' L U2 L' U L	
(U) L' U2 L U2 L' U L	
"(U) L' U' L U' L' U' L
(U2) L' U L U L' U' L"	"L U' L2 U' L - BL free
R U R' U' L' U' L - FR free"
"L U2 L2 U' L2 U' L'
L' U L U' L' U L U2 L' U L"	L U2 L2 U' L - BL free
(U) L' U L U' L' U' L	(U') R' U R U L' U' L - BR free
"L' U' L U2 L' U L U' L' U L
L' U2 L U' L' U' L U' L' U L
L D L' U L D' L' U' L' U L"	"(U') R U' R' U' L' U' L - FR free
(U) L U' L U L' U' L - BL free"
(U) L U' L' U L' U' L
L' U2 L U L' U' L	
(U') L' U2 L U' L' U L	"
"
"(U2) L' U' L U' L' U L
L' U L U2 L' U' L"	
"L' U L U' L' U2 L U' L' U' L
(U') L' U L U L' U L U' L' U L
(U2) L U2 L' U' L U' L2 U' L
(U2) L2 U2 L U L' U L2"	"L' U L D' L U' L' D - BL free
D' L' U L2 U' L' D - FR + BL free"
"r U r' U' r' F r F'
(U) F r' F' r U r U' r'
(U2) R' D' F2 D R2 U' R'"	Keyhole
L' U L U' L' U L	
L' U' L U L' U' L	
(U') L' U L U' L' U L U' L' U L	"D R U2 R' U R U' R' D' - FR free
(U2) R' U D R U' R' D' R - BR free
(U2) D R' U R2 U' R' D' - FR+BR free"
(U) L' U L U2 L' U L	Keyhole
"(U') L' U' L U2 L' U' L
R' D R U' R' D' R"	Keyhole
L' U L U L' U' L U2 L' U L	"D R U R' U' R U R' D' - FR free
D' L U L' U' L U L' D - BL free
R' D R U R' U' R U R' D' R - BR free"
"L' U' L U2 L' U L U' L' U' L
L' U L U' L' U2 L U' L' U L"	"D R U' R' U R U' R' D' - FR free
D' L U' L' U L U' L D' - BL free"
L U' L2' U L	EDGE IN SLOT CASES
L U L2 U' L	
"(U2) L' U' L2 U L2 U' L
L' U L U' L U' L2 U L"	
R' F2 R F2	
R U R' L' U L	
R U2 R' U' L' U L	
r2' U' F2 U r2 	
R' U R L' U L	
"R' U' R L' U' L
(U2) R' U2 R U L' U' L"	
R U' R' L' U L	CORNER IN SLOT CASES
R U' R' U L' U' L	
R U R' U' L' U L	
"L U' L' U2 L' U L
L U2 L' U L' U' L"	
L U' L' U' L' U' L	
L U2 L2 U L	
f R2 U' R' U R' f' 	
"R' U2 R L' U' L
(U') R' U' R U' L' U' L"	
"R' U R L' U2 L
R' U R U L' U L"	
"D' L' U' L D L' U L
R U' R' D R U R' D'
R U R' D R U' R' D"	BOTH CORNER AND EDGE IN SLOT CASES
"L' U' R U R' L
R U R' U' D R U R' D'"	
R U' R' U D R U' R' D' 	
D L' U' L D' L' U L	
"L U' L' U D' L U' L' D 
L U' D L' U' L D' L' "	
L' U L2 U2 L2 U L	
"R' U D R U R' D' R
D2 L' U' L D2 L' U L"	
"R' U' D R U2 R' D' R
R2' D R U R' D' R2"	
L' U2 R' U R U2 L	R' U R U D R U R' D' - FR free
"L U' L' U' R' F2 R F2
L R U R' L2' U L"	
L U' L' R U R' L' U L	
R U' R' L U2 L2 U L	
R' U2 F2 R F2'	
R' U2 R2 U2 R' U L' U' L	
R' U' R2 U R' L' U L	
"R u2 R' U2 R u2 R'
R U' R' D' L' U' L D"	
"R U2 R' L' U' L U L' U' L
L' U R U R' U L"	
"R U2 R' L' U L U' L' U L
L' U' R U2 R' L"	
L2 U L2 U' L2	
L' U' L U2 L U' L2 U L	
L' U L U L U' L2 U L	
R U R' L U L2 U' L	
"R U' R' U L U L2 U' L
R U2 R' L U' L2 U L "	
R U' R' U2 L U' L2 U L	
R' U R U2 L U L2 U' L 	
R' U' R L U' L2 U L	
R' U2 R L U L2 U' L	
"R U2 R2' U' R L' U' L
R U' R2' U R L' U L"	
R' U' R2 U' R' U L' U' L	
"R' U R2 U R' U' L' U L 
"	
"R' U2 R U' L U L
R' L' U2 L R"	
R' U' R L' U L U' L' U' L	
R' U R U R' U' R L' U L	
D' R' U' R U D L' U2 L	Edge is in BR
R' U' R L U L2 U2 L	Edge is in BR
"R' U R L U' L' U' L' U' L
L U' L' R' U' R L' U' L"	Edge is in BR
R2 D' F2 D R2	
R' U2' R L' U' L U L' U' L	
R' U2 R L' U L U' L' U L	
"R U' R' U R U R' U' L' U' L
R U' R' U' L' U L U L' U' L"	"R U' R2 U' R U L' U' L  - BR free
R U' R' U L U' L2 U' L - BL free"
"R U' R' U' L' U' L U' L' U L
R U R' U' R U' R' U' L' U' L"	
"R U R' L' U L U' L' U L U2 L' U L
R' U' R2 U' R2 U2 R L' U L"	"R U' R2 U2 R L' U L - BR free
R U R' L U2 L2 U' L - BL free"
L U' L2 U2 L U2 L' U L	
L U' L' U L' U' L U' L' U L	
"L U' L2 U' L U' L' U' L
L U' L' U' L U' L2 U' L"	`,
    BR: `(U') R' U R	LAST SLOT CASES
(U) R' U R U' R' U' R	(U') L' U L U R' U' R - FL free
R' U2 R U R' U' R	(U2) L' U2 L U' R' U' R - FL free
(U) R' U' R U R' U2 R	(U') L' U' L R' U R - FL free
R' U' R	
(U') R' U2 R U' R' U R	
(U) R' U2 R U R' U2 R	(U') L' U2 L R' U R - FL free
"(U) R' U' R U' R' U' R
(U2) R' U R U R' U' R"	"R U' R2 U' R - FR free
"
"(U2') R' U' R U' R' U R
R' U R U2 R' U' R"	
R U2 R2 U' R2 U' R'	R U2 R2 U' R - FR free
"R' U' R U2 R' U R U' R' U R
R D R' U R D' R' U' R' U R
(U2) R' U' R U R D R' U' R D' R'"	"R' U' L' U' L U2 R - FL free
(U) R U' R' U R' U' R - FR free
(U') L U' L' U' R' U' R - BL free"
"R U R' U R U2 R2 U2 R
(U) R U R' U R U2' R2' U R
(U2) R U2 R' U' R U' R2 U' R"	"R' U R D' R U' R' D - FR free
D' R' U R2 U' R' D - FR+BL free"
"(U') R U' S R2 S' R2 U R'
R' U R U R' U R U' R' U' R
(U) R' B' U' R U R' B R"	Keyhole
R' U' R U R' U' R	
R' U R U' R' U R 	
R' U' R U R' U' R U R' U' R 	Keyhole
(U) R' U R U R' U2 R	Keyhole
"(U') R' U' R U2 R' U' R
(U) R D R' U' R D' R'"	Keyhole
R' U' R U R' U2 R U R' U' R	"D' R U R' U' R U R' D - FR free
D L U L' U' L U L' D' - FL free"
"R' U R U' R' U2 R U' R' U R
R' U' R U2 R' U R U' R' U' R"	"D' R U' R' U R U' R' D - FR free
D L U' L' U L U' L' D' - FL free"
R U' R2' U R	EDGE IN SLOT CASES
"L' U L U' L' U L R' U2 R
(U') R2 D' F2 D R2"	
(U2) L U2 L' U' R' U R	
"(U') R U' R' U R U' R' U R' U' R
(U) R' U' R2 U R2' U' R "	
(U2) L' U L R' U R	
"(U') r' U2 r B2
(U') R' U2 L U2 L' R"	
(U') R U R2' U' R	
L' U' L R' U' R	
L U' L' R' U' R	
"(U2') R U' R' U R' U2 R
R U2 R' U R' U' R"	CORNER IN SLOT CASES
(U') R U' R' U' R' U' R	
"(U) R U R2 U2 R
(U) R U2 R2 U R"	
(U) L' U L U' L' U' L R' U' R	
"(U') L' U2 L R' U' R
(U2) L U' L U' R' U' R"
(U2) L' U' L U' R' U' R	
(U2) L' U L R' U2 R	
L U L' R' U' R	
(U') L U L' U' R' U R	
(U) L U' L' U R' U' R	
R2 U R2 U' R2	BOTH CORNER AND EDGE IN SLOT CASES
R' U R U R U' R2 U R	
R' U' R U2 R U' R2 U R	
R' U' L' U L U R	
"L' U2 L R' U' R U R' U' R
R' U R' D' F2 D R2"	
L' U2 L R' U R U' R' U R	
L U L' D' R' U R D	Edge is in BL slot.
"R' U L U L' U R
L U2 L' R' U' R U R' U' R "	Edge is in BL slot.
"R' U' L U2 L' R
L U2 L' R' U R U' R' U R"	Edge is in BL slot.
"D R' U' R D' R' U R
R U R' D' R U' R' D"	
"R U' D R' U' R D' R'
R U' R' U D' R U' R' D"	
"R' U R2 U R2 U2 R
R U R' U' D' R U R' D"	
R U' R2 U2 R U R' U2 R	
"R U' R' U' R U' R2 U' R 
R U' R2 U' R U' R' U' R"	
R U' R' U R' U' R U' R' U R 	
"D' L' U' L U D R' U2 R
L' U' L U R U' R' U2 R' U R"	
"L' U L R U' R' U' R' U' R
R U' R' L' U' L R' U' R"	
L' U' L R U R2 U2 R	
L U' L' R U R2 U2 R 	
"L U L' R U' R' U' R' U' R
R U' R' L U' L' R' U' R"	
R U R' U' L U' L' R' U' R	
"L' U L D2 L' U' L D2
D2 R' U R D2 R' U' R"	
"f R2' U' R2 U f'
L' U' L U D2 L' U' L D2"	
R' U2 L' U L U2 R	
L' U L U2' R U R2' U' R	
L' U L U' R U' R2 U R	
L' U' L R U' R2 U R	
"R' L' U2 L R
L' U2 L U' R' U R"	
L' U' L R' U R U' R' U' R	
L' U L U L' U' L R' U R 	
L' U L U' L U' L' R' U' R	
"L' U' L2 U L' R' U R
L U L2 U2 L R' U' R"	
L U L' U' L' U L R' U2 R 	
D' R' U' R D R' U R	Edge is in BR slot.
"R' U' L U L' R
L U L' U' D L U L' D'"	Edge is in BR slot.
L U' L' U D L U' L' D'	Edge is in BR slot.
L U L' R U R2' U' R	
L U' L' U2 R U' R2 U R	
L U L' U R U' R2 U R	
L U' L2 U L R' U R	
L U L' U' L' U L R' U R	
L' U' L2 U' L' U R' U' R 	
"L' U' L2 U' L2 U2 L R' U R
L U L' R U2 R2' U' R2 U' R' "	L U' L2 U2 L R' U R - FL free
L U' L' U' R' U' R U' R' U R	L U' L' U' L' U L R' U' R - FL free
"L U' L' U' R' U R U R' U' R
L U' L' U L U L' U' R' U' R "	"L U' L2 U' L U R' U' R - FL free 
L U' L' U R U' R2 U' R - FR free"`,
    BL: `"(U) L U' L'
(U2) L U2 L'"	LAST SLOT CASES
L U2 L' U' L U L'	(U2) R U2 R' U L U L' - FR free
(U') L U' L' U L U L'	(U) R U' R' U' L U L' - FR free
"L U L' U2 L U' L' U L U' L'
(U2) R U2 R' U' R U' R' L U L'"	"L U R U R' U2 L' - FR free
(U') L' U L U' L U L' - FL free
(U) R' U R U L U L' - BR free"
"L' U' L U' L' U2 L2 U2 L'
(U') L' U' L U' L' U2 L2 U' L'
(U2) L' U2 L U L' U L2 U L' "	"L U' L' D L' U L D' - FL free
D L U' L2 U L D' - FL+BR free"
L' U2 L2 U L2 U L	L' U2 L2 U L' - FL free
(U') L U2 L' U' L U2 L'	(U) R U2 R' L U' L' - BL free
"(U2) L U L' U L U' L'
L U' L' U2 L U L'"	(U2) R U' R' L U L' - FR free
"(U') L U L' U L U L'
(U2) L U' L' U' L U L'"	L' U L2 U L' - FL free
(U') L U L' U2 L U' L'	(U) R U R' L U' L' - BR free
(U) L U2 L' U L U' L'	
L U L'	
"(U) L' U S' L2 S L2 U' L
L U' L' U' L U' L' U L U L'
(U') L B U L' U' L B' L' "	Keyhole
L U' L' U L U' L'	 
L U L' U' L U L'	
"L U L' U' L U L' U' L U L'
(U2) R U R D' R' U' R D R2"	"Use keyhole
(U2) R U' D' R' U R D R' - FR free "
(U') L U' L' U' L U2 L'	Keyhole
"(U) L U L' U2 L U L'
(U2) R D' R' U' R D R'"	Keyhole
L U L' U' L U2 L' U' L U L'	"D L' U' L U L' U' L D' - FL free
D' R' U' R U R' U' R D - BR free"
"L U' L' U L U2 L' U L U' L'
L U L' U2 L U' L' U L U L'"	"D L' U L U' L U' L' D' (typo) - FL free
D L' U L U' L' U L D'
D' R' U R U' R U' R' D - BR free
L U R U' R' U R U' R' L' - FR free"
(U') R' U2 R U L U' L'	EDGE IN SLOT CASES
(U) R U' R' U R U' R' L U2 L' 	
(U) L' U L2' U' L'	
(U) R' U R L U L' 	
(U) R U R' L U L'	
(U2) L' U' L2' U L'	
"(U2) l U2 R' U2 (x)
(U2) L U2 R' U2 R L'"	
(U') R U' R' L U' L'	
"L U L2 U' L2 U L'
(U2) L' U L U' L' U L U' L U L'"	
R' U' R L U L'	CORNER IN SLOT CASES
(U) R' U' R U L U' L'	
(U') R' U R U' L U L'	
(U') R U' R' U R U R' L U L'	
(U2) R U' R' L U2 L'	
"(U) R U2 R' L U L'
(U2) R U R' U L U L'"	
"L' U2 L U' L U L'  
(U2) L' U L U' L U2 L'"	
"(U') L' U' L2 U2 L'
(U') L' U2 L2 U' L'  "	
(U) L' U L U L U L' 	
R' U' R D L U' L' D'	BOTH CORNER AND EDGE IN SLOT CASES
"L U R' U R U L'
R' U2 R L U' L' U L U' L'"	
"R' U2 R L U L' U' L U L'
L U' R' U' R U' L'  "	
"R U2 R' L U' L' U L U' L' 
L U' L' U R U' R' L U' L'"	
R U2 R' L U L' U' L U L' 	
L U R U' R' U' L' 	
L2' U' L2 U L2 	
L U L' U2 L' U L2 U' L' 	
L U' L' U' L' U L2 U' L'	
L' U L2 U2 L' U' L U2 L' 	
L' U L U' L U L' U L U' L'	
L' U L U L' U L2 U L'	"R' U R2 U2 R' L U' L' - FR free
R' U' R L' U2 L2 U L' - FL free "
"R' U' R L' U2 L2 U L2 U L
R U R2 U R2 U2 R' L U' L'  "	
R' U R U L U L' U L U' L' 	"R' U R2 U R' U' L U L' - FR free 
R' U R U' L' U L2 U L' - FL free"
R' U R U' R' U' R U L U L' 	
"L R U2 R' L' 
R U2 R' U L U' L'"	
R U' R' U' R U R' L U' L'	
R U R' L U' L' U L U L'	
L U2 R U' R' U2 L'	
R2 D' R' U' R D R2	
"R U' R' D2 R U R' D2
D2 L U L' D2 L U' L'"	
R U R' L' U L2 U' L' 	
R U' R' U L' U L2 U' L' 	
R U' R' U2 L' U' L2 U L' 	
"R U2 R2 U2 R U' L U L' 
R' U R U' R U' R' L U2 L'"	
R U R2' U R L U L' 	
R U' R' U R' U R L U L' 	
"L' U L U' D L' U L D'
L' U D' L U L' D L"	
L U' L2 U2 L2 U' L'	
"L' U' L D L' U L D' 
D' L U L' D L U' L'"	
R' U' R U' L' U L2 U' L' 	
R' U' R L' U' L2 U L'	
R' U R U2 L' U L2 U' L' 	
R U R2' U R U' L U L'	
R U' R2 U' R U L U' L' 	
R' U R2 U' R' L U' L'	
R U R' L' U' L2 U2 L'	
R U' R' L' U L U L U L'	
D R U R' U' D' L U2 L' 	
L' U' L U R' U R L U L'	
R' U R L' U2 L2 U' L' 	
R' U' R L' U L U L U L'	
R' U' R D' R' U R D 	
R' U R U' D' R' U R D	
"L U R' U' R L' 
R' U' R U D' R' U' R D"	`
}


/*
const player = new TwistyPlayer({alg: "R" , experimentalSetupAnchor: 'end', experimentalSetupAlg: 'x2'})
0: URF, WRG
1: URB, WRB
2: ULB, WOB
3: ULF, WOG
4: DRF, YRG
5: DLF, YOG
6: DLB, YOB
7: DRB, YRB

0: UF, WG
1: UR, WR
2: UB, WB
3: UL, WO
4: DF, YG
5: DR, YR
6: DB, YB
7: DL, YO
8: FR, GR
9: FL, GO
10: BR, BR
11: BL, BO
*/
let twisty = document.querySelector('twisty-player')
const FLIPC = [
    [3, 1],
    [2, 0],
    [1, 3],
    [0, 2],
    [5, 7],
    [4, 6],
    [7, 5],
    [6, 4]
]

const FLIPE = [
    [0, 2],
    [3, 1],
    [2, 0],
    [1, 3],
    [4, 6],
    [7, 5],
    [6, 4],
    [5, 7],
    [9, 10],
    [8, 11],
    [11, 8],
    [10, 9]
]

const LOOKUP = {
    FR: [4, 8],
    FL: [5, 9],
    BL: [6, 11],
    BR: [7, 10]
}

const POSNAMES = {
'C4': 'FR corner', 
'C5': 'FL corner', 
'C6': 'BL corner',
'C7': 'BR corner', 

"E8": "FR edge",
"E9": "FL edge",
"E10": "BR edge",
"E11": "BL edge",

"C4E8": 'FR slot',
"C5E9": 'FL slot',
"C6E11": 'BL slot',
"C7E10": 'BR slot'

}

let processed = {
    FL: {},
    FR: {},
    BL: {},
    BR: {}
}


const options = [
    'x2',
    'x2 y',
    "x2 y'",
    "x2 y2",
    "default",
    "y",
    "y'",
    "y2"
]
let dropdown = document.getElementById('orientation-dropdown')
for (const option of options) {
    let o = document.createElement('option')
    o.value = option
    o.textContent = option
    dropdown.append(o)
}


let cornerP
let edgeP

async function changeOrientation() {
    const player = new TwistyPlayer({experimentalSetupAlg: dropdown.value, background: null });
    const data = (await player.experimentalModel.currentPattern.get()).patternData;
    cornerP = data.CORNERS.pieces
    edgeP = data.EDGES.pieces
    twisty.replaceWith(player)
    twisty = player
}
dropdown.addEventListener('input', changeOrientation)

changeOrientation()
let nameEl = document.getElementById('algname')
const D8 = "DDDDDDDD";
const D12 = "DDDDIIIIDDDD"


async function changeAlg(e) {
    
    let cmask = [..."DDDDDDDD"]
    let emask = [..."DDDDDDDDDDDD"]
    for (let i = 0; i < 4; i++) {
        cmask[cornerP[i]] = "I"
        emask[edgeP[i]] = "I"
    }
    for (const el of document.querySelectorAll('tr.selected, th.selected')) {
        el.classList.remove('selected')
    }
    
    for (const cls of this.classList) {
        const m = cls.match(/X?(H)?([EC])(\d+)/)
        if (m){
            const highlight = m[1] == 'H' ? '-' : 'I'
            const idx = parseInt(m[3])
            if (m[2] == 'C') {
                cmask[cornerP[idx]] = highlight
            } else {
                emask[edgeP[idx]] = highlight
            }
        } else {
            document.getElementById(cls).classList.add('selected')
        }
    }
    this.classList.add('selected')
    const mask = "EDGES:" + emask.join('') + ",CORNERS:" + cmask.join('') + ",CENTERS:DDDDDD"
    const algName = this.childNodes[0].textContent
    //console.log(mask, this)
    const player = new TwistyPlayer({alg:  algName, 
        experimentalSetupAnchor: 'end',
         experimentalSetupAlg: dropdown.value, 
         experimentalStickeringMaskOrbits: mask,
         experimentalMovePressInput: 'auto',
         background: null })
    let newNameEl = document.createElement('twisty-alg-editor')
    newNameEl.id = 'algname'
    nameEl.replaceWith(newNameEl)
    nameEl = newNameEl
    nameEl.twistyPlayer = player
    twisty.replaceWith(player)
    twisty = player

}

async function changePlacement(e) {
    for (const sel of document.querySelectorAll('.placeselector')) {
        if (sel.id != e.target.id) {
            sel.classList.remove('selected')
        } else {
            sel.classList.add('selected')
        }
    }
    for (const list of document.querySelectorAll('.algList')) {
        if (list.id.split('-')[1] != e.target.id.split('-')[1]) {
            list.classList.remove('selected')
        } else {
            list.classList.add('selected')
        }
    }
}

async function addAlg(name, cleanAlg) {
    const player = new TwistyPlayer({alg: cleanAlg , experimentalSetupAnchor: 'end', background: null
    })
    const patternData = (await player.experimentalModel.currentPattern.get()).patternData
   
    //console.log(patternData)
    const [cn, en] = LOOKUP[name] 
    let cornerIndex = patternData.CORNERS.pieces.indexOf(cn)
    let cornerOrientation = patternData.CORNERS.orientation[cornerIndex]
    let edgeIndex = patternData.EDGES.pieces.indexOf(en)

    //console.log(patternData.EDGES.orientation.filter(x => x != 0).length)
    let freeLabels = []
    for (const [str, [ci, ei]] of Object.entries(LOOKUP)) {
        let label = ''
        if (str == name) continue;
        if (patternData.CORNERS.pieces[ci] != ci) {
            label += 'C' + ci
        }
        if (patternData.EDGES.pieces[ei] != ei) {
            label += 'E' + ei
        }
        if (label){
            freeLabels.push((ci == cornerIndex || ei == edgeIndex ? 'X' : '') + label)
        }
    }

    /*
    connected correctly: A
    connected incorrectly: B
    split correctly: M
    split incorrectly: N
    edge in slot: E
    corner in slot: C
    both in slot: D
    correct slot: s or omit
    opposite front-back: v
    opposite left-right: h
    opposite diagonal: x
    bottom facing out: w
    side facing out: o
    front/back facing out: f
    */
    if (name == 'FL' || name == 'BL') {
        cornerIndex = FLIPC[cornerIndex][0]
        edgeIndex = FLIPE[edgeIndex][0]
        cornerOrientation = (3 - cornerOrientation) % 3
    }
    if (name == 'BL' || name == 'BR') {
        cornerIndex = FLIPC[cornerIndex][1]
        edgeIndex = FLIPE[edgeIndex][1]
        cornerOrientation = (3 - cornerOrientation) % 3
    }

    if (cornerIndex >= 4) {
        cornerOrientation = (((cornerIndex == 5 || cornerIndex == 7) ? 1 : 2) + cornerOrientation) % 3
    }
    const cornerLetter = 'wof'[cornerOrientation]

    let case_name
    if (cornerIndex < 4 && edgeIndex < 4) {
        case_name = "BAMNMBANMNBAANMB"[cornerIndex * 4 + edgeIndex] + cornerLetter
    } else {
        
        const cpos = '    shxv'[cornerIndex]
        const epos = '        shvx'[edgeIndex]
        if (cornerIndex < 4) {
            if (epos == ' ')
                case_name = 'typo';
            else
                case_name = 'E' + (epos == 's' ? '' : epos) + cornerLetter;
        } else if (edgeIndex < 4) {
            if (cpos == ' ')
                case_name = 'typo';
            else
                case_name = 'C' + (cpos == 's' ? '' : cpos) + cornerLetter
        } else {
            case_name = 'D' + (epos == 's' && cpos == 's' ? '' : epos == cpos ? epos : epos + cpos) + cornerLetter
        }
        for (let i = 4; i < 8; i++) {
            if (patternData.EDGES.pieces[i] != i) {
                case_name = 'typo'
            }
        }
    }   
    if (!(case_name in processed[name])) {
        processed[name][case_name] = {}
    }

    processed[name][case_name][cleanAlg] = freeLabels
    return case_name
}



const FLIPV = {
    'F': 'B',
    'B': 'F',
    'f': 'b',
    'b': 'f',
    'z': 'fixed',
    'S': 'fixed',
}

const FLIPH = {
    'L': 'R',
    'R': 'L',
    'l': 'r',
    'r': 'l',
    'x': 'fixed',
    'M': 'fixed'
}


function flipAlg(alg, v) {
    const flip = v ? FLIPV : FLIPH
    return alg.split(' ').filter(s => s).map(s => {
        
        const m = s.match(/([A-Za-z])((2?)'?)/)
        if(!s) {
            console.log(alg, s)
            return ''
        }
        const flipped = flip[m[1]]
        return ((flipped == 'fixed' ? undefined : flipped) || m[1]) + m[3] + ((flipped == 'fixed') ? (m[2] == "'" ? "'" : '') : (m[2] ? '' : "'"))
    }).join(' ')
}


async function setup() {
    //const alg = new Alg("R U R' U R U2' R'");
    //const s = "EDGES:DDDDDDDDDDDD,CORNERS:DDDDDDDD,CENTERS:DDDDDD"
    
    for (const [name, algstr] of Object.entries(CASES)) {
        const algs = algstr.split(/"*[\t\n]"*/).filter(alg => alg && !alg.match('CASES|Keyhole|keyhole|Edge|typo'))
        //console.log(algs.length)
        
        for (const alg of algs) {
            
            const match = alg.match(/(.*) (\((.+) free\))/)
            let cleanAlg = match ? match[1] : alg.split('-')[0]
            cleanAlg = cleanAlg.replaceAll(/([A-Za-z]2?'?)([A-Za-z])/g, '$1 $2')
            cleanAlg = cleanAlg.replaceAll("2'", "2")
            cleanAlg = cleanAlg.replaceAll(/[\(\)"]/g, '').trim()
            if (!cleanAlg) {
                continue;
            }
            const case_name = await addAlg(name, cleanAlg)
            if (case_name == 'typo') {
                continue
            }
            const fv = name[0] == 'F' ? 'B' : 'F'
            const fh = name[1] == 'R' ? 'L' : 'R'
            const ah = flipAlg(cleanAlg, false)
            const av = flipAlg(cleanAlg, true)
            const ax = flipAlg(ah, true)
            const check = "D R' U R U' R U' R' D'"
            if (ah == check || av == check || ax == check) {
                console.log(cleanAlg, alg, name)
            }
            await addAlg(name[0] + fh, ah)
            await addAlg(fv + name[1], av)
            await addAlg(fv + fh, ax)
            //console.log(cleanAlg)
            
            //console.log(match)
            
           
        }
    }
    let notationEl = document.getElementById('notation')
    const explanation = `connected correctly: A
connected incorrectly: B
split correctly: M
split incorrectly: N
edge in slot: E
corner in slot: C
both in slot: D
correct slot: s or omit
opposite front-back: v
opposite left-right: h
opposite diagonal: x
bottom facing out: w
side facing out: o
front/back facing out: f`
    for (const line of explanation.split('\n')) {
        let pel = document.createElement('p')
        pel.textContent = line
        notationEl.append(pel)
    }

    let placementEl = document.getElementById('placement')
    let algsEl = document.getElementById('algs')
    for (const [name, algs] of Object.entries(processed)){
        const [ci, ei] = LOOKUP[name]
        const highlight = ['HC' + ci, 'HE' + ei]
        let pspan = document.createElement('span')
        pspan.id = 'tab-' + name
        pspan.classList.add('placeselector')
        pspan.textContent = name
        pspan.addEventListener('click', changePlacement)
        placementEl.append(pspan)
        let plist = document.createElement('table')
        plist.id = 'list-' + name
        plist.classList.add('algList')
        algsEl.append(plist)
        let header = document.createElement('tr')
        let alg_text = document.createElement('th')
        let free_text = document.createElement('th')
        alg_text.textContent = 'Algorithm'
        free_text.textContent = 'Required Free'
        header.append(alg_text, free_text)
        plist.append(header)
        for (const [case_name, sub_algs] of Object.entries(algs)) {
            let caseRow = document.createElement('tr')
            let caseEl = document.createElement('th')
            caseEl.textContent = case_name
            caseEl.id = 'case-' + case_name
            caseEl.colSpan = 2
            caseRow.append(caseEl)
            plist.append(caseRow)
            for (const [algname, freelist] of Object.entries(sub_algs)) {
                let algRow = document.createElement('tr')
                let algName = document.createElement('td')
                algName.textContent = algname
                let algFree = document.createElement('td')
                algFree.textContent = freelist.map(pos => POSNAMES[pos]).filter(name => (typeof name !== 'undefined' && name != null)).join(', ')
                for (const free of freelist) {
                    algRow.classList.add(...free.matchAll(/[EC]\d+/g).map(m => m[0]))
                }
                algRow.classList.add(...highlight)
                algRow.classList.add('case-' + case_name)
                algRow.append(algName, algFree)
                algRow.addEventListener('click', changeAlg)
                plist.append(algRow)
            }
        }
        if (name == 'FR') {
            pspan.click()
        } 
    }
    //console.log(JSON.stringify(processed, null, ' '))
    
    //const player = new TwistyPlayer({alg: "R'" , experimentalSetupAnchor: 'end', experimentalSetupAlg: 'x2 y', background: null })
    //document.body.append(player)
    
    //console.log((await player.experimentalModel.currentPattern.get()).patternData)
    //await player.jumpToEnd()
    //console.log(await player.experimentalModel.currentPattern.get())
    //await player.jumpToStart()
}


setup()