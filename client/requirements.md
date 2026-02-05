## Packages
(none needed)

## Notes
Landing page is single-route (/) with smooth-scroll anchors to sections.
Contact form submits to POST /api/leads and validates with @shared/routes api.leads.create.input.
Leads admin drawer uses GET /api/leads and DELETE /api/leads/:id.
No external images required (hero uses gradients + SVG texture).
SEO tags are set at runtime via document.title + meta updates (no react-helmet dependency).
Tailwind already configured with font vars; no extra tailwind config changes required.
