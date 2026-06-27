
-- Lock down SECURITY DEFINER functions from being called via the API
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO service_role;

-- Tighten public-insert WITH CHECK on contact_submissions
DROP POLICY IF EXISTS "contact_public_insert" ON public.contact_submissions;
CREATE POLICY "contact_public_insert" ON public.contact_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 2 AND 100
    AND char_length(email) BETWEEN 5 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(message) BETWEEN 5 AND 2000
  );

-- Tighten public-insert WITH CHECK on bookings
DROP POLICY IF EXISTS "bookings_public_insert" ON public.bookings;
CREATE POLICY "bookings_public_insert" ON public.bookings
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(guest_phone) BETWEEN 7 AND 20
    AND char_length(plan_slug) BETWEEN 2 AND 40
    AND status = 'pending'
  );
