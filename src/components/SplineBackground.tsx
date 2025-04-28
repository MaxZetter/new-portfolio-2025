// src/components/SplineBackground.tsx
import { Suspense } from 'react';
import Spline from '@splinetool/react-spline/next';
import SplineClient from './SplineClient';

export default function SplineBackground() {
  return (
    <>
      <Suspense fallback={null}>
        <div className="fixed inset-0 z-[-100] h-full w-full pointer-events-none">
          <Spline scene="https://prod.spline.design/S0eym8tW2KlVdWhI/scene.splinecode" />
        </div>
      </Suspense>
      <SplineClient />
    </>
  );
}