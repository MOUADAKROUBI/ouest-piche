import React from 'react'

export default function CategoriesSkelton() {
  return (
    <>
        {
            Array.from({ length: 6 }).map((_, i) => (
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
