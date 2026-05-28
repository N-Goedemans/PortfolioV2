import { create } from 'zustand'

export const SECTIONS = {
  HOME: 'home',
  ABOUT: 'about',
  EXPERIENCE: 'experience',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  DARKTECH: 'dark tech',
  CONTACT: 'contact',
}

export const SECTION_CONFIG = {
  [SECTIONS.HOME]: {
    label: 'Home',
    camera: { position: [0, 0, 7], target: [0, 0, 0] },
    hotspot: null,
  },
  [SECTIONS.ABOUT]: {
    label: 'About Me',
    camera: { position: [2, 2.5, 5], target: [0, 0.5, 0] },
    hotspot: { phi: Math.PI * 0.25, theta: Math.PI * 0.3, color: '#4fc3f7' },   // cyan
  },
  [SECTIONS.EXPERIENCE]: {
    label: 'Experience',
    camera: { position: [-3.5, 0.5, 4.5], target: [0, 0, 0] },
    hotspot: { phi: Math.PI * 0.5, theta: Math.PI * 1.1, color: '#66bb6a' },    // green
  },
  [SECTIONS.SKILLS]: {
    label: 'Skills',
    camera: { position: [0, -1, 5], target: [0, -0.5, 0] },
    hotspot: { phi: Math.PI * 0.75, theta: Math.PI * 0.5, color: '#ce93d8' },   // purple
  },
  [SECTIONS.PROJECTS]: {
    label: 'Projects',
    camera: { position: [3, -0.5, 4.5], target: [0.5, 0, 0] },
    hotspot: { phi: Math.PI * 0.6, theta: Math.PI * 1.7, color: '#ffa726' },    // amber
  },
  [SECTIONS.SEMESTER]: {
    label: 'Dark Tech Project',
    camera: { position: [-1.5, -2, 5], target: [0, -0.5, 0] },
    hotspot: { phi: Math.PI * 0.85, theta: Math.PI * 0.8, color: '#ef5350' },   // red
  },
  [SECTIONS.CONTACT]: {
    label: 'Contact',
    camera: { position: [0, 0, 8], target: [0, 0, 0] },
    hotspot: { phi: Math.PI * 0.15, theta: Math.PI * 1.5, color: '#f48fb1' },   // pink
  },
}

const useSectionStore = create((set) => ({
  activeSection: SECTIONS.HOME,
  hoveredSection: null,
  isTransitioning: false,
  panelVisible: false,

  setSection: (section) =>
    set({ activeSection: section, panelVisible: section !== SECTIONS.HOME, isTransitioning: true }),

  setHovered: (section) => set({ hoveredSection: section }),

  setTransitioning: (val) => set({ isTransitioning: val }),
}))

export default useSectionStore
