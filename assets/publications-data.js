// TEMPLATE ARTICOLO -------------------------------------------------------------------------------
// Per aggiungere un articolo, copiare il template qui sotto, riempire i campi e aggiungerlo
// all'array publications. L'ordine non importa: la pagina ordina automaticamente per anno.
//
// TEMPLATE:
//
//     {
//         year: 2025,
//         title: "Titolo dell'articolo",
//         authors: "Rossi, M. and Bianchi, L.",
//         type: "journal",           // journal | conference | book chapter
//         venue: "Nome della rivista",
//         doi: "10.xxxx/xxxxxx",
//         tags: ["tag1", "tag2"],
//         abstract: "Testo dell'abstract...",
//         bibtex: `@article{rossi2025titolo,
//   author  = "Rossi, M. and Bianchi, L.",
//   title   = "Titolo dell'articolo",
//   journal = "Nome della rivista",
//   year    = "2025",
//   doi     = "10.xxxx/xxxxxx"
// }`
//     },
//
// -------------------------------------------------------------------------------------------------

const publications = [
    {
        year: 2026,
        title: "Adaptive Concrete Systems for High-Performance Structures",
        authors: "Rossi, M. and Bianchi, L. and Verdi, A.",
        type: "journal",
        venue: "Journal of Structural Engineering",
        doi: "10.1061/JSENDH.STENG-12345",
        tags: ["optimization", "concrete", "adaptive systems"],
        abstract: "This paper presents a novel framework for adaptive concrete systems that leverage real-time structural feedback to optimize load distribution. The proposed methodology integrates sensor data with finite element models to dynamically adjust structural parameters, resulting in a 23% improvement in load-bearing efficiency compared to conventional designs.",
        bibtex: `@article{rossi2026adaptive,
  author  = "Rossi, M. and Bianchi, L. and Verdi, A.",
  title   = "Adaptive Concrete Systems for High-Performance Structures",
  journal = "Journal of Structural Engineering",
  year    = "2026",
  doi     = "10.1061/JSENDH.STENG-12345"
}`
    },
    {
        year: 2025,
        title: "Genetic Algorithms for Optimized Structural Computation",
        authors: "Bianchi, L. and Verdi, A.",
        type: "journal",
        venue: "Computers & Structures",
        doi: "10.1016/j.compstruc.2025.01.009",
        tags: ["genetic algorithms", "optimization", "computation"],
        abstract: "We investigate the influence of generational optimization parameters in genetic algorithm-based structural design. A parametric study across 480 configurations reveals that crossover rate and population diversity are the dominant factors governing convergence speed, offering practical guidelines for engineering applications.",
        bibtex: `@article{bianchi2025genetic,
  author  = "Bianchi, L. and Verdi, A.",
  title   = "Genetic Algorithms for Optimized Structural Computation",
  journal = "Computers \\& Structures",
  year    = "2025",
  doi     = "10.1016/j.compstruc.2025.01.009"
}`
    },
    {
        year: 2025,
        title: "AI-based Seismic Modeling for Predictive Resilience Analysis",
        authors: "Verdi, A. and Rossi, M.",
        type: "conference",
        venue: "Proc. ECCOMAS 2025",
        doi: "10.1007/978-3-031-00000-0_12",
        tags: ["AI", "seismic", "machine learning", "resilience"],
        abstract: "A machine learning pipeline is proposed for rapid seismic vulnerability assessment of reinforced concrete frames. Trained on a dataset of 12,000 nonlinear time-history analyses, the model predicts peak inter-storey drift with a mean absolute error below 3%, enabling city-scale resilience screening within seconds.",
        bibtex: `@inproceedings{verdi2025seismic,
  author    = "Verdi, A. and Rossi, M.",
  title     = "AI-based Seismic Modeling for Predictive Resilience Analysis",
  booktitle = "Proc. ECCOMAS 2025",
  year      = "2025",
  doi       = "10.1007/978-3-031-00000-0_12"
}`
    },
    {
        year: 2024,
        title: "Smart Materials for Energy Efficiency in Building Design",
        authors: "Rossi, M. and Bianchi, L.",
        type: "book chapter",
        venue: "Advances in Sustainable Structures, Springer",
        doi: "10.1007/978-3-031-99999-0_5",
        tags: ["smart materials", "energy efficiency", "sustainability"],
        abstract: "This chapter reviews the integration of responsive composite materials — including shape-memory alloys and piezoelectric elements — into building envelopes. Case studies from three pilot projects demonstrate energy savings of up to 18% through thermally adaptive façade systems.",
        bibtex: `@incollection{rossi2024smart,
  author    = "Rossi, M. and Bianchi, L.",
  title     = "Smart Materials for Energy Efficiency in Building Design",
  booktitle = "Advances in Sustainable Structures",
  publisher = "Springer",
  year      = "2024",
  doi       = "10.1007/978-3-031-99999-0_5"
}`
    },
    {
        year: 2024,
        title: "Topology Optimization of Funicular Shell Structures",
        authors: "Verdi, A. and Bianchi, L. and Rossi, M.",
        type: "journal",
        venue: "Structural and Multidisciplinary Optimization",
        doi: "10.1007/s00158-024-03700-x",
        tags: ["topology optimization", "shells", "funicular"],
        abstract: "We present a density-based topology optimization scheme tailored to thin shell structures governed by membrane action. By enforcing funicularity constraints within the SIMP framework, the method produces structurally efficient geometries with minimal bending, validated on benchmark vaults and free-form canopies.",
        bibtex: `@article{verdi2024topology,
  author  = "Verdi, A. and Bianchi, L. and Rossi, M.",
  title   = "Topology Optimization of Funicular Shell Structures",
  journal = "Structural and Multidisciplinary Optimization",
  year    = "2024",
  doi     = "10.1007/s00158-024-03700-x"
}`
    }
];