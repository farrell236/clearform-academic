/**
 * Editable copy for the homepage and the small, static pages.
 * Keep layout and HTML out of this file: plain text and links are easiest to
 * review, replace and version safely.
 */

export const homePage = {
  title: 'Learning for scientific discovery.',
  lede: 'I study how learning systems connect structure, data and language. These fictional projects show how to present research ideas, publications and open resources.',
  primaryAction: { label: 'Explore research', href: '/research/' },
  secondaryAction: { label: 'A little about me', href: '/about/' },
  sections: {
    research: { title: 'Selected research', actionLabel: 'All projects' },
    publications: { title: 'Selected publications', actionLabel: 'Publication list' },
    writing: { title: 'Beyond the papers', actionLabel: 'Writing archive' },
  },
  writingLimit: 2,
};

export const sectionPages = {
  research: {
    title: 'Research',
    description: 'Sample research pages connecting structure, data and language. Every project in this demo is fictional.',
    metaDescription: 'Fictional sample projects in structured learning, synthetic data and multimodal systems.',
  },
  publications: {
    title: 'Publications',
    description: 'All titles, authors and venues below are fictional examples. Replace them with your own verified publications.',
    metaDescription: 'Fictional sample citations demonstrating paper, code, BibTeX and summary layouts.',
    profileLinkLabel: 'Sample Google Scholar profile',
  },
  writing: {
    title: 'Writing',
    description: 'A sample note showing how to present ideas and lessons beyond the publication list. Replace it with your own writing.',
    metaDescription: 'Fictional sample research notes, separate from the main academic overview.',
  },
};

export const aboutPage = {
  title: 'About me',
  metaDescription: "A fictional researcher biography demonstrating the academic template's about and contact layout.",
  introduction: 'a fictional researcher interested in computational science and machine learning.',
  sections: [
    {
      title: 'Research interests',
      paragraphs: [
        'This sample profile explores structured learning, synthetic data and connections between visual observations and language. Replace these paragraphs with your own interests and research motivation.',
      ],
    },
    {
      title: 'Background',
      paragraphs: [
        'In this fictional biography, Alex is a Research Fellow at Example University, following a doctorate in Computational Science at the same imaginary institution.',
        'No person, appointment, qualification or affiliation described in this demo is presented as real.',
      ],
    },
  ],
  cvLabel: 'Download the sample CV',
  contactTitle: 'Get in touch',
  contactText: 'The email uses the reserved example.org domain. Profile buttons lead to local demo resources, not real accounts.',
};

export const academicPage = {
  title: 'Academic activities',
  description: 'Sample talks and teaching, showing how to present academic contributions beyond publications.',
  metaDescription: 'Fictional examples of talks, workshops and teaching for an academic website template.',
  talks: [
    {
      title: 'Learning from Structured Scientific Data',
      context: 'Example University Research Seminar · 2025',
      href: '/about/demo-resources/#slides-structured',
    },
    {
      title: 'Synthetic Data and Responsible Evaluation',
      context: 'Example Methods Workshop · 2024',
      href: '/about/demo-resources/#slides-synthetic',
    },
    {
      title: 'Connecting Visual Data and Language',
      context: 'Example Graduate Symposium · 2023',
      href: '/about/demo-resources/#slides-multimodal',
    },
  ],
  teaching: [
    {
      title: 'Introduction to Scientific Computing',
      details: [
        'Sample lectures · Practical workshops · Project supervision',
        'Department of Computational Science, Example University',
      ],
    },
    {
      title: 'Research Methods',
      details: [
        'Sample graduate seminar · Reproducibility · Research communication',
        'Example Graduate School',
      ],
    },
  ],
  notice: 'All talks, institutions and teaching activities on this page are fictional placeholders.',
};

export const notFoundPage = {
  title: "That page isn't here.",
  description: 'The link may have changed. You can return to the overview or browse the research and publications.',
  metaDescription: 'This page could not be found. Return to the research overview.',
  actionLabel: 'Return to overview',
};
