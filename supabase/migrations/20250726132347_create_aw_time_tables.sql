CREATE TABLE public.aw_time (
  weekday smallint NOT NULL,
  start_time time without time zone NOT NULL,
  end_time time without time zone NOT NULL,
  same_times_all_week boolean,
  created_at timestamp with time zone NOT NULL DEFAULT (now() AT TIME ZONE 'utc'::text),
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  CONSTRAINT aw_time_pkey PRIMARY KEY (id)
);

CREATE TABLE public.aw_time_submission (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  weekday smallint NOT NULL,
  start_time time without time zone NOT NULL,
  end_time time without time zone NOT NULL,
  same_times_all_week boolean,
  created_at timestamp with time zone NOT NULL DEFAULT (now() AT TIME ZONE 'utc'::text),
  CONSTRAINT aw_time_submission_pkey PRIMARY KEY (id)
);

-- Enable RLS on aw_time table
ALTER TABLE public.aw_time ENABLE ROW LEVEL SECURITY;

-- RLS policies for aw_time table
CREATE POLICY "Allow public users to READ" ON public.aw_time
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to INSERT" ON public.aw_time
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated users to UPDATE" ON public.aw_time
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to DELETE" ON public.aw_time
  FOR DELETE TO authenticated USING (true);

-- Enable RLS on aw_time_submission table
ALTER TABLE public.aw_time_submission ENABLE ROW LEVEL SECURITY;

-- RLS policies for aw_time_submission table
CREATE POLICY "Allow authenticated to READ" ON public.aw_time_submission
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow public users to INSERT" ON public.aw_time_submission
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to UPDATE" ON public.aw_time_submission
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to DELETE" ON public.aw_time_submission
  FOR DELETE TO authenticated USING (true);
