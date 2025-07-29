CREATE TABLE public.district (
  inside_tolls boolean NOT NULL DEFAULT true,
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  CONSTRAINT district_pkey PRIMARY KEY (id)
);

-- Enable RLS on district table
ALTER TABLE public.district ENABLE ROW LEVEL SECURITY;

-- RLS policies for district table
CREATE POLICY "Allow public users to READ" ON public.district
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to INSERT" ON public.district
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated users to UPDATE" ON public.district
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to DELETE" ON public.district
  FOR DELETE TO authenticated USING (true);
