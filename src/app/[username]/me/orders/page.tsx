import React, { Suspense } from 'react'
import Orders from '@/Components/me/orders'

export default function Page() {
  return (
    <main>
      <h1 className="">
        les commandes
      </h1>
      <p>
        Consultez et suivez l{`'`}état de vos commandes
      </p>
      <div className="side-content">
        <Suspense fallback={<div>loading orders</div>}>
          <Orders />
        </Suspense>
      </div>
    </main>
  )
}
