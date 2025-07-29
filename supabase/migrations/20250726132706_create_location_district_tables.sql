CREATE TABLE public.location_district (
  location_id bigint NOT NULL,
  district_id bigint NOT NULL,
  CONSTRAINT location_district_pkey PRIMARY KEY (location_id, district_id),
  CONSTRAINT location_district_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.location(id),
  CONSTRAINT location_district_district_id_fkey FOREIGN KEY (district_id) REFERENCES public.district(id)
);

CREATE TABLE public.location_district_submission (
  location_id bigint NOT NULL,
  district_id bigint NOT NULL,
  CONSTRAINT location_district_submission_pkey PRIMARY KEY (location_id, district_id),
  CONSTRAINT location_district_submission_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.location_submission(id),
  CONSTRAINT location_district_submission_district_id_fkey FOREIGN KEY (district_id) REFERENCES public.district(id)
);

-- Enable RLS on location_district table
ALTER TABLE public.location_district ENABLE ROW LEVEL SECURITY;

-- RLS policies for location_district table
CREATE POLICY "Allow public users to READ" ON public.location_district
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to INSERT" ON public.location_district
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated users to UPDATE" ON public.location_district
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to DELETE" ON public.location_district
  FOR DELETE TO authenticated USING (true);

-- Enable RLS on location_district_submission table
ALTER TABLE public.location_district_submission ENABLE ROW LEVEL SECURITY;

-- RLS policies for location_district_submission table
CREATE POLICY "Allow authenticated users to READ" ON public.location_district_submission
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow public users to INSERT" ON public.location_district_submission
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to UPDATE" ON public.location_district_submission
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to DELETE" ON public.location_district_submission
  FOR DELETE TO authenticated USING (true);
