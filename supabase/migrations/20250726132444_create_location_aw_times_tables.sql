CREATE TABLE public.location_aw_time (
  location_id bigint NOT NULL,
  aw_time_id bigint NOT NULL,
  CONSTRAINT location_aw_time_pkey PRIMARY KEY (location_id, aw_time_id),
  CONSTRAINT location_aw_time_aw_time_id_fkey FOREIGN KEY (aw_time_id) REFERENCES public.aw_time(id),
  CONSTRAINT location_aw_time_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.location(id)
);

CREATE TABLE public.location_aw_time_submission (
  location_id bigint NOT NULL,
  aw_time_id bigint NOT NULL,
  CONSTRAINT location_aw_time_submission_pkey PRIMARY KEY (location_id, aw_time_id),
  CONSTRAINT location_aw_time_submission_aw_time_id_fkey FOREIGN KEY (aw_time_id) REFERENCES public.aw_time_submission(id),
  CONSTRAINT location_aw_time_submission_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.location_submission(id)
);

-- Enable RLS on location_aw_time table
ALTER TABLE public.location_aw_time ENABLE ROW LEVEL SECURITY;

-- RLS policies for location_aw_time table
CREATE POLICY "Allow public users to READ" ON public.location_aw_time
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to INSERT" ON public.location_aw_time
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated users to UPDATE" ON public.location_aw_time
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to DELETE" ON public.location_aw_time
  FOR DELETE TO authenticated USING (true);

-- Enable RLS on location_aw_time_submission table
ALTER TABLE public.location_aw_time_submission ENABLE ROW LEVEL SECURITY;

-- RLS policies for location_aw_time_submission table
CREATE POLICY "Allow authenticated users to READ" ON public.location_aw_time_submission
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow public users to INSERT" ON public.location_aw_time_submission
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to UPDATE" ON public.location_aw_time_submission
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to DELETE" ON public.location_aw_time_submission
  FOR DELETE TO authenticated USING (true);

