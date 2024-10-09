import React from 'react'

export default function CategoriesSkelton({len}:{len:number}) {
  return (
    <>
        {
            Array.from({ length: len }).map((_, i) => (
                <div
                    key={i}
                    className="collection-item-link w-dyn-item skelton"
                    role="listitem"
                />
            ))
        }
    </>
  )
}
