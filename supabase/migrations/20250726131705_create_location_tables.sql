CREATE TABLE public.location (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  outdoor_seating boolean,
  afternoon_sun boolean,
  url_maps text,
  created_at timestamp with time zone NOT NULL DEFAULT (now() AT TIME ZONE 'utc'::text),
  url_website text,
  price_standard smallint NOT NULL,
  price_aw smallint,
  price_pitcher smallint,
  centiliters_standard smallint NOT NULL,
  centiliters_pitcher smallint,
  beer_brand text,
  updated_at timestamp with time zone,
  created_by uuid DEFAULT auth.uid(),
  CONSTRAINT location_pkey PRIMARY KEY (id)
);

CREATE TABLE public.location_submission (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  outdoor_seating boolean,
  afternoon_sun boolean,
  url_maps text,
  url_website text,
  price_standard smallint NOT NULL,
  price_aw smallint,
  price_pitcher smallint,
  centiliters_standard smallint NOT NULL,
  centiliters_pitcher smallint,
  beer_brand text,
  updated_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT (now() AT TIME ZONE 'utc'::text),
  created_by uuid DEFAULT auth.uid(),
  CONSTRAINT location_submission_pkey PRIMARY KEY (id)
);

-- Enable RLS on location table
ALTER TABLE public.location ENABLE ROW LEVEL SECURITY;

-- RLS policies for location table
CREATE POLICY "Allow public users to SELECT" ON public.location
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to INSERT" ON public.location
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated users to UPDATE" ON public.location
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to DELETE" ON public.location
  FOR DELETE TO authenticated USING (true);

-- Enable RLS on location_submission table
ALTER TABLE public.location_submission ENABLE ROW LEVEL SECURITY;

-- RLS policies for location_submission table
CREATE POLICY "Allow authenticated users to SELECT" ON public.location_submission
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow public users to INSERT" ON public.location_submission
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to UPDATE" ON public.location_submission
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to DELETE" ON public.location_submission
  FOR DELETE TO authenticated USING (true);
