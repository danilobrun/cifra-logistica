import styled from "styled-components"
import { Footer } from "./Footer"
import { Header } from "./Header"

type Props = {
    children: React.ReactNode
    startTransparent?: boolean
    withoutMargin?: boolean
}

export const Layout: React.FC<Props> = ({ children, startTransparent, withoutMargin }) => {
    return (
        <>
            <Header startTransparent={startTransparent} />
            <MainStyled startTransparent={startTransparent}>
                {children}
            </ MainStyled>
            <Footer withoutMargin={withoutMargin} />
        </>
    )
}

type MainProps = {
    startTransparent?: boolean
}

// Cria tipo a partir de outro selecionando propriedades
// type MainProps = Pick<Props, 'startTransparent' >

const MainStyled = styled.main<MainProps>`
    ${props => !props.startTransparent && `
        padding-top: 77px;
        @media (min-width: 992px) {
            padding-top: 96px;
        }
    `}
`