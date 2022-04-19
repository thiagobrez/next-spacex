import { ReactNode } from 'react'

type CardListProps = {
  children: ReactNode | ReactNode[]
}

const CardList = ({ children }: CardListProps) => {
  return (
    <>
      <div className="container" data-testid="card-list">
        {children}
      </div>

      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
        }
      `}</style>
    </>
  )
}

export default CardList
