import typography from "@theme/foundations/typography";
const textTypography = {
  xl: {
    fontSize: "35px",
    lineHeight: "52px",
    letterSpacing: "-0.02em"
  },
  lg: {
    fontSize: "26px",
    lineHeight: "42px",
    letterSpacing: "-0.02em"
  },
  md: {
    fontSize: "15px",
    lineHeight: "27px",
    letterSpacing: "-0.02em"
  },
  sm: {
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "-0.02em"
  }
}
const textStyles = {
  sm: {
    fontSize: ['12px', '10px', '12px'],
    lineHeight: ['18px', '16px', '18px'],
  },
  md: {
    fontSize: { base: '16px', sm: '14px', md: '15px' },
    lineHeight: ['28px', '26px', '27px'],
  },
  lg: {
    fontSize: ['20px', '20px', '26px'],
    lineHeight: ['29px', '29px', '42px'],
  },
  xl: {
    fontSize: ['26px', '26px', '35px'],
    lineHeight: ['38px', '38px', '52px'],
  },
  titleXl: {
    ...textTypography.xl,
    fontWeight: typography.fontWeights.bold,
  },
  titleLg: {
    ...textTypography.lg,
    fontWeight: typography.fontWeights.bold,
  },
  titleMd: {
    ...textTypography.md,
    fontWeight: typography.fontWeights.bold,
  },
  titleSm: {
    ...textTypography.sm,
    fontWeight: typography.fontWeights.bold,
  },
  textXl: {
    ...textTypography.xl,
    fontWeight: typography.fontWeights.regular,
  },
  textLg: {
    ...textTypography.lg,
    fontWeight: typography.fontWeights.regular,
  },
  textMd: {
    ...textTypography.md,
    fontWeight: typography.fontWeights.regular,
  },
  textSm: {
    ...textTypography.sm,
    fontWeight: typography.fontWeights.regular,
  },
  btnMd: {
    ...textTypography.md,
    fontWeight: typography.fontWeights.bold,
  },
  btnSm: {
    ...textTypography.sm,
    fontWeight: typography.fontWeights.bold,
  },
  textActive: {
    ...textTypography.md,
    fontWeight: typography.fontWeights.regular,
    textDecorationLine: "underline"
  },
  textActiveSm: {
    ...textTypography.sm,
    fontWeight: typography.fontWeights.regular,
    textDecorationLine: "underline"
  }
};

export default textStyles;
