/* Gegenereerd uit index.html door tools/export_engine.py - niet handmatig wijzigen. */
/* Rekenkern Argenta hypotheek: geen schermcode. tools/export_engine.py schrijft dit blok naar argenta-engine.js. */
const ArgentaEngine = (() => {
/* Tarieven: bijwerken met tools/update_rates.py. Leennormen: bijwerken met tools/update_normen.py. */
const RATES = /*RATES_START*/{"datumVast":"28 oktober 2026","klassen":[50,60,70,80,85,90,95,100,106],"annuitair":{"1":[4.13,4.28,4.3,4.34,4.34,4.36,4.36,4.41,4.42,4.77,4.88],"2":[4.14,4.29,4.31,4.35,4.35,4.37,4.37,4.42,4.43,4.78,4.89],"3":[4.19,4.34,4.36,4.4,4.4,4.42,4.42,4.47,4.48,4.83,4.94],"4":[4.23,4.38,4.4,4.44,4.44,4.46,4.46,4.51,4.52,4.87,4.98],"5":[4.24,4.39,4.41,4.45,4.45,4.47,4.47,4.52,4.53,4.88,4.99],"6":[4.29,4.44,4.46,4.5,4.5,4.52,4.52,4.57,4.58,4.93,5.04],"7":[4.29,4.44,4.46,4.5,4.5,4.52,4.52,4.57,4.58,4.93,5.04],"8":[4.3,4.45,4.47,4.51,4.51,4.53,4.53,4.58,4.59,4.94,5.05],"9":[4.3,4.45,4.47,4.51,4.51,4.53,4.53,4.58,4.59,4.94,5.05],"10":[4.34,4.49,4.51,4.55,4.55,4.57,4.57,4.62,4.63,4.98,5.09],"11":[4.34,4.49,4.51,4.55,4.55,4.57,4.57,4.62,4.63,4.98,5.09],"12":[4.34,4.49,4.51,4.55,4.55,4.57,4.57,4.62,4.63,4.98,5.09],"13":[4.53,4.68,4.7,4.74,4.74,4.76,4.76,4.81,4.82,5.17,5.28],"14":[4.53,4.68,4.7,4.74,4.74,4.76,4.76,4.81,4.82,5.17,5.28],"15":[4.53,4.68,4.7,4.74,4.74,4.76,4.76,4.81,4.82,5.17,5.28],"16":[4.55,4.7,4.72,4.76,4.76,4.78,4.78,4.83,4.84,5.19,5.3],"17":[4.55,4.7,4.72,4.76,4.76,4.78,4.78,4.83,4.84,5.19,5.3],"18":[4.56,4.71,4.73,4.77,4.77,4.79,4.79,4.84,4.85,5.2,5.31],"19":[4.56,4.71,4.73,4.77,4.77,4.79,4.79,4.84,4.85,5.2,5.31],"20":[4.56,4.71,4.73,4.77,4.77,4.79,4.79,4.84,4.85,5.2,5.31],"21":[4.56,4.71,4.73,4.77,4.77,4.79,4.79,4.84,4.85,5.2,5.31],"22":[4.56,4.71,4.73,4.77,4.77,4.79,4.79,4.84,4.85,5.2,5.31],"23":[4.56,4.71,4.73,4.77,4.77,4.79,4.79,4.84,4.85,5.2,5.31],"24":[4.56,4.71,4.73,4.77,4.77,4.79,4.79,4.84,4.85,5.2,5.31],"25":[4.57,4.72,4.74,4.78,4.78,4.8,4.8,4.85,4.86,5.21,5.32],"26":[4.58,4.73,4.75,4.79,4.79,4.81,4.81,4.86,4.87,5.22,5.33],"27":[4.58,4.73,4.75,4.79,4.79,4.81,4.81,4.86,4.87,5.22,5.33],"28":[4.58,4.73,4.75,4.79,4.79,4.81,4.81,4.86,4.87,5.22,5.33],"29":[4.58,4.73,4.75,4.79,4.79,4.81,4.81,4.86,4.87,5.22,5.33],"30":[4.58,4.73,4.75,4.79,4.79,4.81,4.81,4.86,4.87,5.22,5.33]},"aflossingsvrij":{"1":[4.63,4.78,4.8,4.84,4.89,4.95,4.98,5.54,5.54,5.64,5.69],"2":[4.64,4.79,4.81,4.85,4.9,4.96,4.99,5.55,5.55,5.65,5.7],"3":[4.69,4.84,4.86,4.9,4.95,5.01,5.04,5.6,5.6,5.7,5.75],"4":[4.73,4.88,4.9,4.94,4.99,5.05,5.08,5.64,5.64,5.74,5.79],"5":[4.74,4.89,4.91,4.95,5.0,5.06,5.09,5.65,5.65,5.75,5.8],"6":[4.79,4.94,4.96,5.0,5.05,5.11,5.14,5.7,5.7,5.8,5.85],"7":[4.79,4.94,4.96,5.0,5.05,5.11,5.14,5.7,5.7,5.8,5.85],"8":[4.8,4.95,4.97,5.01,5.06,5.12,5.15,5.71,5.71,5.81,5.86],"9":[4.8,4.95,4.97,5.01,5.06,5.12,5.15,5.71,5.71,5.81,5.86],"10":[4.84,4.99,5.01,5.05,5.1,5.16,5.19,5.75,5.75,5.85,5.9],"11":[4.84,4.99,5.01,5.05,5.1,5.16,5.19,5.75,5.75,5.85,5.9],"12":[4.84,4.99,5.01,5.05,5.1,5.16,5.19,5.75,5.75,5.85,5.9],"13":[5.03,5.18,5.2,5.24,5.29,5.35,5.38,5.94,5.94,6.04,6.09],"14":[5.03,5.18,5.2,5.24,5.29,5.35,5.38,5.94,5.94,6.04,6.09],"15":[5.03,5.18,5.2,5.24,5.29,5.35,5.38,5.94,5.94,6.04,6.09],"16":[5.05,5.2,5.22,5.26,5.31,5.37,5.4,5.96,5.96,6.06,6.11],"17":[5.05,5.2,5.22,5.26,5.31,5.37,5.4,5.96,5.96,6.06,6.11],"18":[5.06,5.21,5.23,5.27,5.32,5.38,5.41,5.97,5.97,6.07,6.12],"19":[5.06,5.21,5.23,5.27,5.32,5.38,5.41,5.97,5.97,6.07,6.12],"20":[5.06,5.21,5.23,5.27,5.32,5.38,5.41,5.97,5.97,6.07,6.12],"21":[5.06,5.21,5.23,5.27,5.32,5.38,5.41,5.97,5.97,6.07,6.12],"22":[5.06,5.21,5.23,5.27,5.32,5.38,5.41,5.97,5.97,6.07,6.12],"23":[5.06,5.21,5.23,5.27,5.32,5.38,5.41,5.97,5.97,6.07,6.12],"24":[5.06,5.21,5.23,5.27,5.32,5.38,5.41,5.97,5.97,6.07,6.12],"25":[5.07,5.22,5.24,5.28,5.33,5.39,5.42,5.98,5.98,6.08,6.13],"26":[5.08,5.23,5.25,5.29,5.34,5.4,5.43,5.99,5.99,6.09,6.14],"27":[5.08,5.23,5.25,5.29,5.34,5.4,5.43,5.99,5.99,6.09,6.14],"28":[5.08,5.23,5.25,5.29,5.34,5.4,5.43,5.99,5.99,6.09,6.14],"29":[5.08,5.23,5.25,5.29,5.34,5.4,5.43,5.99,5.99,6.09,6.14],"30":[5.08,5.23,5.25,5.29,5.34,5.4,5.43,5.99,5.99,6.09,6.14]},"groen":{"5":[3.74,3.95],"10":[3.84,4.05],"15":[4.03,4.24],"20":[4.06,4.27],"25":[4.07,4.28],"30":[4.08,4.29]},"consumptiefOpslag":0.05,"korting":{"A":0.1,"B":0.05,"C":0},"overbrugging":4.92,"datumVariabel":"9 november 2026","variabel":[4.87,4.82,4.82,4.82,5.07,5.07,5.37,5.37,5.37,5.37,5.57]}/*RATES_END*/;
const NORMEN = /*NORMEN_START*/{"jaar":2027,"grenzen":[1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5],"start":31000,"nietAOW":[[168,178,188,198,207,215,223,229,236,241,246,250],[174,186,197,207,216,225,234,241,248,254,259,264],[178,190,201,211,221,231,241,250,258,264,270,276],[180,190,201,211,221,231,241,250,259,268,278,286],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,190,201,211,221,231,241,250,259,268,278,287],[180,191,201,211,221,231,241,250,259,268,278,287],[181,191,201,211,221,231,241,250,259,268,278,287],[181,191,202,211,221,231,241,250,259,268,278,287],[181,192,202,212,221,231,241,250,259,268,278,287],[182,192,202,212,222,231,241,250,259,268,278,287],[182,193,203,213,222,232,241,250,259,268,278,287],[184,194,204,214,224,233,242,251,260,269,278,287],[185,196,206,216,226,235,244,253,262,271,279,287],[187,197,208,218,228,237,246,255,263,272,281,289],[188,199,210,220,230,239,248,257,265,274,282,290],[190,201,211,222,232,241,250,259,267,275,284,292],[192,203,213,224,234,243,252,261,269,277,286,294],[193,204,215,226,236,245,255,263,272,280,287,296],[195,206,217,228,238,248,257,266,274,282,289,297],[197,208,219,229,240,250,259,268,276,284,292,299],[198,209,220,231,242,251,261,270,279,287,294,301],[199,211,222,233,243,253,263,272,281,289,296,303],[201,212,223,235,245,255,265,274,283,291,299,306],[202,213,225,236,246,257,266,276,284,292,300,307],[203,215,226,237,248,258,268,277,286,294,302,309],[204,215,227,238,249,259,269,278,287,295,303,311],[204,216,228,239,249,260,270,279,288,296,304,312],[205,217,228,239,250,260,270,280,289,297,305,312],[205,217,228,240,250,261,271,280,289,298,306,313],[206,217,229,240,251,261,271,280,290,298,306,313],[206,217,229,240,251,261,271,281,290,298,306,314],[206,218,229,240,251,262,272,281,290,299,307,314],[207,218,230,241,252,262,272,281,290,299,307,315],[208,219,230,241,252,262,272,282,291,299,307,315],[208,219,230,241,252,263,273,282,291,300,308,315],[209,220,231,242,252,263,273,282,291,300,308,316],[209,220,231,242,253,263,273,283,292,300,308,316],[210,221,231,242,253,264,274,283,292,301,309,316],[211,221,232,243,253,264,274,283,292,301,309,316],[211,222,233,243,254,264,274,284,293,301,309,317],[212,223,233,243,254,264,274,284,293,301,310,317],[213,223,234,244,254,265,275,284,293,302,310,317],[213,224,235,245,255,265,275,284,294,302,310,318],[214,225,235,245,255,265,275,285,294,302,310,318],[214,225,236,246,256,266,276,285,294,303,311,318],[215,226,236,247,256,266,276,285,294,303,311,319],[215,226,237,247,257,267,276,286,295,303,311,319],[216,227,238,248,258,267,276,286,295,303,312,319],[216,227,238,248,258,268,277,286,295,304,312,319],[217,228,239,249,259,268,277,286,295,304,312,320],[217,228,239,250,259,269,278,287,295,304,312,320],[218,229,240,250,260,269,278,287,296,304,312,320],[218,229,240,251,261,270,279,288,296,305,313,320],[219,230,241,251,261,271,280,288,297,305,313,320],[219,230,241,251,262,271,280,289,297,305,313,321],[220,231,242,252,262,272,281,289,297,305,313,321],[220,231,242,252,262,272,281,290,298,306,314,321],[220,232,243,253,263,273,282,290,298,306,314,322],[221,232,243,253,263,273,282,291,299,307,314,322],[221,233,243,254,264,274,283,291,300,307,315,322],[222,233,244,254,264,274,283,292,300,308,315,322],[222,233,244,255,265,275,284,293,301,308,316,323],[223,234,245,255,265,275,284,293,301,309,316,323],[223,234,245,256,266,276,285,294,302,309,317,323],[223,235,246,256,266,276,285,294,302,310,317,324],[223,235,246,257,267,277,286,294,303,310,318,324],[223,235,247,257,267,277,286,295,303,311,318,325],[223,236,247,258,268,277,287,295,303,311,319,325],[224,236,247,258,268,278,287,296,304,312,319,326],[225,236,248,258,269,278,288,296,304,312,320,326]],"welAOW":[[196,199,202,205,207,210,212,214,217,218,220,222],[209,213,214,219,222,225,228,230,233,235,237,239],[214,221,227,232,235,238,241,244,246,249,251,252],[218,225,231,237,242,247,251,254,257,260,263,265],[221,229,236,242,248,253,257,261,264,267,270,273],[224,233,241,247,253,259,264,268,271,275,278,280],[226,236,244,252,258,264,269,274,278,281,284,287],[227,238,247,255,262,268,274,279,283,287,290,293],[228,239,249,258,265,272,278,283,288,292,296,299],[229,240,250,260,268,275,282,287,292,297,301,304],[230,241,251,261,270,278,285,291,296,301,305,309],[231,241,252,262,271,280,287,294,299,304,309,313],[231,242,253,263,272,281,289,296,302,308,312,316],[232,243,253,263,273,282,290,298,305,311,316,320],[233,244,254,264,274,283,291,299,307,313,318,323],[233,245,255,265,275,284,292,300,308,315,321,326],[234,245,256,266,276,285,294,302,309,316,323,328],[234,246,257,267,277,286,295,303,310,317,324,330],[235,246,257,268,278,287,296,304,311,318,325,331],[236,247,259,269,279,289,298,306,313,321,327,333],[238,250,261,271,282,291,300,309,316,324,330,337],[242,252,264,274,285,295,304,312,320,328,334,341],[245,256,267,278,288,298,308,316,324,331,338,345],[249,260,270,281,291,302,311,320,328,336,343,349],[252,263,274,284,295,305,315,324,332,340,347,354],[255,267,278,288,299,309,319,328,336,345,352,358],[258,271,281,292,302,313,323,332,340,348,356,363],[259,274,285,296,306,316,326,335,344,352,360,367],[261,276,289,299,310,319,330,339,348,356,364,371],[262,277,291,303,314,323,333,343,352,360,368,375],[264,279,294,306,317,327,336,346,355,364,372,379],[265,281,296,309,320,331,340,350,359,367,375,383],[266,282,297,312,324,334,344,353,362,371,379,386],[267,284,299,314,327,337,347,356,365,374,382,390],[267,285,301,315,329,341,350,360,369,377,386,393],[267,286,302,317,331,344,353,363,371,380,389,397],[267,286,303,319,333,346,357,366,375,383,392,400],[268,286,304,320,335,348,360,369,378,386,395,403],[268,286,305,321,336,350,362,372,381,389,397,406],[268,286,305,322,337,352,365,375,384,393,400,408],[268,286,305,323,339,353,367,378,387,396,403,411],[269,287,305,323,340,354,368,380,390,398,406,413],[269,287,305,323,341,356,369,382,392,401,409,416],[269,287,305,323,341,356,370,383,395,403,412,419],[269,287,305,323,341,356,371,384,397,406,414,422],[270,288,305,323,341,356,371,384,397,408,416,424],[270,288,305,323,341,356,371,384,397,409,419,426],[271,288,306,323,341,356,371,384,397,409,420,429],[272,288,306,323,341,356,371,384,397,409,420,431],[273,289,306,324,341,356,371,384,397,409,420,432],[275,290,307,324,341,356,371,384,397,409,420,432],[276,291,307,325,342,356,371,384,397,409,420,432],[277,292,308,325,342,356,371,384,397,409,420,432],[278,293,308,325,342,356,371,384,397,409,420,432],[279,294,309,325,342,356,371,384,397,409,420,432],[280,295,310,325,342,356,371,384,397,409,420,432],[281,296,311,326,342,356,371,384,397,409,420,432],[282,297,312,326,342,356,371,384,397,409,420,432],[282,298,312,327,342,356,371,384,397,409,420,432],[283,298,313,327,342,356,371,384,397,409,420,432],[283,298,313,328,342,356,371,384,397,409,420,432],[283,299,314,328,342,356,371,384,397,409,420,432],[284,299,314,328,342,356,371,384,397,409,420,432],[284,299,314,329,343,356,371,384,397,409,420,432],[285,300,315,329,343,356,371,384,397,409,420,432],[285,300,315,330,343,357,371,384,397,409,420,432],[286,301,315,330,344,357,371,384,397,409,420,432],[286,301,316,330,344,358,371,384,397,409,420,432],[287,301,316,331,345,358,371,384,397,409,420,432],[287,302,317,331,345,358,371,384,397,409,420,432],[288,302,317,331,345,359,372,384,397,409,420,432],[288,303,317,332,346,359,372,384,397,409,420,432],[289,303,318,332,346,360,372,384,397,409,420,432],[289,304,318,333,347,360,373,385,397,409,420,432],[290,304,319,333,347,360,373,385,397,409,420,432],[290,305,319,333,347,361,373,386,397,409,420,432],[291,305,320,334,348,361,374,386,397,409,420,432],[291,306,320,334,348,361,374,386,398,409,420,432],[292,306,321,335,348,362,375,387,398,409,420,432],[292,307,321,335,349,362,375,387,399,409,420,432]],"box3nietAOW":[[152,154,157,159,161,163,165,167,169,170,172,173],[157,159,162,164,166,168,170,172,174,175,177,178],[160,163,165,168,170,172,174,176,178,179,181,182],[163,166,168,171,173,175,177,179,181,183,184,186],[164,167,170,172,174,177,179,181,182,184,186,187],[164,167,170,172,174,177,179,181,182,184,186,187],[164,167,170,172,174,177,179,181,182,184,186,187],[164,167,170,172,174,177,179,181,182,184,186,187],[164,167,170,172,174,177,179,181,182,184,186,187],[164,167,170,172,174,177,179,181,182,184,186,187],[164,167,170,172,174,177,179,181,182,184,186,187],[164,167,170,172,174,177,179,181,182,184,186,187],[164,167,170,172,174,177,179,181,182,184,186,187],[164,167,170,172,174,177,179,181,182,184,186,187],[164,167,170,172,174,177,179,181,182,184,186,187],[164,167,170,172,174,177,179,181,182,184,186,187],[164,167,170,172,174,177,179,181,182,184,186,187],[164,167,170,172,174,177,179,181,182,184,186,187],[164,167,170,172,174,177,179,181,182,184,186,187],[164,167,170,172,174,177,179,181,182,184,186,187],[164,167,170,172,174,177,179,181,182,184,186,187],[164,167,170,172,174,177,179,181,182,184,186,187],[164,167,170,172,174,177,179,181,182,184,186,187],[164,167,170,172,174,177,179,181,182,184,186,187],[164,167,170,172,175,177,179,181,183,184,186,187],[165,168,170,173,175,177,179,181,183,185,186,188],[165,168,170,173,175,177,179,181,183,185,186,188],[165,168,171,173,175,178,180,182,183,185,187,188],[165,168,171,173,176,178,180,182,184,185,187,188],[166,169,171,174,176,178,180,182,184,186,187,189],[166,169,172,174,176,179,181,183,184,186,188,189],[166,169,172,174,177,179,181,183,185,186,188,190],[167,170,172,175,177,179,181,183,185,187,188,190],[167,170,173,175,178,180,182,184,186,187,189,190],[168,171,173,176,178,180,182,184,186,188,189,191],[168,171,174,176,179,181,183,185,187,188,190,191],[169,172,175,177,180,182,184,186,188,190,191,193],[170,174,176,179,181,184,186,188,189,191,193,194],[172,175,178,181,183,185,187,189,191,193,195,196],[173,176,179,182,184,187,189,191,193,195,196,198],[175,178,181,184,186,188,190,193,194,196,198,199],[176,179,182,185,188,190,192,194,196,198,200,201],[178,181,184,187,189,192,194,196,198,200,201,203],[179,183,185,188,191,193,196,198,200,202,203,205],[181,184,187,190,193,195,197,199,201,203,205,206],[182,186,189,191,194,197,199,201,203,205,207,208],[184,187,190,193,195,198,200,203,205,206,208,210],[185,188,191,194,197,199,202,204,206,208,210,211],[186,190,193,196,198,201,203,206,208,209,211,213],[187,191,194,197,200,202,205,207,209,211,213,214],[188,192,195,198,201,203,206,208,210,212,214,216],[189,193,196,199,202,204,207,209,211,213,215,217],[190,194,197,200,203,205,208,210,212,214,216,218],[191,195,198,201,204,206,209,211,213,215,217,219],[192,195,199,202,205,207,210,212,214,216,218,220],[193,196,199,203,205,208,210,213,215,217,219,221],[193,197,200,203,206,209,211,213,216,218,220,221],[194,198,201,204,207,209,212,214,216,219,220,222],[195,198,201,205,208,210,213,215,217,219,221,223],[195,199,202,205,208,211,213,216,218,220,222,224],[196,200,203,206,209,212,214,216,219,221,223,224],[197,200,203,207,210,212,215,217,219,221,223,225],[197,201,204,207,210,213,215,218,220,222,224,226],[198,201,205,208,211,214,216,219,221,223,225,227],[198,202,205,208,211,214,217,219,221,223,225,227],[199,203,206,209,212,215,217,220,222,224,226,228],[199,203,207,210,213,215,218,220,223,225,227,228],[200,204,207,210,213,216,219,221,223,225,227,229],[201,204,208,211,214,217,219,222,224,226,228,230],[201,205,208,211,214,217,220,222,224,227,229,230],[202,205,209,212,215,218,220,223,225,227,229,231],[202,206,209,212,215,218,221,223,226,228,230,232],[203,206,210,213,216,219,221,224,226,228,230,232],[203,207,210,213,216,219,222,224,227,229,231,233],[204,207,211,214,217,220,222,225,227,229,231,233],[204,208,211,214,217,220,223,225,228,230,232,234],[205,208,212,215,218,221,223,226,228,230,232,234],[205,209,212,215,218,221,224,226,228,230,232,234],[205,209,212,216,219,221,224,226,228,230,232,234],[206,209,213,216,219,221,224,226,228,230,232,234],[206,210,213,216,219,221,224,226,228,230,232,234],[206,210,213,216,219,221,224,226,228,230,232,234],[207,210,213,216,219,221,224,226,228,230,232,234],[207,210,213,216,219,222,224,226,229,230,233,234],[207,210,213,217,219,222,224,226,229,231,233,235],[208,211,214,217,220,223,225,227,230,231,234,235],[208,212,215,217,221,223,225,228,230,232,234,236],[209,212,216,218,222,224,226,229,231,233,235,237],[209,213,216,219,222,225,227,230,232,234,236,237],[210,213,217,220,223,226,228,230,232,234,236,238],[210,214,217,221,223,226,229,231,233,235,237,239],[210,214,217,221,224,227,229,232,233,236,238,239],[211,214,218,221,224,227,230,232,234,237,238,240],[211,215,218,221,225,228,230,233,235,237,239,241],[211,215,218,222,225,228,231,233,236,238,240,242]],"box3welAOW":[[195,198,201,204,207,209,212,214,216,218,220,221],[202,206,209,212,215,217,220,222,224,226,228,230],[206,209,213,216,219,221,224,226,228,230,232,234],[208,212,215,218,221,224,227,229,231,233,235,237],[210,214,217,220,223,226,228,231,233,235,237,239],[211,215,218,221,224,227,230,232,235,237,239,240],[212,216,219,223,226,228,231,233,236,238,240,242],[213,217,221,224,227,230,232,235,237,239,241,243],[214,218,221,224,227,230,233,235,238,240,242,244],[215,219,222,225,228,231,234,236,239,241,243,245],[216,219,223,226,229,232,234,237,239,241,243,245],[216,220,223,227,230,233,235,238,240,242,244,246],[217,220,224,227,230,233,236,238,241,243,245,247],[217,221,224,228,231,234,236,239,241,243,245,247],[218,221,225,228,231,234,237,239,242,244,246,248],[218,222,225,229,232,235,237,240,242,244,246,248],[219,223,226,229,232,235,238,241,243,245,247,249],[220,224,227,230,233,236,239,242,244,246,248,250],[221,225,228,232,235,238,240,243,245,247,250,252],[222,227,230,234,237,240,242,245,247,250,252,254],[225,229,233,236,239,242,245,248,250,252,255,257],[228,232,236,240,243,246,249,251,254,256,258,260],[231,235,239,242,245,249,251,254,257,259,261,263],[232,236,240,244,247,250,253,256,258,261,263,265],[234,238,242,246,249,252,255,258,260,262,265,267],[235,240,243,247,251,254,257,259,262,264,267,269],[237,241,245,249,252,255,258,261,264,266,268,270],[238,242,246,250,254,257,260,263,265,268,270,272],[239,243,247,251,255,258,261,264,266,269,271,273],[240,244,248,252,255,259,262,264,267,270,272,274],[240,244,248,252,255,259,262,265,267,270,272,274],[240,244,248,252,256,259,262,265,268,270,272,274],[240,245,249,252,256,259,262,265,268,270,273,275],[240,245,249,252,256,259,262,265,268,270,273,275],[240,245,249,253,256,259,262,266,268,271,273,275],[241,245,249,253,257,260,263,266,269,271,273,276],[241,246,250,254,257,260,263,267,269,272,274,276],[242,246,250,254,258,261,264,267,270,272,275,277],[242,246,251,255,258,261,264,267,270,273,275,277],[243,247,251,255,259,262,265,268,270,273,276,278],[243,247,251,256,259,262,265,268,271,274,276,278],[244,248,252,256,260,263,266,269,272,274,277,279],[245,249,253,257,261,264,267,270,273,275,278,280],[246,250,254,258,262,265,268,271,274,277,279,281],[247,252,256,260,263,267,270,273,276,278,281,283],[248,253,257,261,265,268,271,274,277,280,282,284],[250,254,258,262,266,269,273,276,279,281,284,286],[251,255,260,264,267,271,274,277,280,282,285,287],[252,257,261,265,269,272,275,278,281,284,286,289],[253,258,262,266,270,273,277,280,283,285,288,290],[255,259,263,268,271,275,278,281,284,287,289,291],[256,260,265,269,273,276,279,282,285,288,291,293],[257,261,266,270,274,277,281,284,287,289,292,294],[258,263,267,271,275,279,282,285,288,291,293,296],[259,264,268,272,276,280,283,286,289,292,294,297],[260,265,269,273,277,281,284,287,290,293,296,298],[261,266,270,274,278,282,285,288,291,294,297,299],[262,267,271,275,279,283,286,289,292,295,298,300],[263,267,272,276,280,284,287,290,293,296,299,301],[264,268,273,277,281,285,288,291,294,297,300,302],[264,269,274,278,282,285,289,292,295,298,300,303],[265,270,274,278,282,286,290,293,296,299,301,304],[266,270,275,279,283,287,290,293,296,299,302,304],[266,271,275,280,283,287,290,294,297,300,302,305],[267,271,276,280,284,288,291,295,298,300,303,305],[267,272,276,281,285,288,292,295,298,301,304,306],[268,272,277,281,285,289,292,296,299,302,304,307],[268,273,277,282,286,289,293,296,299,302,305,307],[269,274,278,282,286,290,293,297,300,303,305,308],[269,274,279,283,287,291,294,297,301,303,306,308],[270,275,279,283,287,291,295,298,301,304,307,309],[270,275,280,284,288,292,295,298,301,304,307,310],[271,276,280,284,288,292,296,299,302,305,308,310],[271,276,281,285,289,293,296,299,302,306,308,311],[272,277,281,285,289,293,297,300,303,306,309,311],[272,277,282,286,290,293,297,300,303,306,309,312],[273,277,282,286,290,294,298,301,304,307,310,312],[273,278,282,287,291,294,298,301,304,307,310,313],[273,278,283,287,291,295,299,302,305,308,311,313],[274,279,283,288,292,295,299,302,305,308,311,314]],"labelExtra":[0,5000,10000,20000,25000,30000,40000,0],"verbouwExtra":[20000,15000,10000,10000,0,0,0,10000],"brutering":[1.05,1.05,1.1,1.15,1.2,1.2,1.25,1.3,1.3,1.35,1.4,1.4],"factorHoog":1,"factorLaag":1,"alleenstaandBedrag":18000}/*NORMEN_END*/;

/* Productregels uit de Argenta hypotheekgids, augustus 2026 */
const REGELS = {
  minHoofdsom: 25000, maxHoofdsom: 2000000, grensGroot: 1250000, maxLtvGroot: 90,
  maxLtv: 100, maxLtvNhgGroen: 106, minMarktwaarde: 100000,
  avMaxPct: 30, avMaxBedrag: 150000,
  groenMax: 35000, groenPerioden: [5, 10, 15, 20, 25, 30],
  consMax: 100000, consMaxLtv: 80,
  desktopMaxLtv: 90, desktopMaxHoofdsom: 1000000, desktopMaxWaarde: 1500000,
  bouwdepotVrij: 25000, eigenMiddelenBewijs: 25000,
  ovbKosten: 250, ovbVerkoopkostenPct: 1.85
};
/* NHG: bron Voorwaarden en normen 2027-1 (hoofdstuk C.2 en A.5.3), geldig vanaf 1 januari 2027 – jaarlijks controleren */
const NHG = { jaar: 2027, grens: 500000, grensEnergie: 530000, provisiePct: 0.4 };
/* Nieuwbouwwoning met een A++++ label valt direct onder de hogere grens */
const nhgGrens = () => (F.doel === 'nieuwbouw' && +F.label <= 1) ? NHG.grensEnergie : NHG.grens;
/* Bijzondere toetsen: hypotheekgids 1.8.1, 2.1.6 (stroomschema VvE), 2.4, 5.1.1 en 5.1.2. AOW-leeftijd indicatief (67 jaar). */
const EXTRA = { aowLeeftijd: 67, erfpachtRuimte: 550, vveLtv: 80, dlStandaard: 12 };
const VORMEN = {
  ann: { naam: 'Annuïtair', tabel: 'annuitair' },
  lin: { naam: 'Lineair', tabel: 'annuitair' },
  av: { naam: 'Aflossingsvrij', tabel: 'aflossingsvrij' },
  groenAnn: { naam: 'Groen lenen – annuïtair', groen: true },
  groenLin: { naam: 'Groen lenen – lineair', groen: true }
};
/* Energielabels: index sluit aan op de volgorde in NORMEN.labelExtra / verbouwExtra (0 = A++++ met garantie ... 8 = geen label) */
const LABELS = [
  { naam: 'A++++ met EPG', norm: 6, korting: 'A' }, { naam: 'A++++', norm: 5, korting: 'A' }, { naam: 'A+++', norm: 4, korting: 'A' },
  { naam: 'A+ of A++', norm: 3, korting: 'A' }, { naam: 'A', norm: 2, korting: 'A' }, { naam: 'B', norm: 2, korting: 'B' },
  { naam: 'C of D', norm: 1, korting: 'C' }, { naam: 'E, F of G', norm: 0, korting: 'C' }, { naam: 'Geen (geldig) label', norm: 7, korting: 'C' }
];
const OVB = {
  a: { naam: 'Verkocht, ontbindende voorwaarden verstreken', pct: 100, kosten: true },
  b: { naam: 'Verkocht, ontbindende voorwaarden niet verstreken', pct: 95 },
  c: { naam: 'Niet verkocht, met taxatierapport', pct: 95 },
  d: { naam: 'Niet verkocht, met Calcasa Desktop Taxatie', pct: 90 }
};
const VOORWAARDEN = [
  ['Lening en offerte', [
    'Hoofdsom € 25.000 tot € 2.000.000 (inclusief overbrugging en verhogingen); verhoging vanaf € 5.000; looptijd 5 tot 30 jaar.',
    'Verstrekking tot 100% van de marktwaarde; met NHG en EBB/EBV tot 106%. Boven € 1.250.000 hoofdsom maximaal 90%.',
    'NHG 2027: NHG-grens € 500.000, met energiebesparende voorzieningen of nieuwbouw met A++++ label € 530.000; borgtochtprovisie 0,4%.',
    'Offerte 3 maanden geldig, verlenging met 9 maanden zonder bereidstellingskosten; € 500 annuleringskosten in de verlengingsperiode.',
    'Passeren binnen 3 maanden: de laagste van offerterente en passeerrente geldt. Na 3 maanden: de laagste van offerterente en rente op het vastklikmoment.',
    'Renteaanbod binnen 3 weken retour; bindende offerte binnen 2 weken (digitaal) getekend retour.',
    'Bouwdepot zonder kosten, 24 maanden geldig; rentevergoeding gelijk aan de hypotheekrente (maximaal 24 maanden).',
    'Onbeperkt aflossen uit eigen middelen. Verhuisregeling: rente en resterende hoofdsom binnen 12 maanden meenemen.'
  ]],
  ['Aflosvormen', [
    'Annuïtair, lineair en aflossingsvrij. Leven-, spaar- en beleggingshypotheken alleen voor bestaande klanten.',
    'Aflossingsvrij maximaal 30% van de marktwaarde en maximaal € 150.000 (laagste van de 2); niet voor koopstarters (≤ 35 jaar, eerste koopwoning).',
    'Consumptieve hypotheek: maximaal € 100.000, LTV maximaal 80%, annuïtair of lineair, niet met NHG, opslag op de vaste rente; afwijzing bij negatieve BKR-melding.',
    'Groen lenen (EBB/EBV): maximaal € 35.000, annuïtair of lineair, looptijd en rentevast 5/10/15/20/25/30 jaar, niet voor appartementen.',
    'Duurzaamheidskorting bij geregistreerd label A (of beter) of B; geldt tijdens de eerste rentevaste periode, niet op groen lenen en overbrugging.'
  ]],
  ['Woning en taxatie', [
    'Eigen bewoning, vaste bewoning in Nederland; minimale marktwaarde (na verbouwing) € 100.000.',
    'Taxatierapport via NWWI, op datum bindende offerte maximaal 6 maanden oud.',
    'Calcasa Desktop Taxatie: tot 90% LTV, hoofdsom maximaal € 1.000.000, woningwaarde maximaal € 1.500.000, betrouwbaarheid ≥ 4,0 (NHG 5,0); niet bij nieuwbouw of erfpacht. Bij aflossingsvrij: Desktop Taxatie Plus of volledige taxatie.',
    'Nieuwbouw: waarborgcertificaat (keurmerk Stichting GarantieWoning) en bij passeren een onherroepelijke omgevingsvergunning.',
    'Uitgesloten onder meer: serviceflat, studenten- of noodwoning, (deels) verhuurde woning, recht van opstal, coöperatief eigendom, recreatiebestemming, zelfbouw zonder aannemer.',
    'Hoog funderingsrisico (D) of vastgesteld funderingsprobleem (E): dossier voorleggen voor individuele beoordeling.'
  ]],
  ['Aanvrager en inkomen', [
    'Maximaal 2 aanvragers, 18 jaar of ouder, geen maximumleeftijd; geen samenlevingsvormen in familiesfeer en geen borgstelling door derden.',
    'Toetsing volgens de Tijdelijke regeling hypothecair krediet en zoveel mogelijk de NHG-normen; toetsrente bij rentevast ≥ 10 jaar is de offerterente.',
    'Loondienst via IBL of werkgeversverklaring; maximaal 50 contractuele uren per week; toekomstige verhoging of dienstverband binnen 6 maanden na bindende offerte kan meetellen.',
    'Flexibel inkomen: gemiddelde van 3 kalenderjaren, maximaal het laatste jaar; alleen naast een hoger vast inkomen van de andere aanvrager (tenzij volledig via IBL).',
    'Ondernemers: tot 100% marktwaarde zonder opslag; inkomensverklaring ondernemer of cijfers van 3 kalenderjaren; maximaal 3 actieve ondernemingen (NL, BE of DE).',
    'Alleen inkomen en vermogen in euro’s; verhuurinkomsten uit een 2e woning tellen niet mee.',
    'Herkomst eigen middelen aantonen vanaf € 25.000.'
  ]],
  ['Financiële lasten en BKR', [
    'Doorlopend krediet en verzendhuiskrediet: 2% van de oorspronkelijke hoofdsom per maand. Aflopend krediet, restschuld en operational lease: werkelijke last.',
    'Studielening DUO: termijnbedrag gebruteerd volgens de Tijdelijke regeling hypothecair krediet.',
    'Partneralimentatie en erfpachtcanon komen in mindering op het toetsinkomen.',
    'Geen hypotheek bij loonbeslag of looncessie, BKR-code 1 t/m 5, A-registratie of code SK/SH/ZO/RO; herstelde A-registratie alleen na 2 jaar en met verklaring.',
    'Vanaf 9 BKR-contracten (1 aanvrager) of 16 (2 aanvragers): losse beoordeling.'
  ]],
  ['Overbrugging', [
    'Alleen in combinatie met de Argenta hypotheek; looptijd maximaal 24 maanden (nieuwbouw 36 maanden); afsluitkosten € 250 bij aflossing.',
    'Maximum: 100% verkoopprijs – 1,85% verkoopkosten – restschuld (verkocht, voorwaarden verstreken); 95% (verkocht, voorwaarden niet verstreken of onverkocht met taxatie); 90% (onverkocht met Desktop Taxatie).',
    'Dubbele lasten moeten gedragen kunnen worden gedurende de verwachte looptijd.'
  ]]
];

VOORWAARDEN.push(['Tijdens de looptijd', [
  'Opstalverzekering tegen herbouwwaarde is verplicht.',
  'Vergoedingsvrij aflossen tot 15%; daarboven geen vergoeding bij onder meer aflossen uit eigen middelen, verkoop van de woning of als de marktrente hoger is dan de contractrente.',
  'Overbruggingshypotheek mag altijd zonder vergoeding worden afgelost.',
  'Tussentijds een andere rentevaste periode kiezen kan, meestal tegen een vergoeding.',
  'Klachten: eerst bij Argenta (bevestiging binnen 2 werkdagen, antwoord binnen 10 werkdagen), daarna Kifid.'
]]);
const fmtEuro0 = n => (n < 0 ? '-' : '') + '€ ' + Math.abs(Math.round(n)).toLocaleString('nl-NL');
const fmtEuro2 = n => (n < 0 ? '-' : '') + '€ ' + Math.abs(n).toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtPct = (n, d = 2) => n.toLocaleString('nl-NL', { minimumFractionDigits: d, maximumFractionDigits: d }) + '%';
let F = {}, DELEN = [];

/* ---------- Rekenkern ---------- */
function klasseIndex(ltv, nhg) {
  if (nhg) return 0;
  const i = RATES.klassen.findIndex(k => ltv <= k);
  return i === -1 ? RATES.klassen.length + 1 : i + 1;
}
function klasseNaam(idx) {
  if (idx === 0) return 'NHG';
  return idx <= RATES.klassen.length ? '≤ ' + RATES.klassen[idx - 1] + '%' : '> 106%';
}
const annFactor = (rentePct, jaren) => { const r = rentePct / 100 / 12, n = jaren * 12; return r === 0 ? 1 / n : r / (1 - Math.pow(1 + r, -n)); };
function normKolom(rente) { const i = NORMEN.grenzen.findIndex(g => rente <= g + 1e-9); return i === -1 ? NORMEN.grenzen.length : i; }
function normPct(tabel, inkomen, kol) {
  const t = NORMEN[tabel];
  const rij = Math.max(0, Math.min(t.length - 1, Math.floor((inkomen - NORMEN.start) / 1000)));
  return t[rij][kol] / 1000;
}

/* Maandschema per leningdeel bij gelijkblijvende rente: [{rente, aflossing, rest}] */
function schema(vorm, bedrag, rentePct, jaren) {
  const r = rentePct / 100 / 12, n = jaren * 12, uit = [];
  let rest = bedrag;
  const ann = bedrag * annFactor(rentePct, jaren);
  for (let m = 1; m <= n; m++) {
    const rente = rest * r;
    let afl = vorm === 'av' ? (m === n ? rest : 0) : (vorm === 'lin' || vorm === 'groenLin') ? bedrag / n : ann - rente;
    if (m === n) afl = rest;
    rest -= afl;
    uit.push({ rente, afl, rest: Math.max(0, rest) });
  }
  return uit;
}

/* Jaarlijks kostenpercentage: effectieve jaarrente waarbij netto ontvangen bedrag gelijk is aan de contante waarde van alle termijnen */
function jkp(netto, termijnen) {
  if (netto <= 0 || !termijnen.length) return null;
  const cw = i => termijnen.reduce((s, t, k) => s + t / Math.pow(1 + i, k + 1), 0);
  let lo = 0, hi = 0.05;
  for (let k = 0; k < 60; k++) { const mid = (lo + hi) / 2; if (cw(mid) > netto) lo = mid; else hi = mid; }
  return (Math.pow(1 + (lo + hi) / 2, 12) - 1) * 100;
}

function kosten() {
  const doel = F.doel, koopsom = F.koopsom, verbouwing = F.verbouwing, nhg = F.nhg;
  const ovb = doel === 'bestaand' ? Math.round(koopsom * (+F.ovb_pct) / 100) : 0;
  const levering = (doel === 'bestaand' || doel === 'nieuwbouw' || doel === 'uitkoop') ? F.notLevering : 0;
  const aankoop = ovb + levering;
  const hypKostenExcl = F.notHypotheek + F.taxKosten + F.advKosten;
  const exclNhg = koopsom + verbouwing + aankoop + hypKostenExcl;
  const mw = F.marktwaarde == null ? koopsom : F.marktwaarde;
  /* Eigen geld niet opgegeven: minimaal benodigd bedrag, wat boven de marktwaarde uitkomt (de NHG-provisie wordt meegefinancierd) */
  const maxLening = nhg ? Math.min(mw, Math.min(NHG.grensEnergie, nhgGrens() + F.maatregelen)) : mw;
  const nodig = Math.max(0, nhg ? Math.ceil(exclNhg - maxLening * (1 - NHG.provisiePct / 100)) : exclNhg - maxLening);
  const eigen = F.eigenGeld == null ? nodig : F.eigenGeld;
  const nhgKosten = nhg ? Math.round(Math.max(0, exclNhg - eigen) * (NHG.provisiePct / 100) / (1 - NHG.provisiePct / 100)) : 0;
  const hypKosten = hypKostenExcl + nhgKosten;
  const totaal = exclNhg + nhgKosten;
  return { doel, koopsom, verbouwing, ovb, levering, aankoop, notHyp: F.notHypotheek, tax: F.taxKosten, adv: F.advKosten, nhgKosten, hypKosten, totaal, eigen, teFinancieren: Math.max(0, totaal - eigen) };
}

/* Werkelijke bruto maandlast (1e maand) van een leningdeel tegen de toetsrente */
function werkelijkeLast(x) {
  const r = x.toets / 100 / 12, n = x.d.looptijd * 12, b = x.d.bedrag;
  if (x.d.vorm === 'av') return b * r;
  if (x.d.vorm === 'lin' || x.d.vorm === 'groenLin') return b / n + b * r;
  return b * annFactor(x.toets, x.d.looptijd);
}
const leeftijd = id => { const v = F[id]; if (!v) return null; return ((F.peildatum ? new Date(F.peildatum + 'T00:00:00').getTime() : Date.now()) - new Date(v + 'T00:00:00').getTime()) / (365.25 * 864e5); };

/* Tweede toets op werkelijke lasten met een ander inkomen (pensioen- of tekortperiode), AOW-tabel */
function periodeToets(rijen, toets, inkomenJaar) {
  const pct = normPct('welAOW', inkomenJaar, toets.kol), pctBox3 = normPct('box3welAOW', inkomenJaar, toets.kol);
  const last = rijen.reduce((s, x) => s + werkelijkeLast(x) * (x.d.consumptief ? pct / pctBox3 : 1), 0);
  const toegestaan = inkomenJaar * pct / 12 - F.verplichtingen - toets.studieBruto;
  return { inkomen: inkomenJaar, pct, last, toegestaan, ruimte: toegestaan - last };
}

function vveOordeel(ltv) {
  const aanwezig = F.vveAanwezig, ja = id => F[id] === 'ja';
  if (aanwezig === 'oprichting') return ['ok', 'VvE in oprichting; aanleveren: (concept) splitsingsakte en splitsingsreglement.'];
  if (aanwezig === 'nee') return ['fout', 'Er is geen VvE en deze is ook niet in oprichting.'];
  if (ltv <= EXTRA.vveLtv) return ['ok', `VvE aanwezig en LTV ≤ ${EXTRA.vveLtv}%: in beginsel geen aanvullende stukken nodig.`];
  const slapend = F.vveActief === 'slapend';
  if (ja('vveOnderhoud')) {
    if (ja('vveMjop')) return ['ok', slapend ? 'Slapende VvE met voldoende onderhoud en reserves; aanleveren: kopie collectieve opstalverzekering.' : 'Actieve VvE met voldoende onderhoud en reserves.'];
    return ['letop', 'Individuele beoordeling – aanleveren: bouwkundig rapport en MJOP (indien aanwezig)' + (slapend ? ' of een verbouwing waarbij de onderhoudstoestand verbetert.' : '.')];
  }
  if (ja('vveFondsen')) return ['letop', 'Individuele beoordeling – onderhoud niet redelijk of goed, fondsen wel toereikend; aanleveren: bouwkundig rapport en MJOP (indien aanwezig).'];
  return ['fout', 'Onderhoud niet redelijk of goed en de fondsen zijn niet toereikend voor het meerjarenonderhoudsplan.'];
}

function inkomenstoets(rijen, totaal, labelIdx) {
  const i1 = F.ink1, i2 = F.ink2;
  if (i1 + i2 === 0 || totaal === 0) return null;
  const aow = F.aow, alleen = F.alleenstaand;
  const toetsKort = F.toetsrente;
  const inkomen = Math.max(0, Math.max(i1, i2) * NORMEN.factorHoog + Math.min(i1, i2) * NORMEN.factorLaag - F.aftrek - (F.erfpachtgrond ? F.epCanon : 0));
  rijen.forEach(x => { x.toets = (x.d.rvp === 'var' || +x.d.rvp < 10) ? toetsKort : (x.rente || 0); });
  const gemToets = rijen.reduce((s, x) => s + x.toets * x.d.bedrag, 0) / totaal;
  const kol = normKolom(gemToets);
  const pct = normPct(aow ? 'welAOW' : 'nietAOW', inkomen, kol);
  const pctBox3 = normPct(aow ? 'box3welAOW' : 'box3nietAOW', inkomen, kol);
  /* Toetslast: annuïtair over 30 jaar tegen de toetsrente; niet-aftrekbare (consumptieve) delen gewogen met de box 3-tabel */
  const werkelijk = F.regeling === 'aow' && aow;
  const toetslast = rijen.reduce((s, x) => s + (werkelijk ? werkelijkeLast(x) : x.d.bedrag * annFactor(x.toets, 30)) * (x.d.consumptief ? pct / pctBox3 : 1), 0);
  const brutering = NORMEN.brutering[kol];
  const studieBruto = F.studie * brutering;
  const toegestaan = inkomen * pct / 12 - F.verplichtingen - studieBruto;
  const norm = LABELS[labelIdx].norm;
  const vrij = [];
  if (NORMEN.labelExtra[norm]) vrij.push(['Extra leenruimte energielabel ' + LABELS[labelIdx].naam, NORMEN.labelExtra[norm]]);
  const maatregelen = Math.min(F.maatregelen, NORMEN.verbouwExtra[norm]);
  if (maatregelen) vrij.push(['Energiebesparende maatregelen (maximaal ' + fmtEuro0(NORMEN.verbouwExtra[norm]) + ')', maatregelen]);
  if (alleen && inkomen > NORMEN.start) vrij.push(['Alleenstaande aanvrager', NORMEN.alleenstaandBedrag]);
  const vrijTotaal = vrij.reduce((s, v) => s + v[1], 0);
  const maxHyp = Math.max(0, toegestaan) / (toetslast / totaal) + vrijTotaal;
  return { inkomen, gemToets, kol, pct, toegestaan, toetslast, werkelijk, studieBruto, brutering, vrij, vrijTotaal, maxHyp, ruimte: maxHyp - totaal, aow };
}

function bereken() {
  const delen = DELEN;
  const k = kosten();
  if (delen.length === 1 && delen[0].bedrag == null) delen[0].bedrag = k.teFinancieren;
  delen.forEach(d => { if (d.bedrag == null) d.bedrag = 0; });
  const mw = F.marktwaarde == null ? k.koopsom : F.marktwaarde;
  const nhg = F.nhg, starter = F.starter, app = F.appartement, erfpacht = F.erfpachtgrond;
  const labelIdx = +F.label, label = LABELS[labelIdx];
  const doel = k.doel, taxatie = F.taxatie;
  const totaal = delen.reduce((s, d) => s + d.bedrag, 0);
  const ltv = mw > 0 ? totaal / mw * 100 : 0;
  const idx = klasseIndex(ltv, nhg);
  const korting = RATES.korting[label.korting] || 0;
  const fouten = [], letop = [], voorbehoud = [], voorwaarden = [];

  const rijen = delen.map((d, i) => {
    const v = VORMEN[d.vorm];
    let rente = null;
    if (v.groen) { const rij = RATES.groen[d.rvp]; rente = rij ? rij[nhg ? 0 : 1] : null; }
    else if (d.rvp === 'var') rente = RATES.variabel[idx];
    else { const rij = RATES[v.tabel][d.rvp]; rente = rij ? rij[idx] : null; }
    if (rente != null && !v.groen) {
      if (d.consumptief) rente += RATES.consumptiefOpslag;
      rente = Math.round((rente - korting) * 100) / 100;
    }
    const sch = rente != null && d.bedrag > 0 ? schema(d.vorm, d.bedrag, rente, d.looptijd) : [];
    const pm = sch.length ? sch[0].rente + sch[0].afl : 0;
    if (d.bedrag <= 0) fouten.push(`Leningdeel ${i + 1}: vul een bedrag in.`);
    if (d.rvp !== 'var' && +d.rvp > d.looptijd) letop.push(`Leningdeel ${i + 1}: rentevaste periode is langer dan de looptijd.`);
    return { nr: i + 1, d, naam: v.naam + (d.consumptief ? ' (consumptief)' : ''), rente, pm, sch };
  });

  const som = f => delen.filter(f).reduce((s, d) => s + d.bedrag, 0);
  const av = som(d => d.vorm === 'av'), groen = som(d => VORMEN[d.vorm].groen), cons = som(d => d.consumptief);

  /* Overbrugging */
  let ovb = null;
  if (F.ovbAan) {
    const s = OVB[F.ovbSituatie], waarde = F.ovbWaarde, rest = F.ovbRestschuld, bedrag = F.ovbBedrag;
    const max = Math.max(0, waarde * s.pct / 100 - (s.kosten ? waarde * REGELS.ovbVerkoopkostenPct / 100 : 0) - rest);
    ovb = { situatie: s.naam, waarde, rest, bedrag, max, rente: RATES.overbrugging, pm: bedrag * RATES.overbrugging / 100 / 12, looptijd: doel === 'nieuwbouw' ? 36 : 24 };
    if (bedrag <= 0) fouten.push('Overbrugging: vul het gewenste bedrag in.');
    if (waarde > 0 && bedrag > max) fouten.push(`Overbrugging is maximaal ${fmtEuro0(max)} in deze situatie.`);
    letop.push(`Overbrugging: looptijd maximaal ${ovb.looptijd} maanden, ${fmtEuro0(REGELS.ovbKosten)} afsluitkosten bij aflossing. De rente wordt vastgesteld bij het renteaanbod.`);
  }
  const totaalIncl = totaal + (ovb ? ovb.bedrag : 0);

  if (Math.abs(totaal - k.teFinancieren) > 1) letop.push(`De leningdelen (${fmtEuro0(totaal)}) wijken af van het te financieren bedrag uit stap 2 (${fmtEuro0(k.teFinancieren)}).`);
  if (mw > 0 && mw < REGELS.minMarktwaarde) fouten.push(`Minimale marktwaarde is ${fmtEuro0(REGELS.minMarktwaarde)}.`);
  if (mw <= 0) fouten.push('Vul de marktwaarde in.');
  if (totaal > 0 && totaal < REGELS.minHoofdsom) fouten.push(`Minimale hoofdsom is ${fmtEuro0(REGELS.minHoofdsom)}.`);
  if (totaalIncl > REGELS.maxHoofdsom) fouten.push(`Maximale hoofdsom is ${fmtEuro0(REGELS.maxHoofdsom)} (inclusief overbrugging en verhogingen).`);
  if (totaal > REGELS.grensGroot && ltv > REGELS.maxLtvGroot) fouten.push(`Bij een hoofdsom boven ${fmtEuro0(REGELS.grensGroot)} geldt een maximale verstrekking van ${REGELS.maxLtvGroot}% van de marktwaarde.`);
  if (ovb && totaalIncl > REGELS.grensGroot && F.ovbSituatie >= 'c') { const t = `Hoofdsom boven ${fmtEuro0(REGELS.grensGroot)} inclusief overbrugging op een onverkochte woning: individuele beoordeling, langere doorlooptijd.`; letop.push(t); voorbehoud.push(t); }
  const energie = groen + F.maatregelen;
  if (mw > 0) {
    if (!nhg && ltv > REGELS.maxLtv) fouten.push('Zonder NHG is de verstrekking maximaal 100% van de marktwaarde.');
    if (nhg && ltv > REGELS.maxLtvNhgGroen) fouten.push('Met NHG is de verstrekking maximaal 106% van de marktwaarde (alleen met EBB/EBV).');
    else if (nhg && ltv > REGELS.maxLtv && energie === 0) fouten.push('Boven 100% van de marktwaarde kan alleen met NHG in combinatie met energiebesparende maatregelen (EBB/EBV).');
  }
  if (nhg) {
    if (totaal > NHG.grensEnergie) fouten.push(`Met NHG is de lening maximaal ${fmtEuro0(NHG.grensEnergie)} (NHG-grens inclusief energiebesparende maatregelen).`);
    else if (totaal > nhgGrens() && energie < totaal - nhgGrens()) fouten.push(`De NHG-grens ${NHG.jaar} is ${fmtEuro0(nhgGrens())}; alleen het deel voor energiebesparende maatregelen mag daarboven komen (tot ${fmtEuro0(NHG.grensEnergie)}).`);
    letop.push('NHG: de NHG-grens is vereenvoudigd getoetst op de hoofdsom; NHG toetst op de kosten voor de woning. Controleer de grens die geldt op de datum van het bindend aanbod.');
  }
  if (av > 0) {
    if (starter) fouten.push('Aflossingsvrij is niet mogelijk voor koopstarters (35 jaar of jonger, eerste koopwoning).');
    const maxAv = Math.min(mw * REGELS.avMaxPct / 100, REGELS.avMaxBedrag);
    if (av > maxAv) fouten.push(`Aflossingsvrij is maximaal ${REGELS.avMaxPct}% van de marktwaarde en maximaal ${fmtEuro0(REGELS.avMaxBedrag)} (laagste van de 2): hier ${fmtEuro0(maxAv)}.`);
    if (taxatie === 'desktop') fouten.push('Bij een aflossingsvrij leningdeel is een Calcasa Desktop Taxatie Plus of volledige taxatie verplicht.');
  }
  if (groen > 0) {
    if (groen > REGELS.groenMax) fouten.push(`Argenta groen lenen is maximaal ${fmtEuro0(REGELS.groenMax)}.`);
    if (app) fouten.push('Argenta groen lenen kan niet worden afgesloten voor een appartement.');
    letop.push('Het groen-lenen-tarief geldt alleen tijdens de eerste rentevaste periode en is niet afhankelijk van de risicoklasse.');
  }
  if (cons > 0) {
    if (nhg) fouten.push('Een consumptieve hypotheek kan niet met NHG worden aangevraagd.');
    if (cons > REGELS.consMax) fouten.push(`De consumptieve hypotheek is maximaal ${fmtEuro0(REGELS.consMax)}.`);
    if (ltv > REGELS.consMaxLtv) fouten.push(`Met een consumptieve hypotheek geldt een maximale LTV van ${REGELS.consMaxLtv}%.`);
    letop.push('Consumptieve hypotheek: bestedingsdoel doorgeven in het opmerkingenveld van HDN; afwijzing bij een negatieve BKR-melding.');
  }
  if (taxatie !== 'nwwi') {
    if (doel === 'nieuwbouw') fouten.push('Een Calcasa Desktop Taxatie is niet mogelijk bij nieuwbouw.');
    if (erfpacht) fouten.push('Een Calcasa Desktop Taxatie is niet mogelijk bij erfpacht.');
    if (ltv > REGELS.desktopMaxLtv) fouten.push(`Een Calcasa Desktop Taxatie is mogelijk tot ${REGELS.desktopMaxLtv}% LTV.`);
    if (totaal > REGELS.desktopMaxHoofdsom) fouten.push(`Een Calcasa Desktop Taxatie is mogelijk tot een hoofdsom van ${fmtEuro0(REGELS.desktopMaxHoofdsom)}.`);
    if (mw > REGELS.desktopMaxWaarde) fouten.push(`Een Calcasa Desktop Taxatie is mogelijk tot een woningwaarde van ${fmtEuro0(REGELS.desktopMaxWaarde)}.`);
    letop.push(`Desktop Taxatie: minimale betrouwbaarheid ${nhg ? '5,0 (NHG)' : '4,0'}; op datum bindende offerte maximaal 6 maanden oud.`);
  }
  if (doel === 'bestaand' && F.ovb_pct === '0') letop.push('Overdrachtsbelasting 0%: controleer of de klant aan de voorwaarden van de startersvrijstelling voldoet.');
  if (doel === 'nieuwbouw') letop.push('Nieuwbouw: waarborgcertificaat (keurmerk Stichting GarantieWoning), (voorlopig) energielabel en bij passeren een onherroepelijke omgevingsvergunning.');
  if (k.verbouwing >= REGELS.bouwdepotVrij || (nhg && k.verbouwing > 0)) letop.push('Verbouwing: het bedrag wordt in een bouwdepot gestort (24 maanden, rentevergoeding gelijk aan de hypotheekrente).');
  if (k.eigen >= REGELS.eigenMiddelenBewijs) letop.push(`Eigen middelen vanaf ${fmtEuro0(REGELS.eigenMiddelenBewijs)}: herkomst aantonen met bewijsstukken.`);
  if (korting) letop.push('De duurzaamheidskorting vereist een geldig geregistreerd energielabel en geldt alleen tijdens de eerste rentevaste periode.');
  if (rijen.some(r => r.d.rvp === 'var')) letop.push('Variabele rente: de klant krijgt de rente die geldt op het moment van passeren; de rente staat 3 maanden vast.');

  const maandNu = () => rijen.reduce((s, r) => s + r.pm, 0), maand0 = maandNu;
  const toets = inkomenstoets(rijen, totaal, labelIdx);
  if (toets) {
    if (toets.ruimte < 0) fouten.push(`De hoofdsom is ${fmtEuro0(-toets.ruimte)} hoger dan de maximale hypotheek op inkomen (${fmtEuro0(toets.maxHyp)}).`);
    if (toets.aow && !toets.werkelijk) letop.push('Vanaf de AOW-gerechtigde leeftijd mag op werkelijke last worden getoetst: kies bij “Bijzondere toets” voor AOW-gerechtigd.');
  } else { letop.push('Geen toetsinkomen ingevuld: de maximale hypotheek op inkomen is niet getoetst.'); voorbehoud.push('Inkomen: de maximale hypotheek op inkomen is niet getoetst.'); }

  /* ----- Bijzondere toetsen ----- */
  const extra = [];
  const zet = (naam, soort, tekst) => { extra.push([naam, soort, tekst]); if (soort === 'fout') fouten.push(naam + ': ' + tekst); else if (soort === 'letop') { letop.push(naam + ': ' + tekst); voorbehoud.push(naam + ': ' + tekst); } };
  const regeling = F.regeling;
  const l1 = leeftijd('geb1'), l2 = leeftijd('geb2');
  const oudste = Math.max(l1 || 0, l2 || 0), jongste = l1 && l2 ? Math.min(l1, l2) : null;
  const rvpMin = Math.min(...delen.map(d => d.rvp === 'var' ? 0 : +d.rvp));
  if (regeling === 'aow') {
    if (!F.aow) zet('Werkelijke lasten', 'fout', 'toetsen op werkelijke lasten kan alleen als de aanvrager met het hoogste inkomen AOW-gerechtigd is.');
    else if (toets) zet('Werkelijke lasten (AOW)', toets.ruimte >= 0 ? 'ok' : 'fout', `werkelijke bruto last ${fmtEuro2(toets.toetslast)} per maand tegen toegestaan ${fmtEuro2(toets.toegestaan)}.`);
  }
  if (regeling === 'senioren' || regeling === 'tekort') {
    const naam = regeling === 'senioren' ? 'Senioren verhuisregeling' : 'Tijdelijk-tekortregeling';
    const ink = F.regInkomen;
    if (!oudste) zet(naam, 'letop', 'vul de geboortedatum in (stap 1) om de AOW-termijn te toetsen.');
    else if (oudste < EXTRA.aowLeeftijd - 10) zet(naam, 'fout', `de (oudste) aanvrager moet nu of binnen 10 jaar de AOW-leeftijd bereiken (indicatief ${EXTRA.aowLeeftijd} jaar).`);
    if (regeling === 'senioren') {
      if (['bestaand', 'nieuwbouw'].indexOf(doel) === -1) zet(naam, 'fout', 'alleen voor doorstromers die een andere woning kopen.');
      if (starter) zet(naam, 'fout', 'niet voor koopstarters; de regeling is bedoeld voor doorstromers.');
      const huidig = F.regHuidig;
      if (!huidig) zet(naam, 'letop', 'vul de huidige bruto maandlast in: de nieuwe woning moet dezelfde of lagere maandlasten hebben.');
      else if (maandNu() > huidig) zet(naam, 'fout', `de nieuwe maandlast (${fmtEuro2(maandNu())}) is hoger dan de huidige (${fmtEuro2(huidig)}).`);
      if (rvpMin < 20) zet(naam, 'letop', 'de rente moet minimaal 20 jaar vaststaan; in een aantal gevallen mag hiervan worden afgeweken.');
      letop.push(naam + ': alleen pensioen en lijfrente dat op de datum van het bindend aanbod is opgebouwd telt mee.');
    } else {
      if (!F.ink2 && !F.klant2) zet(naam, 'fout', 'alleen voor partners die samen een hypotheek hebben.');
      if (jongste != null && jongste >= EXTRA.aowLeeftijd) zet(naam, 'fout', 'de jongste partner mag nog geen AOW ontvangen.');
      if (jongste != null && oudste - jongste > 10) zet(naam, 'fout', `de AOW-ingangsdata liggen ${(oudste - jongste).toLocaleString('nl-NL', { maximumFractionDigits: 1 })} jaar uit elkaar; maximaal 10 jaar (tekort maximaal 10 jaar).`);
      if (!delen.some(d => d.vorm === 'av')) zet(naam, 'fout', 'de hypotheek moet minimaal voor een deel aflossingsvrij zijn.');
      if (rvpMin < 10) zet(naam, 'letop', 'de rente moet minimaal 10 jaar vaststaan (afwijken kan binnen de voorwaarden en normen van NHG).');
    }
    if (toets && ink) {
      const pt = periodeToets(rijen, toets, ink);
      zet(naam + (regeling === 'senioren' ? ' – toets vanaf AOW' : ' – toets in tekortperiode'), pt.ruimte >= 0 ? 'ok' : 'fout',
        `werkelijke bruto last ${fmtEuro2(pt.last)} tegen toegestaan ${fmtEuro2(pt.toegestaan)} per maand (inkomen ${fmtEuro0(ink)}, ${fmtPct(pt.pct * 100, 1)}); ${pt.ruimte >= 0 ? 'ruimte' : 'tekort'} ${fmtEuro2(Math.abs(pt.ruimte))}.`);
    } else zet(naam, 'letop', 'vul het toetsinkomen voor de periode in om op werkelijke lasten te toetsen.');
  }

  if (erfpacht) {
    const duur = F.epDuur, langste = Math.max(...delen.map(d => d.looptijd));
    if (F.epUitgever === 'overheid') zet('Erfpacht', 'letop', 'uitgegeven door een overheidsinstantie: het erfpachtrecht moet voldoen aan de regels van NHG.');
    else {
      const v = F.epVestiging, o = F.epOpinie;
      if (v === 'voor2013') {
        if (o === 'rood') zet('Erfpacht', 'fout', 'erfpachtopinie rood: Argenta financiert deze particuliere erfpacht niet.');
        else if (o === 'oranje') zet('Erfpacht', 'letop', 'erfpachtopinie oranje: opinie met onderbouwing en voorwaarden ter goedkeuring voorleggen aan Argenta.');
        else if (o === 'geen') zet('Erfpacht', 'letop', 'erfpachtopinie van de notaris of het NivE aanleveren.');
        else zet('Erfpacht', 'ok', 'erfpachtopinie groen: particuliere erfpacht financierbaar.');
        if (nhg) zet('Erfpacht', 'fout', 'NHG accepteert geen woningen met een erfpachtopinie.');
      } else if (v === '2013') zet('Erfpacht', 'letop', 'beoordeling volgens de bancaire richtlijn financierbaarheid erfpachtrechten.');
      else zet('Erfpacht', 'letop', 'het erfpachtrecht moet voldoen aan het model voor de vestiging van nieuwe erfpachtrechten.');
    }
    if (duur && duur < langste) {
      const ruimtePm = toets ? toets.toegestaan - toets.toetslast : null;
      if (ruimtePm == null) zet('Erfpacht – looptijd', 'letop', `resterende duur (${duur} jaar) is korter dan de looptijd (${langste} jaar); alleen mogelijk bij meer dan ${fmtEuro0(EXTRA.erfpachtRuimte)} ruimte per maand in de inkomenstoets (vul inkomen in).`);
      else zet('Erfpacht – looptijd', ruimtePm > EXTRA.erfpachtRuimte ? 'ok' : 'fout', `resterende duur ${duur} jaar is korter dan de looptijd van ${langste} jaar; ruimte in de inkomenstoets ${fmtEuro2(ruimtePm)} per maand (vereist: meer dan ${fmtEuro0(EXTRA.erfpachtRuimte)}).`);
    }
    if (doel === 'erfpacht') letop.push('Afkoop erfpachtcanon: de looptijd van de erfpacht moet minimaal gelijk zijn aan de looptijd van de lening, tenzij de overeenkomst een onvoorwaardelijke verlenging bevat.');
    letop.push('Erfpachtconstructies en vormen van koperssteun worden alleen gefinancierd in combinatie met NHG.');
  }

  if (app) {
    if (F.vveOnbekend) zet('VvE', 'letop', 'gegevens over de VvE ontbreken; de beoordeling volgens het stroomschema is niet uitgevoerd.');
    else { const [soort, tekst] = vveOordeel(ltv); zet('VvE', soort, tekst + ' (volgens het stroomschema beoordeling VvE)'); }
  }

  /* Funderingsrisico (hypotheekgids 2.1.7) */
  if (F.fundering === 'D' || F.fundering === 'E') zet('Funderingsrisico', 'letop', `klasse ${F.fundering} (${F.fundering === 'D' ? 'hoog risico' : 'vastgesteld funderingsprobleem'}): dossier met de aanvraag voorleggen voor individuele beoordeling.`);
  else if (F.fundering) zet('Funderingsrisico', 'ok', `klasse ${F.fundering}: geen individuele beoordeling nodig.`);
  else voorwaarden.push('Het funderingsrisico volgens het taxatierapport of de desktoptaxatie is maximaal klasse C. Bij klasse D (hoog risico) of E (vastgesteld funderingsprobleem) beoordeelt Argenta het dossier individueel.');

  /* BKR en loon (hypotheekgids 6.2 en 7.1.1) */
  const tweeAanvragers = !!(F.ink2 || F.klant2), maxContracten = tweeAanvragers ? 16 : 9;
  if (F.loonbeslag) zet('Loonbeslag', 'fout', 'bij loonbeslag of looncessie verstrekt Argenta geen hypotheek.');
  if (F.bkrStatus === 'negatief') zet('BKR', 'fout', 'bij code 1 t/m 5, een A-registratie of code SK, SH, ZO of RO verstrekt Argenta geen hypotheek.');
  else if (F.bkrStatus === 'hy') zet('BKR', 'fout', 'een aanvraag in combinatie met een HY-registratie (anders dan HY 2) is niet mogelijk, ook niet als die hypotheek is afgelost of de registratie is hersteld.');
  else if (F.bkrStatus === 'herstelA0') zet('BKR', 'fout', 'een herstelde of ingeloste A-registratie van korter dan 2 jaar geleden: financiering is niet mogelijk.');
  else if (F.bkrStatus === 'hy2') zet('BKR', 'letop', 'HY 2- of RN-registratie: aparte beoordeling; verklaring van de klant en schriftelijke bevestiging van NHG dat de restschuld is kwijtgescholden zonder afkoop- of betalingsregeling.');
  else if (F.bkrStatus === 'herstelA2') zet('BKR', 'letop', 'herstelde of ingeloste A-registratie van langer dan 2 jaar geleden: beoordeling per dossier met een verklaring van de klant.');
  else if (F.bkrStatus === 'schoon') zet('BKR', 'ok', 'geen bijzonderheden in de BKR-toets.');
  else voorwaarden.push('Uit de BKR-toets blijkt geen code 1 t/m 5, A-registratie, code SK, SH, ZO of RO en geen HY-registratie; er is geen loonbeslag of looncessie.');
  if (F.bkrContracten >= maxContracten) zet('BKR-contracten', 'letop', `${F.bkrContracten} geregistreerde contracten (grens ${maxContracten} bij ${tweeAanvragers ? '2 aanvragers' : '1 aanvrager'}): het dossier wordt los beoordeeld; per contract het doel toelichten.`);

  /* Voorwaarden waaronder de uitkomst geldt: minimale taxatiewaarde */
  if (totaal > 0) {
    const maxPct = nhg ? (energie > 0 ? REGELS.maxLtvNhgGroen : REGELS.maxLtv) : Math.min(REGELS.maxLtv, totaal > REGELS.grensGroot ? REGELS.maxLtvGroot : 100, cons > 0 ? REGELS.consMaxLtv : 100, taxatie !== 'nwwi' ? REGELS.desktopMaxLtv : 100);
    let minMw = totaal / (maxPct / 100);
    if (av > 0) minMw = Math.max(minMw, av / (REGELS.avMaxPct / 100));
    minMw = Math.ceil(Math.max(minMw, REGELS.minMarktwaarde));
    const bron = taxatie === 'nwwi' ? 'het taxatierapport' : 'de desktoptaxatie';
    voorwaarden.unshift(`De marktwaarde volgens ${bron} is minimaal ${fmtEuro0(minMw)}; bij een lagere waarde kan deze lening niet worden verstrekt.`);
    var minMarktwaarde = minMw, minMarktwaardeKlasse = null;
    if (!nhg && idx >= 1 && idx <= RATES.klassen.length) {
      minMarktwaardeKlasse = Math.ceil(totaal / (RATES.klassen[idx - 1] / 100));
      if (minMarktwaardeKlasse > minMw) voorwaarden.splice(1, 0, `Voor de gerekende tariefklasse (${klasseNaam(idx)}) is de marktwaarde minimaal ${fmtEuro0(minMarktwaardeKlasse)}; bij een lagere waarde geldt een hogere rente.`);
    }
  }
  voorwaarden.push(taxatie === 'nwwi' ? 'Het taxatierapport is uitgebracht via het NWWI, gevalideerd en op de datum van de bindende offerte niet ouder dan 6 maanden.'
    : `De desktoptaxatie heeft een betrouwbaarheid van minimaal ${nhg ? '5,0' : '4,0'} en is op de datum van de bindende offerte niet ouder dan 6 maanden.`);
  /* Minimaal toetsinkomen waarbij deze lening binnen de leennorm past (zelfde lasten, regeling en toetsrente) */
  let minInkomen = null;
  if (totaal > 0) {
    const bewaar = [F.ink1, F.ink2];
    const past = ink => { F.ink1 = ink; F.ink2 = 0; const t = inkomenstoets(rijen, totaal, labelIdx); return !!t && t.ruimte >= 0; };
    let lo = 0, hi = 1000000;
    if (past(hi)) { while (hi - lo > 100) { const mid = Math.round((lo + hi) / 2); if (past(mid)) hi = mid; else lo = mid; } minInkomen = Math.ceil(hi / 100) * 100; }
    F.ink1 = bewaar[0]; F.ink2 = bewaar[1];
    inkomenstoets(rijen, totaal, labelIdx);
    if (minInkomen) voorwaarden.push(`Het gezamenlijke toetsinkomen is minimaal ${fmtEuro0(minInkomen)} per jaar${F.verplichtingen + F.studie > 0 ? ' bij de opgegeven financiële verplichtingen' : ' en er zijn geen financiële verplichtingen'}; Argenta stelt het toetsinkomen zelf vast (IBL, werkgeversverklaring of inkomensverklaring).`);
  }
  const maxAv = Math.min(mw * REGELS.avMaxPct / 100, REGELS.avMaxBedrag);
  const grenzen = {
    minimaleMarktwaarde: typeof minMarktwaarde === 'undefined' ? null : minMarktwaarde,
    minimaleMarktwaardeTariefklasse: typeof minMarktwaardeKlasse === 'undefined' ? null : minMarktwaardeKlasse,
    minimaalToetsinkomen: minInkomen,
    maximaleHoofdsomOpInkomen: toets ? Math.floor(toets.maxHyp) : null,
    maximaleHoofdsomOpWaarde: Math.floor(mw * (nhg && energie > 0 ? REGELS.maxLtvNhgGroen : REGELS.maxLtv) / 100),
    minimaleHoofdsom: REGELS.minHoofdsom, maximaleHoofdsom: REGELS.maxHoofdsom,
    maximaalAflossingsvrij: starter ? 0 : Math.floor(maxAv),
    benodigdEigenGeld: k.eigen,
    ruimteVerplichtingenPerMaand: toets ? Math.max(0, Math.floor(toets.toegestaan - toets.toetslast)) : null,
    nhgGrens: nhg ? nhgGrens() : null
  };
  if (k.eigen > 0) voorwaarden.push(`De klant brengt minimaal ${fmtEuro0(k.eigen)} eigen geld in${k.eigen >= REGELS.eigenMiddelenBewijs ? '; de herkomst wordt met bewijsstukken aangetoond' : ''}.`);
  if (korting) voorwaarden.push(`De woning heeft een geldig geregistreerd energielabel ${label.korting === 'A' ? 'A of beter' : 'B'} (EP-online); zonder registratie vervalt de duurzaamheidskorting van ${fmtPct(korting)}-punt.`);
  if (av > 0) voorwaarden.push('De aanvrager is geen koopstarter (35 jaar of jonger zonder eerdere koopwoning); voor koopstarters is aflossingsvrij niet mogelijk.');
  if (doel === 'nieuwbouw') voorwaarden.push('Nieuwbouw: waarborgcertificaat van een keurmerkhouder van Stichting GarantieWoning en bij passeren een onherroepelijke omgevingsvergunning.');
  if (erfpacht && !F.epDuur) voorwaarden.push('De resterende duur van het erfpachtrecht is niet korter dan de looptijd van de lening.');
  voorwaarden.push('De woning is bestemd voor eigen, vaste bewoning in Nederland en valt niet onder de uitgesloten woningtypen (onder meer serviceflat, verhuurde woning, recht van opstal, recreatiebestemming).');
  voorwaarden.push('De woning wordt verzekerd met een opstalverzekering tegen herbouwwaarde.');
  voorwaarden.push('Inkomen, identiteit en herkomst van eigen middelen worden met de aangeleverde documenten of brondata bevestigd.');

  if (ovb) {
    const mnd = F.dlMaanden, verkocht = F.ovbSituatie === 'a';
    const pm = F.dlMaandlast + ovb.pm, totaalDl = pm * mnd, eigenDl = F.dlEigen;
    if (!F.dlMaandlast) zet('Dubbele lasten', 'letop', 'vul de bruto maandlast van de huidige hypotheek in om de dubbele lasten te toetsen.');
    else {
      if (mnd > ovb.looptijd) zet('Dubbele lasten', 'fout', `de periode (${mnd} maanden) is langer dan de maximale looptijd van de overbrugging (${ovb.looptijd} maanden).`);
      if (mnd < EXTRA.dlStandaard && !verkocht) zet('Dubbele lasten', 'fout', `een periode korter dan ${EXTRA.dlStandaard} maanden kan alleen als de woning definitief is verkocht en de leverdatum vaststaat.`);
      const ruimtePm = toets ? toets.toegestaan - toets.toetslast : null;
      const basis = `${fmtEuro2(pm)} per maand × ${mnd} maanden = ${fmtEuro0(totaalDl)}`;
      if (eigenDl >= totaalDl) zet('Dubbele lasten', 'ok', `${basis}; gedekt door eigen middelen (${fmtEuro0(eigenDl)}).`);
      else if (ruimtePm != null && ruimtePm >= pm) zet('Dubbele lasten', 'ok', `${basis}; passend binnen de ruimte in de inkomenstoets (${fmtEuro2(ruimtePm)} per maand).`);
      else zet('Dubbele lasten', 'fout', `${basis}; niet gedekt: eigen middelen ${fmtEuro0(eigenDl)}${ruimtePm != null ? ', ruimte in de inkomenstoets ' + fmtEuro2(ruimtePm) + ' per maand' : ''}. Tekort ${fmtEuro0(totaalDl - eigenDl)}.`);
      if (eigenDl + k.eigen >= REGELS.eigenMiddelenBewijs && k.eigen < REGELS.eigenMiddelenBewijs) letop.push(`Eigen middelen inclusief dubbele lasten vanaf ${fmtEuro0(REGELS.eigenMiddelenBewijs)}: herkomst aantonen met bewijsstukken.`);
    }
  }

  /* ----- Optimalisatietips voor de adviseur (niet in het rapport voor de klant) ----- */
  const tips = [];
  const pmt = (vorm, bedrag, rente, jaren) => { const r = rente / 100 / 12, n = jaren * 12; return vorm === 'av' ? bedrag * r : (vorm === 'lin' || vorm === 'groenLin') ? bedrag / n + bedrag * r : bedrag * annFactor(rente, jaren); };
  const tarief = (d, kolom) => { const v = VORMEN[d.vorm]; if (v.groen) return RATES.groen[d.rvp][kolom === 0 ? 0 : 1]; const basis = d.rvp === 'var' ? RATES.variabel[kolom] : RATES[v.tabel][d.rvp][kolom]; return Math.round((basis + (d.consumptief ? RATES.consumptiefOpslag : 0) - korting) * 100) / 100; };
  const hoofd = rijen.find(x => !VORMEN[x.d.vorm].groen && x.rente != null && x.d.bedrag > 0);
  if (hoofd && mw > 0 && totaal > 0) {
    /* Lagere tariefklasse door extra eigen geld */
    if (!nhg && idx > 1 && idx <= RATES.klassen.length + 1) {
      for (let doelIdx = idx - 1; doelIdx >= 1; doelIdx--) {
        const nieuw = tarief(hoofd.d, doelIdx);
        if (hoofd.rente - nieuw >= 0.01 - 1e-9) {
          const extraEigen = Math.ceil(totaal - mw * RATES.klassen[doelIdx - 1] / 100);
          if (extraEigen > 0 && extraEigen < hoofd.d.bedrag) {
            const rest = x => x.d.bedrag - (x === hoofd ? extraEigen : 0);
            const oudTarief = rijen.reduce((som, x) => som + pmt(x.d.vorm, rest(x), x.rente, x.d.looptijd), 0);
            const nieuwTarief = rijen.reduce((som, x) => som + pmt(x.d.vorm, rest(x), tarief(x.d, doelIdx), x.d.looptijd), 0);
            tips.push(`Met ${fmtEuro0(extraEigen)} extra eigen geld daalt de verstrekking naar ${RATES.klassen[doelIdx - 1]}% van de marktwaarde en gaat de rente van leningdeel ${hoofd.nr} van ${fmtPct(hoofd.rente)} naar ${fmtPct(nieuw)}. De bruto maandlast daalt dan met circa ${fmtEuro0(maand0() - nieuwTarief)}, waarvan ${fmtEuro0(oudTarief - nieuwTarief)} door het lagere tarief.`);
          }
          break;
        }
      }
    }
    /* NHG als alternatief */
    if (!nhg && cons === 0 && totaal * (1 + NHG.provisiePct / 100) <= nhgGrens() && ltv <= REGELS.maxLtv) {
      const metNhg = tarief(hoofd.d, 0);
      if (metNhg < hoofd.rente) {
        const nieuwPm = rijen.reduce((som, x) => som + pmt(x.d.vorm, x.d.bedrag, tarief(x.d, 0), x.d.looptijd), 0);
        tips.push(`Met NHG is de rente van leningdeel ${hoofd.nr} ${fmtPct(metNhg)} in plaats van ${fmtPct(hoofd.rente)}: circa ${fmtEuro0(maand0() - nieuwPm)} per maand lager, tegen eenmalig ${fmtEuro0(totaal * NHG.provisiePct / 100)} borgtochtprovisie. Controleer of de aanvraag aan de NHG-voorwaarden voldoet.`);
      }
    }
    /* Duurzaamheidskorting */
    if (label.korting === 'C') tips.push(`Bij een geregistreerd energielabel B geldt ${fmtPct(RATES.korting.B)}-punt rentekorting en bij A of beter ${fmtPct(RATES.korting.A)}-punt. Verduurzamen kan met Argenta groen lenen (tot ${fmtEuro0(REGELS.groenMax)}, ${fmtPct(RATES.groen['10'][nhg ? 0 : 1])} bij 10 jaar vast${app ? '; niet voor appartementen' : ''}).`);
  }
  const maxAvTip = Math.min(mw * REGELS.avMaxPct / 100, REGELS.avMaxBedrag);
  if (av > maxAvTip && !starter) tips.push(`Zet ${fmtEuro0(av - maxAvTip)} van het aflossingsvrije deel om naar annuïtair of lineair om binnen het maximum van ${fmtEuro0(maxAvTip)} te blijven.`);
  if (!nhg && ltv > REGELS.maxLtv) tips.push(`Met ${fmtEuro0(Math.ceil(totaal - mw))} extra eigen geld past de lening binnen 100% van de marktwaarde.`);
  if (toets && toets.ruimte < 0) {
    tips.push(`Met ${fmtEuro0(Math.ceil(-toets.ruimte))} extra eigen geld (of een lagere hoofdsom) past de lening binnen de maximale hypotheek op inkomen.`);
    const kort = rijen.filter(x => x.d.rvp === 'var' || +x.d.rvp < 10);
    if (kort.length && kort.some(x => !VORMEN[x.d.vorm].groen && tarief(Object.assign({}, x.d, { rvp: '10' }), idx) < x.toets)) tips.push('Bij een rentevaste periode van 10 jaar of langer geldt de offerterente als toetsrente in plaats van de AFM-toetsrente; dat vergroot de leenruimte.');
    if (F.verplichtingen + F.studie > 0) tips.push('Het aflossen of beëindigen van kredieten vóór de aanvraag verlaagt de financiële verplichtingen en vergroot de leenruimte (aflossingsbewijs en afmelding bij BKR aanleveren).');
  }
  if (toets && toets.ruimte >= 0 && F.maatregelen === 0 && NORMEN.verbouwExtra[label.norm] > 0) tips.push(`Voor energiebesparende maatregelen is ${fmtEuro0(NORMEN.verbouwExtra[label.norm])} extra leenruimte beschikbaar boven de maximale hypotheek op inkomen.`);

  /* Verloop per jaar en kosten van het krediet (exclusief overbrugging) */
  const maanden = Math.max(0, ...rijen.map(r => r.sch.length));
  const termijnen = Array.from({ length: maanden }, (_, m) => rijen.reduce((s, r) => s + (r.sch[m] ? r.sch[m].rente + r.sch[m].afl : 0), 0));
  const jaren = [];
  for (let j = 0; j < maanden / 12; j++) {
    let rente = 0, afl = 0, rest = 0;
    rijen.forEach(r => { for (let m = j * 12; m < j * 12 + 12 && m < r.sch.length; m++) { rente += r.sch[m].rente; afl += r.sch[m].afl; } const e = r.sch[Math.min(j * 12 + 11, r.sch.length - 1)]; if (e && j * 12 < r.sch.length) rest += e.rest; });
    jaren.push({ jaar: j + 1, rest, rente, afl, pm: termijnen[j * 12] });
  }
  const renteTotaal = jaren.reduce((s, j) => s + j.rente, 0);
  const kredietKosten = k.notHyp + k.tax + k.adv + k.nhgKosten;
  const maand = rijen.reduce((s, r) => s + r.pm, 0);
  const gewRente = totaal > 0 ? rijen.reduce((s, r) => s + (r.rente || 0) * r.d.bedrag, 0) / totaal : 0;
  return { k, mw, nhg, label, labelIdx, doel, taxatie, totaal, totaalIncl, ltv, idx, rijen, ovb, toets, fouten, letop, maand, gewRente, jaren, maanden, renteTotaal, kredietKosten,
    totaalTeBetalen: totaal + renteTotaal + kredietKosten, jkp: jkp(totaal - kredietKosten, termijnen), extraEbv: NORMEN.verbouwExtra[label.norm], extra, tips, voorbehoud, voorwaarden, grenzen,
    oordeel: fouten.length ? 'past_niet' : voorbehoud.length ? 'voorbehoud' : 'past' };
}

/* ---------- Publieke API ---------- */
const VERSIE = '1.0.0';
const LABEL_CODES = ['A++++_EPG', 'A++++', 'A+++', 'A+_A++', 'A', 'B', 'C_D', 'E_F_G', 'GEEN'];
const OORDEEL_TEKST = {
  past: 'Past binnen de gepubliceerde regels van Argenta die getoetst zijn, onder de genoemde voorwaarden.',
  voorbehoud: 'Past rekenkundig, maar bevat punten die Argenta zelf beoordeelt of die nog niet getoetst zijn.',
  past_niet: 'Past niet: minstens één regel uit de hypotheekgids wordt overschreden.'
};
const getal = v => (v == null || v === '') ? 0 : (+v || 0);
const jaNee = v => v === false ? 'nee' : 'ja';

/* Zet de gestructureerde invoer om naar de interne velden van de rekenkern */
function vlak(inv) {
  const w = inv.woning || {}, k = inv.kosten || {}, a = inv.aanvragers || [], i = inv.inkomen || {}, e = inv.erfpacht, v = inv.vve, o = inv.overbrugging, b = inv.bkr || {};
  const label = LABEL_CODES.indexOf(w.energielabel);
  return {
    peildatum: inv.peildatum || null,
    doel: w.doel || 'bestaand', koopsom: getal(w.koopsom), marktwaarde: w.marktwaarde == null ? null : getal(w.marktwaarde), label: label < 0 ? 8 : label,
    taxatie: w.waardebepaling || 'nwwi', starter: !!w.koopstarter, appartement: !!w.appartement, nhg: !!w.nhg, fundering: w.funderingsrisico || null,
    verbouwing: getal(k.verbouwing), maatregelen: getal(k.energiemaatregelen), ovb_pct: String(k.overdrachtsbelastingPct == null ? 2 : k.overdrachtsbelastingPct),
    notLevering: getal(k.notarisLevering), notHypotheek: getal(k.notarisHypotheek), taxKosten: getal(k.taxatie), advKosten: getal(k.advies), eigenGeld: k.eigenGeld == null ? null : getal(k.eigenGeld),
    ink1: getal((a[0] || {}).toetsinkomen), ink2: getal((a[1] || {}).toetsinkomen), klant2: a.length > 1, geb1: (a[0] || {}).geboortedatum || '', geb2: (a[1] || {}).geboortedatum || '',
    aftrek: getal(i.aftrekPerJaar), verplichtingen: getal(i.verplichtingenPerMaand), studie: getal(i.studieleningPerMaand), toetsrente: i.toetsrenteKort == null ? 5 : getal(i.toetsrenteKort),
    aow: !!i.aowGerechtigd, alleenstaand: !!i.alleenstaand, regeling: i.regeling || 'geen', regInkomen: getal(i.regelingInkomen), regHuidig: getal(i.huidigeMaandlast),
    erfpachtgrond: !!e, epUitgever: (e || {}).uitgever || 'overheid', epVestiging: (e || {}).vestiging || 'voor2013', epOpinie: (e || {}).opinie || 'geen', epDuur: getal((e || {}).resterendeDuur), epCanon: getal((e || {}).canonPerJaar),
    vveOnbekend: !!w.appartement && !v, vveAanwezig: (v || {}).aanwezig || 'ja', vveActief: (v || {}).actief === false ? 'slapend' : 'actief',
    vveOnderhoud: jaNee((v || {}).onderhoudGoed), vveMjop: jaNee((v || {}).mjopVoldoende), vveFondsen: jaNee((v || {}).fondsenToereikend),
    ovbAan: !!o, ovbSituatie: (o || {}).situatie || 'a', ovbWaarde: getal((o || {}).waarde), ovbRestschuld: getal((o || {}).restschuld), ovbBedrag: getal((o || {}).bedrag),
    dlMaandlast: getal((o || {}).maandlastHuidig), dlMaanden: (o || {}).maanden == null ? EXTRA.dlStandaard : getal(o.maanden), dlEigen: getal((o || {}).eigenMiddelen),
    bkrStatus: b.status || 'onbekend', bkrContracten: getal(b.aantalContracten), loonbeslag: !!b.loonbeslag
  };
}

/* Controleer de invoer op waarden die de rekenkern niet kent */
function controleer(inv) {
  const f = [];
  const kies = (naam, waarde, lijst) => { if (waarde != null && lijst.indexOf(waarde) === -1) f.push(`${naam}: onbekende waarde "${waarde}" (toegestaan: ${lijst.join(', ')})`); };
  const w = inv.woning || {};
  kies('woning.doel', w.doel, ['bestaand', 'nieuwbouw', 'oversluiten', 'verbouwing', 'uitkoop', 'erfpacht']);
  kies('woning.energielabel', w.energielabel, LABEL_CODES);
  kies('woning.waardebepaling', w.waardebepaling, ['nwwi', 'desktop', 'desktopplus']);
  kies('woning.funderingsrisico', w.funderingsrisico, ['A', 'B', 'C', 'D', 'E']);
  kies('inkomen.regeling', (inv.inkomen || {}).regeling, ['geen', 'aow', 'senioren', 'tekort']);
  kies('bkr.status', (inv.bkr || {}).status, ['onbekend', 'schoon', 'negatief', 'hy2', 'hy', 'herstelA2', 'herstelA0']);
  kies('overbrugging.situatie', (inv.overbrugging || {}).situatie, Object.keys(OVB));
  if (!Array.isArray(inv.leningdelen) || !inv.leningdelen.length) f.push('leningdelen: minimaal 1 leningdeel opgeven');
  (inv.leningdelen || []).forEach((d, n) => {
    const v = VORMEN[d.vorm];
    if (!v) { f.push(`leningdelen[${n}].vorm: onbekende waarde "${d.vorm}" (toegestaan: ${Object.keys(VORMEN).join(', ')})`); return; }
    const rvp = String(d.rentevast == null ? 10 : d.rentevast);
    if (v.groen ? !RATES.groen[rvp] : !(rvp === 'var' || RATES[v.tabel][rvp])) f.push(`leningdelen[${n}].rentevast: "${rvp}" is geen rentevaste periode voor ${v.naam}`);
    if (v.groen && REGELS.groenPerioden.indexOf(+d.looptijd || 30) === -1) f.push(`leningdelen[${n}].looptijd: groen lenen kent looptijden van ${REGELS.groenPerioden.join(', ')} jaar`);
    else if (!v.groen && d.looptijd != null && (d.looptijd < 5 || d.looptijd > 30)) f.push(`leningdelen[${n}].looptijd: tussen 5 en 30 jaar`);
    if (d.consumptief && (d.vorm === 'av' || v.groen || rvp === 'var')) f.push(`leningdelen[${n}]: een consumptief leningdeel is annuïtair of lineair met een vaste rente`);
  });
  return f;
}

/* Volledige berekening; geeft het interne resultaat terug (gebruikt door de rekentool) */
function beoordeel(inv) {
  const invoerFouten = controleer(inv);
  if (invoerFouten.length) { const e = new Error('Ongeldige invoer: ' + invoerFouten.join('; ')); e.invoerFouten = invoerFouten; throw e; }
  F = vlak(inv);
  DELEN = inv.leningdelen.map(d => ({ vorm: d.vorm, bedrag: d.bedrag == null ? null : getal(d.bedrag), looptijd: +d.looptijd || 30, rvp: String(d.rentevast == null ? 10 : d.rentevast), consumptief: !!d.consumptief }));
  return bereken();
}

/* Resultaat als platte JSON voor koppelingen (bijvoorbeeld vanuit een HDN-aanvraag) */
function resultaat(inv) {
  let r;
  try { r = beoordeel(inv); } catch (e) { if (!e.invoerFouten) throw e; return { versie: VERSIE, oordeel: 'ongeldige_invoer', toelichting: 'De invoer bevat waarden die de rekenkern niet kent.', invoerFouten: e.invoerFouten }; }
  const rond = (n, d = 2) => n == null ? null : Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
  const t = r.toets;
  return {
    versie: VERSIE, oordeel: r.oordeel, toelichting: OORDEEL_TEKST[r.oordeel],
    afwijzingen: r.fouten, voorbehoud: r.voorbehoud, voorwaarden: r.voorwaarden, aandachtspunten: r.letop, tips: r.tips,
    bijzondereToetsen: r.extra.map(([naam, uitkomst, tekst]) => ({ naam, uitkomst: { ok: 'akkoord', letop: 'voorbehoud', fout: 'niet_mogelijk' }[uitkomst], tekst })),
    leningdelen: r.rijen.map(x => ({ nr: x.nr, vorm: x.d.vorm, omschrijving: x.naam, bedrag: x.d.bedrag, looptijdJaren: x.d.looptijd, rentevast: x.d.rvp === 'var' ? 'var' : +x.d.rvp, rentePct: x.rente, brutoMaandlast: rond(x.pm) })),
    overbrugging: r.ovb ? { bedrag: r.ovb.bedrag, maximaal: rond(r.ovb.max, 0), rentePct: r.ovb.rente, brutoMaandlast: rond(r.ovb.pm), looptijdMaanden: r.ovb.looptijd } : null,
    totalen: { hoofdsom: r.totaal, hoofdsomInclOverbrugging: r.totaalIncl, marktwaarde: r.mw, ltvPct: rond(r.ltv), tariefklasse: klasseNaam(r.idx), gemiddeldeRentePct: rond(r.gewRente, 3),
      brutoMaandlast: rond(r.maand), looptijdMaanden: r.maanden, jkpPct: rond(r.jkp), renteTotaal: rond(r.renteTotaal, 0), kredietKosten: r.kredietKosten, totaalTeBetalen: rond(r.totaalTeBetalen, 0) },
    grenzen: r.grenzen,
    kosten: { koopsom: r.k.koopsom, verbouwing: r.k.verbouwing, overdrachtsbelasting: r.k.ovb, notarisLevering: r.k.levering, notarisHypotheek: r.k.notHyp, taxatie: r.k.tax, advies: r.k.adv, nhgProvisie: r.k.nhgKosten, totaal: r.k.totaal, eigenGeld: r.k.eigen, teFinancieren: r.k.teFinancieren },
    inkomenstoets: t ? { toetsinkomen: t.inkomen, toetsrentePct: rond(t.gemToets, 3), financieringslastPct: rond(t.pct * 100, 1), methode: t.werkelijk ? 'werkelijke_lasten' : 'annuitair_30_jaar',
      toegestaneMaandlast: rond(t.toegestaan), toetslast: rond(t.toetslast), maximaleHypotheek: rond(t.maxHyp, 0), ruimte: rond(t.ruimte, 0), vrijgesteld: t.vrij.map(([omschrijving, bedrag]) => ({ omschrijving, bedrag })) } : null,
    verloop: r.jaren.map(j => ({ jaar: j.jaar, restschuld: rond(j.rest, 0), rente: rond(j.rente, 0), aflossing: rond(j.afl, 0), brutoMaandlast: rond(j.pm) })),
    bronnen: { tarievenVast: RATES.datumVast, tarievenVariabel: RATES.datumVariabel, leennormen: NORMEN.jaar, nhg: NHG.jaar, hypotheekgids: 'augustus 2026', voorwaarden: 'juli 2025' },
    disclaimer: 'Indicatieve toets op basis van gepubliceerde tarieven en voorwaarden. Geen renteaanbod of bindende offerte; Argenta beoordeelt elke aanvraag zelf.'
  };
}

return { VERSIE, RATES, NORMEN, REGELS, NHG, VORMEN, LABELS, LABEL_CODES, VOORWAARDEN, OORDEEL_TEKST, fmtEuro0, fmtEuro2, fmtPct, klasseNaam, beoordeel, resultaat };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = ArgentaEngine;
if (typeof globalThis !== 'undefined') globalThis.ArgentaEngine = ArgentaEngine;
