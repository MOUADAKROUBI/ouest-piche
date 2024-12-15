'use client';

import React from 'react';
import Likes from '@/Components/me/likes';

export default function Page() {
  return (
    <main>
      <h1 className="">
        mes favoris
      </h1>
      <div className="side-content">
        <Likes />
      </div>
    </main>
  )
}
