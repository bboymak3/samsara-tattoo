#!/usr/bin/env bash
# Replace placeholder phone in prefooter with official numbers from contacto.html
# Official numbers:
#   - CEO: +58 414-5362715
#   - Web Developer & SEO: 04167775771
set -e
cd /home/z/my-project/repos/meridaunclick

NEW_LINE='<li><i class="fas fa-phone"></i> +58 414-5362715 / 0416-7775771</li>'
OLD_PATTERNS=(
    '<li><i class="fas fa-phone"></i> +58 414-000-0000</li>'
)

FILES=(
    clientes-satisfechos.html
    index.html
    quienes-somos.html
    planes.html
    privacidad.html
    mision-vision.html
    contacto.html
)

for f in "${FILES[@]}"; do
    if [ -f "$f" ]; then
        # Use perl for in-place edit (more portable than sed -i)
        perl -i -pe 's|<li><i class="fas fa-phone"></i> \+58 414-000-0000</li>|<li><i class="fas fa-phone"></i> +58 414-5362715 / 0416-7775771</li>|g' "$f"
        echo "Updated: $f"
    fi
done

# Planes.html: also update payment info text if any
# Dashboard.html has its own payment section (we won't touch the placeholder there as it's dynamic)

echo "---"
echo "Done. Verifying..."
grep -rn "414-000-0000" *.html | grep -v "aunclick/" | grep -v "aunclick_analysis/" || echo "No remaining placeholders in main HTML files"
