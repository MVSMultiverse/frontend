import styled from 'styled-components'

interface AvatarImageProps {
  src: string
  borderColor?: string
  alt?: string
}

const AvatarImage = styled.div.attrs<AvatarImageProps>(({ alt }) => ({
  alt,
}))<AvatarImageProps>`
  background: url('${({ src }) => src}');
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  position: relative;
  width: 33px;
  height: 33px;
  border: 4px ${({ borderColor }) => borderColor || '#e6e6e6'} solid;

  & > img {
    border-radius: 50%;
  }
`

export default AvatarImage
