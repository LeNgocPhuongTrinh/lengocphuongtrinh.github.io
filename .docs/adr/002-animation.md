# 002 — Animation architecture

Context: the approved editorial page calls for meaningful load and scroll motion, with accessible reduced-motion and mobile behavior.

Decision: one dynamically loaded GSAP/ScrollTrigger hook, scoped to the page root and cleaned up with contexts/matchMedia. CSS owns the marquee, simple hovers and explicit accordion transitions. Base markup is readable without motion.

Alternatives: CSS-only scroll timelines; Framer Motion plus GSAP; pinned cinematic sequences.

Why: ScrollTrigger offers predictable cross-browser sequencing while CSS is sufficient for small interaction states. A second framework or extensive pinning adds weight without improving the story.

Consequences: animations have a clear owner, reduced-motion visitors skip initial animation downloads, and mobile disables parallax. The hook remains the lookup point for section choreography.
