import { StyledInnerContainer, StyledOuterContainer } from './StyledComponents'
import { Box, useTheme } from '@mui/material'

export function LeftRightPanel({
  leftContent,
  rightContent,
  className,
}: {
  leftContent: JSX.Element
  rightContent: JSX.Element
  className?: string
}) {
  const theme = useTheme()
  return (
    <StyledOuterContainer className={className}>
      <StyledInnerContainer>
        <Box className="left-panel">{leftContent}</Box>
        <Box sx={{ position: 'relative' }}>
          <Box
            className="right-panel"
            sx={{
              marginTop: '95px',
              marginBottom: theme.spacing(4),
              overflow: 'hidden',
              fontWeight: '700',
              fontSize: '16px',
              color: '#4A5056',
            }}
          >
            {rightContent}
          </Box>
        </Box>
      </StyledInnerContainer>
    </StyledOuterContainer>
  )
}
