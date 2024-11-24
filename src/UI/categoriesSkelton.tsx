import React from 'react'

export default function CategoriesSkelton({len}:{readonly len:number}) {
  return (
    <ul className='categories-skelton'>
        {
            Array.from({ length: len }).map( index => (
                <li
                    key={Number(index)}
                    className="collection-item-link w-dyn-item skelton"
                />
            ))
        }
    </ul>
  )
}
