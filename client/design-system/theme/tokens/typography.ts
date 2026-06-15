export const typography = {
    fontFamily: [
    "Inter",
    "Roboto",
    "Arial",
    "sans-serif"
  ].join(","),

  h1: {
    fontSize: "clamp(2rem, 4vw, 3.5rem)",
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
    
  },

  h2: {
    fontSize: "clamp(1.6rem, 3vw, 2.8rem)",
    fontWeight: 700,
    lineHeight: 1.25,
    letterSpacing: "-0.015em",
  },

  h3: {
    fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
    fontWeight: 600,
    lineHeight: 1.3,
  },

  h4: {
    fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
    fontWeight: 600,
    lineHeight: 1.35,
  },

  h5: {
    fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)",
    fontWeight: 600,
    lineHeight: 1.4,
  },

  h6: {
    fontSize: "1rem",
    fontWeight: 600,
    lineHeight: 1.4,
  },

  body1: {
    fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
    lineHeight: 1.6,
    
  },

  body2: {
    fontSize: "0.875rem",
    lineHeight: 1.6,
    opacity: 0.85,
   
  },

  subtitle1: {
    fontSize: "1rem",
    fontWeight: 500,
     whiteSpace: "nowrap",
  },

  subtitle2: {
    fontSize: "0.875rem",
    fontWeight: 500,
    opacity: 0.8,
     whiteSpace: "nowrap",
  },

  caption: {
    fontSize: "0.75rem",
    opacity: 0.7,
     whiteSpace: "nowrap",
  },

  button: {
    fontSize: "0.9rem",
    fontWeight: 600,
    textTransform: "none",
  },
};