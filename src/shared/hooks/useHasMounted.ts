import { useEffect, useState } from 'react'

// Server always renders as if no data exists (no basket/favorites access there).
// If a component's own useBasket()/useFavorites() call happens to already have
// cached data on the client's first render (e.g. Header fetched it earlier this
// session), that first render diverges from what the server sent — a hydration
// mismatch. Gating data-dependent branches on this hook forces both the server
// and the client's first render to agree ("nothing yet"), then lets the real
// data appear in a normal post-hydration re-render instead.
export function useHasMounted() {
    const [hasMounted, setHasMounted] = useState(false)
    useEffect(() => setHasMounted(true), [])
    return hasMounted
}
